import BigNumber from 'bignumber.js'
import { transformDown } from './transformDown'
import {
  transformUp,
  transformUpContracts,
  transformUpHosts,
  transformUpPinned,
} from './transformUp'
import { InputValues, Values, ValuesHosts } from './types'
import {
  blocksToWeeks,
  weeksToBlocks,
  valuePerPeriodToPerMonth,
  valuePerMonthToPerPeriod,
  toHastings,
} from '@siafoundation/units'
import { CurrencyId } from '@siafoundation/react-core'
import {
  MaintenanceSettings,
  UsabilitySettings,
  PinnedSettings,
} from '@siafoundation/indexd-types'

describe('tansforms', () => {
  describe('down', () => {
    it('default', () => {
      const { contracts, hosts, pricePinning } = buildAllResponses()
      expect(
        transformDown({
          contracts,
          hosts,
          pricePinning,
        }),
      ).toEqual({
        wantedContracts: new BigNumber(51),
        periodWeeks: new BigNumber(6),
        renewWindowWeeks: new BigNumber('2.2301587301587302'),
        maxEgressPriceTB: new BigNumber(1000),
        maxEgressPriceTBPinned: new BigNumber(100),
        maxIngressPriceTB: new BigNumber(1000),
        maxIngressPriceTBPinned: new BigNumber(200),
        maxStoragePriceTBMonth: new BigNumber(864),
        maxStoragePriceTBMonthPinned: new BigNumber(300),
        minCollateral: new BigNumber(100),
        minCollateralPinned: new BigNumber(400),
        minProtocolVersion: '1.7.0',
        pinnedCurrency: 'usd' as CurrencyId,
        shouldPinMaxStoragePrice: true,
        shouldPinMaxEgressPrice: true,
        shouldPinMaxIngressPrice: true,
        shouldPinMinCollateral: true,
      } as InputValues)
    })
  })

  describe('up', () => {
    describe('contracts', () => {
      it('up contracts', () => {
        const { contracts } = buildAllResponses()
        expect(
          transformUpContracts(
            {
              wantedContracts: new BigNumber(51),
              periodWeeks: new BigNumber(6),
              renewWindowWeeks: new BigNumber(2),
            },
            contracts,
          ),
        ).toEqual({
          enabled: true,
          wantedContracts: 51,
          period: 6048,
          renewWindow: 2016,
        })
      })
      it('up contracts accepts unknown values', () => {
        expect(
          transformUpContracts(
            {
              wantedContracts: new BigNumber(51),
              periodWeeks: new BigNumber(6),
              renewWindowWeeks: new BigNumber(2),
            },
            {
              enabled: false,
              foobar1: 'value',
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } as any,
          ),
        ).toEqual({
          enabled: false,
          wantedContracts: 51,
          period: 6048,
          renewWindow: 2016,
          foobar1: 'value',
        })
      })
    })

    describe('hosts', () => {
      it('up hosts', () => {
        expect(
          transformUpHosts(
            {
              maxEgressPriceTB: new BigNumber(200),
              maxIngressPriceTB: new BigNumber(300),
              maxStoragePriceTBMonth: new BigNumber(400),
              minCollateral: new BigNumber(100),
              minProtocolVersion: '1.7.0',
            } as ValuesHosts,
            {
              maxStoragePrice: '77777777777',
              foobar: 'value',
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } as any,
          ),
        ).toEqual({
          foobar: 'value',
          maxEgressPrice: '200000000000000',
          maxIngressPrice: '300000000000000',
          maxStoragePrice: '92592592593',
          minCollateral: '23148148148',
          minProtocolVersion: 'v1.7.0',
        })
      })
    })

    describe('price pinning', () => {
      it('up price pinning', () => {
        expect(
          transformUpPinned(
            {
              pinnedCurrency: 'usd' as CurrencyId,
              shouldPinMaxStoragePrice: true,
              maxStoragePriceTBMonthPinned: new BigNumber('2000'),
              shouldPinMaxEgressPrice: true,
              maxEgressPriceTBPinned: new BigNumber('1'),
              shouldPinMaxIngressPrice: true,
              maxIngressPriceTBPinned: new BigNumber('1.1'),
              shouldPinMinCollateral: true,
              minCollateralPinned: new BigNumber('100'),
            },
            {
              otherNewValue: '77777777777',
              foobar: 'value',
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } as any,
          ),
        ).toEqual({
          currency: 'usd' as CurrencyId,
          maxEgressPrice: 1,
          maxIngressPrice: 1.1,
          maxStoragePrice: 2000,
          minCollateral: 100,
          otherNewValue: '77777777777',
          foobar: 'value',
        })
      })
    })
  })

  it('down up down - ensure converting back and forth results in the same values', () => {
    const { contracts, hosts, pricePinning } = buildAllResponses()
    const transformUpMocks = {
      resources: {
        contracts: { data: contracts },
        hosts: { data: hosts },
        pricePinning: { data: pricePinning },
      },
    }
    const down = transformDown({
      contracts,
      hosts,
      pricePinning,
    })
    // Coming down, some fields are a little different due to rounding.
    expect(down.maxEgressPriceTB).toEqual(new BigNumber('1000'))

    const downUp = transformUp({
      ...transformUpMocks,
      values: down as Values,
    })
    const downUpDown = transformDown({
      ...downUp.payloads,
    })

    // Once saved/rounded, values are then always the same.
    expect(down).toEqual(downUpDown)

    const downUpDownUp = transformUp({
      ...transformUpMocks,
      values: down as Values,
    })
    expect(downUp).toEqual(downUpDownUp)
  })

  describe('specific unit conversions work back and forth', () => {
    it('period -> month -> period', () => {
      const valuePerPeriod = new BigNumber(91085125718831)
      const periodBlocks = new BigNumber(4244)
      const valuePerMonth = valuePerPeriodToPerMonth(
        valuePerPeriod,
        periodBlocks.toNumber(),
      )
      expect(valuePerMonth).toEqual(
        new BigNumber('92716244841034.38265786993402450518378887952'),
      )
      const periodWeeks = new BigNumber(blocksToWeeks(periodBlocks.toNumber()))
      expect(
        valuePerMonthToPerPeriod(valuePerMonth, periodWeeks).toFixed(0),
      ).toEqual(valuePerPeriod.toString())
    })

    it('month -> period', () => {
      const valuePerMonth = new BigNumber(87908469486735)
      const periodWeeks = new BigNumber(30).div(7)
      expect(valuePerMonthToPerPeriod(valuePerMonth, periodWeeks)).toEqual(
        valuePerMonth,
      )
    })
    it('period <- month', () => {
      const valuePerMonth = new BigNumber(30)
      const periodWeeks = new BigNumber(30).div(7)
      const valuePerPeriod = valuePerMonthToPerPeriod(
        valuePerMonth,
        periodWeeks,
      )

      const periodBlocks = weeksToBlocks(periodWeeks.toNumber())
      expect(
        valuePerPeriodToPerMonth(valuePerPeriod, periodBlocks).toFixed(0),
      ).toEqual('30')
    })
  })
})

function buildAllResponses() {
  return {
    contracts: {
      enabled: true,
      wantedContracts: 51,
      period: 6048,
      renewWindow: 2248,
    } as MaintenanceSettings,
    hosts: {
      minProtocolVersion: 'v1.7.0',
      maxEgressPrice: '1000000000000000',
      maxIngressPrice: '1000000000000000',
      maxStoragePrice: '200000000000',
      minCollateral: '23148148148',
    } as UsabilitySettings,
    pricePinning: {
      currency: 'usd',
      maxEgressPrice: 100,
      maxIngressPrice: 200,
      maxStoragePrice: 300,
      minCollateral: 400,
    } as PinnedSettings,
  }
}
