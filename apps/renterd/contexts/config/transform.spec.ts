import BigNumber from 'bignumber.js'
import { transformDown } from './transformDown'
import {
  transformUp,
  transformUpAutopilot,
  transformUpContractSet,
  transformUpGouging,
  transformUpPricePinning,
  transformUpRedundancy,
} from './transformUp'
import { SettingsData } from './types'
import {
  blocksToWeeks,
  weeksToBlocks,
  toHastings,
  valuePerPeriodToPerMonth,
  valuePerMonthToPerPeriod,
} from '@siafoundation/units'
import { CurrencyId } from '@siafoundation/react-core'

describe('tansforms', () => {
  describe('down', () => {
    it('default', () => {
      const {
        autopilot,
        contractSet,
        uploadPacking,
        gouging,
        redundancy,
        pricePinning,
      } = buildAllResponses()
      expect(
        transformDown({
          hasBeenConfigured: true,
          autopilot: {
            ...autopilot,
            hosts: {
              ...autopilot.hosts,
              minProtocolVersion: null,
            },
          },
          contractSet,
          uploadPacking,
          gouging,
          redundancy,
          pricePinning,
        })
      ).toEqual({
        autopilotContractSet: 'autopilot',
        allowanceMonth: new BigNumber('357.142857'),
        amountHosts: new BigNumber('51'),
        periodWeeks: new BigNumber('6'),
        renewWindowWeeks: new BigNumber('2.2301587301587302'),
        downloadTBMonth: new BigNumber('0.79'),
        uploadTBMonth: new BigNumber('0.79'),
        storageTB: new BigNumber('1'),
        prune: true,
        allowRedundantIPs: false,
        maxDowntimeHours: new BigNumber('1440'),
        minRecentScanFailures: new BigNumber('10'),
        minProtocolVersion: '',
        defaultContractSet: 'myset',
        uploadPackingEnabled: true,
        hostBlockHeightLeeway: new BigNumber(4),
        maxContractPrice: new BigNumber('20'),
        maxDownloadPriceTB: new BigNumber('1004.31'),
        maxRPCPriceMillion: new BigNumber('99970619'),
        maxStoragePriceTBMonth: new BigNumber('909.494702'),
        maxUploadPriceTB: new BigNumber('1000.232323'),
        minAccountExpiryDays: new BigNumber(1),
        minMaxEphemeralAccountBalance: new BigNumber('1'),
        minPriceTableValidityMinutes: new BigNumber(5),
        migrationSurchargeMultiplier: new BigNumber(10),
        minShards: new BigNumber(10),
        totalShards: new BigNumber(30),
        allowanceMonthPinned: new BigNumber('71.43'),
        maxStoragePriceTBMonthPinned: new BigNumber('5'),
        maxDownloadPriceTBPinned: new BigNumber('4'),
        maxUploadPriceTBPinned: new BigNumber('2'),
        shouldPinAllowance: false,
        shouldPinMaxDownloadPrice: false,
        shouldPinMaxUploadPrice: false,
        shouldPinMaxStoragePrice: false,
        pinnedCurrency: 'usd',
        pinnedThreshold: new BigNumber(10),
        pinningEnabled: false,
        forexEndpointURL: '',
      } as SettingsData)
    })

    it('applies first time user overrides', () => {
      const { gouging, redundancy, pricePinning } = buildAllResponses()
      const values = transformDown({
        hasBeenConfigured: false,
        autopilot: undefined,
        contractSet: undefined,
        uploadPacking: {
          enabled: false,
        },
        gouging,
        redundancy,
        pricePinning,
        averages: {
          settings: {
            download_price: (4e24).toString(),
            storage_price: (4e24).toString(),
            upload_price: (4e24).toString(),
          },
        },
      })
      expect(values.maxUploadPriceTB).toEqual(new BigNumber('4000000000000'))
      expect(values.maxDownloadPriceTB).toEqual(new BigNumber('4000000000000'))
      expect(values.maxStoragePriceTBMonth).toEqual(
        new BigNumber('17280000000000000')
      )
    })

    it('does not apply overrides if missing averages', () => {
      const { gouging, redundancy, pricePinning } = buildAllResponses()
      const values = transformDown({
        hasBeenConfigured: false,
        autopilot: undefined,
        contractSet: undefined,
        uploadPacking: {
          enabled: false,
        },
        gouging,
        redundancy,
        pricePinning,
      })
      expect(values.maxUploadPriceTB).toEqual(new BigNumber('1000.232323'))
      expect(values.maxDownloadPriceTB).toEqual(new BigNumber('1004.31'))
      expect(values.maxStoragePriceTBMonth).toEqual(new BigNumber('909.494702'))
    })
  })

  describe('up', () => {
    it('up autopilot', () => {
      expect(
        transformUpAutopilot(
          'mainnet',
          {
            autopilotContractSet: 'autopilot',
            allowanceMonth: new BigNumber('6006'),
            amountHosts: new BigNumber('51'),
            periodWeeks: new BigNumber('6'),
            renewWindowWeeks: new BigNumber('2.2301587301587302'),
            downloadTBMonth: new BigNumber('0.785365448411428571428571428571'),
            uploadTBMonth: new BigNumber('0.785714285714285714285714285714'),
            storageTB: new BigNumber('1'),
            prune: true,
            allowRedundantIPs: false,
            maxDowntimeHours: new BigNumber('1440'),
            minRecentScanFailures: new BigNumber('10'),
            minProtocolVersion: '',
          },
          undefined
        )
      ).toEqual({
        hosts: {
          allowRedundantIPs: false,
          maxDowntimeHours: 1440,
          minRecentScanFailures: 10,
          scoreOverrides: null,
          minProtocolVersion: '1.6.0',
        },
        contracts: {
          set: 'autopilot',
          amount: 51,
          allowance: '8408400000000000000000000000',
          period: 6048,
          renewWindow: 2248,
          download: 1099511627776,
          upload: 1100000000000,
          storage: 1000000000000,
          prune: true,
        },
      })
    })
    it('up autopilot accepts unknown values', () => {
      expect(
        transformUpAutopilot(
          'mainnet',
          {
            autopilotContractSet: 'autopilot',
            allowanceMonth: new BigNumber('6006'),
            amountHosts: new BigNumber('51'),
            periodWeeks: new BigNumber('6'),
            renewWindowWeeks: new BigNumber('2.2301587301587302'),
            downloadTBMonth: new BigNumber('0.785365448411428571428571428571'),
            uploadTBMonth: new BigNumber('0.785714285714285714285714285714'),
            storageTB: new BigNumber('1'),
            prune: true,
            allowRedundantIPs: false,
            maxDowntimeHours: new BigNumber('1440'),
            minRecentScanFailures: new BigNumber('10'),
            minProtocolVersion: '1.7.0',
          },
          {
            foobar1: 'value',
            contracts: {
              foobar: 'value',
              period: 7777,
            },
            hosts: {
              foobar: 'value',
            },
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
          } as any
        )
      ).toEqual({
        foobar1: 'value',
        hosts: {
          foobar: 'value',
          allowRedundantIPs: false,
          maxDowntimeHours: 1440,
          minRecentScanFailures: 10,
          scoreOverrides: null,
          minProtocolVersion: '1.7.0',
        },
        contracts: {
          foobar: 'value',
          set: 'autopilot',
          amount: 51,
          allowance: '8408400000000000000000000000',
          period: 6048,
          renewWindow: 2248,
          download: 1099511627776,
          upload: 1100000000000,
          storage: 1000000000000,
          prune: true,
        },
      })
    })
    it('uses testnet defaults', () => {
      expect(
        transformUpAutopilot(
          'zen',
          {
            autopilotContractSet: 'autopilot',
            allowanceMonth: new BigNumber('6006'),
            amountHosts: undefined,
            periodWeeks: new BigNumber('6'),
            renewWindowWeeks: new BigNumber('2.2301587301587302'),
            downloadTBMonth: new BigNumber('0.785365448411428571428571428571'),
            uploadTBMonth: new BigNumber('0.785714285714285714285714285714'),
            storageTB: new BigNumber('1'),
            prune: true,
            allowRedundantIPs: false,
            maxDowntimeHours: new BigNumber('1440'),
            minRecentScanFailures: new BigNumber('10'),
            minProtocolVersion: '1.7.0',
          },
          {
            contracts: {
              period: 7777,
            },
            hosts: {},
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
          } as any
        )
      ).toEqual({
        hosts: {
          allowRedundantIPs: false,
          maxDowntimeHours: 1440,
          minRecentScanFailures: 10,
          scoreOverrides: null,
          minProtocolVersion: '1.7.0',
        },
        contracts: {
          set: 'autopilot',
          amount: 12,
          allowance: '8408400000000000000000000000',
          period: 6048,
          renewWindow: 2248,
          download: 1099511627776,
          upload: 1100000000000,
          storage: 1000000000000,
          prune: true,
        },
      })
    })

    it('up contractset', () => {
      expect(
        transformUpContractSet(
          {
            defaultContractSet: 'myset',
          },
          {
            default: '77777777777',
            foobar: 'value',
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
          } as any
        )
      ).toEqual({
        default: 'myset',
        foobar: 'value',
      })
    })

    it('up gouging', () => {
      expect(
        transformUpGouging(
          {
            autopilotContractSet: 'autopilot',
            allowanceMonth: new BigNumber('6006'),
            amountHosts: new BigNumber('51'),
            periodWeeks: new BigNumber('6'),
            renewWindowWeeks: new BigNumber('2.2301587301587302'),
            downloadTBMonth: new BigNumber('0.785365448411428571428571428571'),
            uploadTBMonth: new BigNumber('0.785714285714285714285714285714'),
            storageTB: new BigNumber('1'),
            prune: true,
            allowRedundantIPs: false,
            maxDowntimeHours: new BigNumber('1440'),
            minRecentScanFailures: new BigNumber('10'),
            minProtocolVersion: '1.7.0',
            defaultContractSet: 'myset',
            uploadPackingEnabled: false,
            hostBlockHeightLeeway: new BigNumber(4),
            maxContractPrice: new BigNumber('20'),
            maxDownloadPriceTB: new BigNumber('1004.31'),
            maxRPCPriceMillion: new BigNumber('99970619'),
            maxStoragePriceTBMonth: new BigNumber('909.494702'),
            maxUploadPriceTB: new BigNumber('1000.232323'),
            minAccountExpiryDays: new BigNumber(1),
            minMaxEphemeralAccountBalance: new BigNumber('1'),
            minPriceTableValidityMinutes: new BigNumber(5),
            minShards: new BigNumber(10),
            totalShards: new BigNumber(30),
            migrationSurchargeMultiplier: new BigNumber(10),
            allowanceMonthPinned: new BigNumber('0'),
            maxStoragePriceTBMonthPinned: new BigNumber('0'),
            maxDownloadPriceTBPinned: new BigNumber('0'),
            maxUploadPriceTBPinned: new BigNumber('0'),
            shouldPinAllowance: false,
            shouldPinMaxDownloadPrice: false,
            shouldPinMaxUploadPrice: false,
            shouldPinMaxStoragePrice: false,
            pinnedCurrency: 'usd',
            pinnedThreshold: new BigNumber(0),
            pinningEnabled: false,
            forexEndpointURL: '',
          },
          {
            maxStoragePrice: '77777777777',
            foobar: 'value',
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
          } as any
        )
      ).toEqual({
        foobar: 'value',
        hostBlockHeightLeeway: 4,
        maxContractPrice: '20000000000000000000000000',
        maxDownloadPrice: '1004310000000000000000000000',
        maxRPCPrice: '99970619000000000000000000',
        maxStoragePrice: '210531181019',
        maxUploadPrice: '1000232323000000000000000000',
        minAccountExpiry: 86400000000000,
        minMaxEphemeralAccountBalance: '1000000000000000000000000',
        minPriceTableValidity: 300000000000,
        migrationSurchargeMultiplier: 10,
      })
    })

    it('up redundancy', () => {
      expect(
        transformUpRedundancy(
          {
            minShards: new BigNumber(10),
            totalShards: new BigNumber(30),
          },
          {
            minShards: 77,
            foobar: 'value',
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
          } as any
        )
      ).toEqual({
        foobar: 'value',
        minShards: 10,
        totalShards: 30,
      })
    })

    it('up price pinning', () => {
      expect(
        transformUpPricePinning(
          {
            pinningEnabled: true,
            pinnedCurrency: 'usd',
            forexEndpointURL: '',
            pinnedThreshold: new BigNumber(1),
            shouldPinAllowance: true,
            allowanceMonthPinned: new BigNumber('1000'),
            shouldPinMaxStoragePrice: true,
            maxStoragePriceTBMonthPinned: new BigNumber('2000'),
            shouldPinMaxUploadPrice: true,
            maxUploadPriceTBPinned: new BigNumber('1'),
            shouldPinMaxDownloadPrice: true,
            maxDownloadPriceTBPinned: new BigNumber('1.1'),
            periodWeeks: new BigNumber('6'),
          },
          {
            otherNewValue: '77777777777',
            foobar: 'value',
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
          } as any
        )
      ).toEqual({
        enabled: true,
        currency: 'usd' as CurrencyId,
        forexEndpointURL: '',
        threshold: 0.01,
        autopilots: {
          autopilot: {
            allowance: {
              pinned: true,
              value: 1400,
            },
          },
        },
        gougingSettingsPins: {
          maxStorage: {
            pinned: true,
            value: 2000,
          },
          maxDownload: {
            pinned: true,
            value: 1.1,
          },
          maxUpload: {
            pinned: true,
            value: 1,
          },
        },
        otherNewValue: '77777777777',
        foobar: 'value',
      })
    })
  })

  describe('down up down', () => {
    it('converts ap download down up down', () => {
      const {
        autopilot,
        contractSet,
        uploadPacking,
        gouging,
        redundancy,
        pricePinning,
      } = buildAllResponses()
      const transformUpMocks = {
        resources: {
          autopilotState: {},
          autopilot: {},
          contractSet: {},
          uploadPacking: {},
          gouging: {},
          redundancy: {},
          pricePinning: {},
          averages: {},
          appSettings: {
            settings: {
              siaCentral: false,
            },
          },
        },
        renterdState: {
          network: 'mainnet' as const,
        },
        isAutopilotEnabled: true,
      }
      const down = transformDown({
        hasBeenConfigured: true,
        autopilot: {
          ...autopilot,
          contracts: {
            ...autopilot.contracts,
            // This value will be rounded when converted to per month.
            download: 91085125718831,
            period: 4244,
          },
        },
        contractSet,
        uploadPacking,
        gouging,
        redundancy,
        pricePinning,
      })
      // Coming down, some fields are a little different due to rounding.
      expect(down.downloadTBMonth).toEqual(new BigNumber('92.72'))

      const downUp = transformUp({
        ...transformUpMocks,
        values: down,
      })
      const downUpDown = transformDown({
        hasBeenConfigured: true,
        ...downUp.payloads,
      })

      // Once saved/rounded, values are then always the same.
      expect(down).toEqual(downUpDown)
      const downUpDownUp = transformUp({
        ...transformUpMocks,
        values: downUpDown,
      })
      expect(downUp).toEqual(downUpDownUp)
    })
  })

  it('ap download', () => {
    const valuePerPeriod = new BigNumber(91085125718831)
    const periodBlocks = new BigNumber(4244)
    const valuePerMonth = valuePerPeriodToPerMonth(
      valuePerPeriod,
      periodBlocks.toNumber()
    )
    expect(valuePerMonth).toEqual(
      new BigNumber('92716244841034.38265786993402450518378887952')
    )
    const periodWeeks = new BigNumber(blocksToWeeks(periodBlocks.toNumber()))
    expect(
      valuePerMonthToPerPeriod(valuePerMonth, periodWeeks).toFixed(0)
    ).toEqual(valuePerPeriod.toString())
  })

  it('month -> period', () => {
    const valuePerMonth = new BigNumber(87908469486735)
    const periodWeeks = new BigNumber(30).div(7)
    expect(valuePerMonthToPerPeriod(valuePerMonth, periodWeeks)).toEqual(
      valuePerMonth
    )
  })
  it('period <- month', () => {
    const valuePerMonth = new BigNumber(30)
    const periodWeeks = new BigNumber(30).div(7)
    const valuePerPeriod = valuePerMonthToPerPeriod(valuePerMonth, periodWeeks)

    const periodBlocks = weeksToBlocks(periodWeeks.toNumber())
    expect(
      valuePerPeriodToPerMonth(valuePerPeriod, periodBlocks).toFixed(0)
    ).toEqual('30')
  })
})

function buildAllResponses() {
  return {
    autopilot: {
      hosts: {
        allowRedundantIPs: false,
        maxDowntimeHours: 1440,
        minRecentScanFailures: 10,
        scoreOverrides: null,
        minProtocolVersion: '1.7.0',
      },
      contracts: {
        set: 'autopilot',
        amount: 51,
        allowance: toHastings(500).toString(),
        period: weeksToBlocks(6),
        renewWindow: 2248,
        download: 1099511627776,
        upload: 1100000000000,
        storage: 1000000000000,
        prune: true,
      },
    },
    contractSet: { default: 'myset' },
    uploadPacking: { enabled: true },
    gouging: {
      hostBlockHeightLeeway: 4,
      maxContractPrice: '20000000000000000000000000',
      maxDownloadPrice: '1004310000000000000000000000',
      maxRPCPrice: '99970619000000000000000000',
      maxStoragePrice: '210531181019',
      maxUploadPrice: '1000232323000000000000000000',
      minAccountExpiry: 86400000000000,
      minMaxEphemeralAccountBalance: '1000000000000000000000000',
      minPriceTableValidity: 300000000000,
      migrationSurchargeMultiplier: 10,
    },
    redundancy: {
      minShards: 10,
      totalShards: 30,
    },
    pricePinning: {
      enabled: false,
      currency: 'usd' as CurrencyId,
      forexEndpointURL: '',
      threshold: 0.1,
      gougingSettingsPins: {
        maxStorage: {
          pinned: false,
          value: 5,
        },
        maxDownload: {
          pinned: false,
          value: 4,
        },
        maxUpload: {
          pinned: false,
          value: 2,
        },
      },
      autopilots: {
        // The default autopilot named 'autopilot'.
        autopilot: {
          allowance: {
            pinned: false,
            value: 100,
          },
        },
      },
    },
  }
}
