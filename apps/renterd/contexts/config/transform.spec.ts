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
  monthsToBlocks,
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
        allowanceMonth: new BigNumber('500'),
        amountHosts: new BigNumber('51'),
        periodWeeks: new BigNumber('4.285714285714286'),
        renewWindowWeeks: new BigNumber('2.2301587301587302'),
        downloadTBMonth: new BigNumber('1.1'),
        uploadTBMonth: new BigNumber('1.1'),
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
        allowanceMonthPinned: new BigNumber('0'),
        maxStoragePriceTBMonthPinned: new BigNumber('43200000'),
        maxDownloadPriceTBPinned: new BigNumber('100000000000'),
        maxUploadPriceTBPinned: new BigNumber('1000000000000'),
        maxRPCPriceMillionPinned: new BigNumber('1100000'),
        shouldPinAllowance: false,
        shouldPinMaxDownloadPrice: false,
        shouldPinMaxUploadPrice: false,
        shouldPinMaxStoragePrice: false,
        shouldPinMaxRPCPrice: false,
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
            maxRPCPriceMillionPinned: new BigNumber('0'),
            shouldPinAllowance: false,
            shouldPinMaxDownloadPrice: false,
            shouldPinMaxUploadPrice: false,
            shouldPinMaxStoragePrice: false,
            shouldPinMaxRPCPrice: false,
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
            shouldPinMaxRPCPrice: false,
            maxRPCPriceMillionPinned: new BigNumber('0.001'),
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
          allowance: {
            pinned: true,
            value: 1400,
          },
        },
        gougingSettingsPins: {
          maxStorage: {
            pinned: true,
            value: 4.629629629629629e-13,
          },
          maxDownload: {
            pinned: true,
            value: 1.1e-12,
          },
          maxUpload: {
            pinned: true,
            value: 1e-12,
          },
          maxRPCPrice: {
            pinned: false,
            value: 1e-9,
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
      let settings = transformDown({
        hasBeenConfigured: true,
        autopilot: {
          ...autopilot,
          contracts: {
            ...autopilot.contracts,
            download: 91085125718831,
            period: 4244,
          },
        },
        contractSet,
        uploadPacking,
        gouging: {
          ...gouging,
          maxRPCPrice: '100000000000000000',
        },
        redundancy,
        pricePinning,
      })
      expect(settings.downloadTBMonth).toEqual(new BigNumber('92.72'))
      // a little different due to rounding
      expect(
        transformUpAutopilot('mainnet', settings, autopilot).contracts.download
      ).toEqual(91088814814815)
      expect(settings.maxRPCPriceMillion).toEqual(new BigNumber('0.1'))

      const up = transformUp({
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
          network: 'mainnet',
        },
        isAutopilotEnabled: true,
        values: settings,
      })

      settings = transformDown({
        hasBeenConfigured: true,
        ...up.payloads,
      })
      expect(settings.downloadTBMonth).toEqual(new BigNumber('92.72'))
      // Using the rounded value results in same value.
      expect(
        transformUpAutopilot('mainnet', settings, autopilot).contracts.download
      ).toEqual(91088814814815)
      expect(settings.maxStoragePriceTBMonthPinned).toEqual(
        new BigNumber('43200000')
      )
      expect(settings.maxDownloadPriceTBPinned).toEqual(
        new BigNumber('100000000000')
      )
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
        period: monthsToBlocks(1),
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
          value: 0.00000001,
        },
        maxDownload: {
          pinned: false,
          value: 0.1,
        },
        maxUpload: {
          pinned: false,
          value: 1,
        },
        maxRPCPrice: {
          pinned: false,
          value: 1.1,
        },
      },
      autopilots: {
        allowance: {
          pinned: false,
          value: 0,
        },
      },
    },
  }
}
