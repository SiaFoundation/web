import BigNumber from 'bignumber.js'
import {
  transformDown,
  transformUpAutopilot,
  transformUpContractSet,
  transformUpGouging,
  transformUpRedundancy,
  valuePerMonthToPerPeriod,
  valuePerPeriodToPerMonth,
} from './transform'
import { SettingsData } from './types'
import {
  blocksToWeeks,
  monthsToBlocks,
  weeksToBlocks,
  toHastings,
} from '@siafoundation/units'

describe('tansforms', () => {
  describe('down', () => {
    it('default works', () => {
      expect(
        transformDown({
          autopilot: {
            wallet: {
              defragThreshold: 1000,
            },
            hosts: {
              allowRedundantIPs: false,
              maxDowntimeHours: 1440,
              minRecentScanFailures: 10,
              scoreOverrides: null,
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
            minMaxCollateral: '10000000000000000000000000',
            minMaxEphemeralAccountBalance: '1000000000000000000000000',
            minPriceTableValidity: 300000000000,
            migrationSurchargeMultiplier: 10,
          },
          redundancy: {
            minShards: 10,
            totalShards: 30,
          },
          display: {
            includeRedundancyMaxStoragePrice: false,
            includeRedundancyMaxUploadPrice: false,
          },
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
        defragThreshold: new BigNumber('1000'),
        defaultContractSet: 'myset',
        uploadPackingEnabled: true,
        hostBlockHeightLeeway: new BigNumber(4),
        maxContractPrice: new BigNumber('20'),
        maxDownloadPriceTB: new BigNumber('1004.31'),
        maxRpcPriceMillion: new BigNumber('99970619'),
        maxStoragePriceTBMonth: new BigNumber('909.494702'),
        maxUploadPriceTB: new BigNumber('1000.232323'),
        minAccountExpiryDays: new BigNumber(1),
        minMaxCollateral: new BigNumber('10'),
        minMaxEphemeralAccountBalance: new BigNumber('1'),
        minPriceTableValidityMinutes: new BigNumber(5),
        migrationSurchargeMultiplier: new BigNumber(10),
        minShards: new BigNumber(10),
        totalShards: new BigNumber(30),
        includeRedundancyMaxStoragePrice: false,
        includeRedundancyMaxUploadPrice: false,
      } as SettingsData)
    })

    it('default works with first time user overrides', () => {
      const values = transformDown({
        autopilot: undefined,
        contractSet: undefined,
        uploadPacking: {
          enabled: false,
        },
        gouging: {
          hostBlockHeightLeeway: 4,
          maxContractPrice: '20000000000000000000000000',
          maxDownloadPrice: '1004310000000000000000000000',
          maxRPCPrice: '99970619000000000000000000',
          maxStoragePrice: '210531181019',
          maxUploadPrice: '1000232323000000000000000000',
          minAccountExpiry: 86400000000000,
          minMaxCollateral: '10000000000000000000000000',
          minMaxEphemeralAccountBalance: '1000000000000000000000000',
          minPriceTableValidity: 300000000000,
          migrationSurchargeMultiplier: 10,
        },
        redundancy: {
          minShards: 10,
          totalShards: 30,
        },
        display: undefined,
        averages: {
          settings: {
            download_price: (4e24).toString(),
            storage_price: (4e24).toString(),
            upload_price: (4e24).toString(),
          },
        },
      })
      expect(values.maxUploadPriceTB).toEqual(new BigNumber('12000000000000'))
      expect(values.maxDownloadPriceTB).toEqual(new BigNumber('4000000000000'))
      expect(values.maxStoragePriceTBMonth).toEqual(
        new BigNumber('51840000000000000')
      )
    })

    it('with include redundancy for storage and upload', () => {
      expect(
        transformDown({
          autopilot: {
            wallet: {
              defragThreshold: 1000,
            },
            hosts: {
              allowRedundantIPs: false,
              maxDowntimeHours: 1440,
              minRecentScanFailures: 10,
              scoreOverrides: null,
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
            minMaxCollateral: '10000000000000000000000000',
            minMaxEphemeralAccountBalance: '1000000000000000000000000',
            minPriceTableValidity: 300000000000,
            migrationSurchargeMultiplier: 10,
          },
          redundancy: {
            minShards: 10,
            totalShards: 30,
          },
          display: {
            includeRedundancyMaxStoragePrice: true,
            includeRedundancyMaxUploadPrice: true,
          },
        })
      ).toEqual({
        autopilotContractSet: 'autopilot',
        allowanceMonth: new BigNumber('6006'),
        amountHosts: new BigNumber('51'),
        periodWeeks: new BigNumber('6'),
        renewWindowWeeks: new BigNumber('2.2301587301587302'),
        downloadTBMonth: new BigNumber('0.79'),
        uploadTBMonth: new BigNumber('0.79'),
        storageTB: new BigNumber('1'),
        allowRedundantIPs: false,
        maxDowntimeHours: new BigNumber('1440'),
        minRecentScanFailures: new BigNumber('10'),
        defragThreshold: new BigNumber('1000'),
        defaultContractSet: 'myset',
        uploadPackingEnabled: true,
        hostBlockHeightLeeway: new BigNumber(4),
        maxContractPrice: new BigNumber('20'),
        maxDownloadPriceTB: new BigNumber('1004.31'),
        maxRpcPriceMillion: new BigNumber('99970619'),
        maxStoragePriceTBMonth: new BigNumber('2728.484106'),
        maxUploadPriceTB: new BigNumber('3000.696969'),
        minAccountExpiryDays: new BigNumber(1),
        minMaxCollateral: new BigNumber('10'),
        minMaxEphemeralAccountBalance: new BigNumber('1'),
        minPriceTableValidityMinutes: new BigNumber(5),
        migrationSurchargeMultiplier: new BigNumber(10),
        minShards: new BigNumber(10),
        totalShards: new BigNumber(30),
        includeRedundancyMaxStoragePrice: true,
        includeRedundancyMaxUploadPrice: true,
        prune: true,
      } as SettingsData)
    })
  })

  describe('up', () => {
    it('up autopilot', () => {
      expect(
        transformUpAutopilot(
          'Mainnet',
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
            defragThreshold: new BigNumber('1000'),
          },
          undefined
        )
      ).toEqual({
        wallet: {
          defragThreshold: 1000,
        },
        hosts: {
          allowRedundantIPs: false,
          maxDowntimeHours: 1440,
          minRecentScanFailures: 10,
          scoreOverrides: null,
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
          'Mainnet',
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
            defragThreshold: new BigNumber('1000'),
          },
          {
            foobar1: 'value',
            wallet: {
              foobar: 'value',
            },
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
        wallet: {
          foobar: 'value',
          defragThreshold: 1000,
        },
        hosts: {
          foobar: 'value',
          allowRedundantIPs: false,
          maxDowntimeHours: 1440,
          minRecentScanFailures: 10,
          scoreOverrides: null,
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
          'Zen Testnet',
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
            defragThreshold: new BigNumber('1000'),
          },
          {
            wallet: {},
            contracts: {
              period: 7777,
            },
            hosts: {},
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
          } as any
        )
      ).toEqual({
        wallet: {
          defragThreshold: 1000,
        },
        hosts: {
          allowRedundantIPs: false,
          maxDowntimeHours: 1440,
          minRecentScanFailures: 10,
          scoreOverrides: null,
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
            defragThreshold: new BigNumber('1000'),
            defaultContractSet: 'myset',
            uploadPackingEnabled: false,
            hostBlockHeightLeeway: new BigNumber(4),
            maxContractPrice: new BigNumber('20'),
            maxDownloadPriceTB: new BigNumber('1004.31'),
            maxRpcPriceMillion: new BigNumber('99970619'),
            maxStoragePriceTBMonth: new BigNumber('909.494702'),
            maxUploadPriceTB: new BigNumber('1000.232323'),
            minAccountExpiryDays: new BigNumber(1),
            minMaxCollateral: new BigNumber('10'),
            minMaxEphemeralAccountBalance: new BigNumber('1'),
            minPriceTableValidityMinutes: new BigNumber(5),
            minShards: new BigNumber(10),
            totalShards: new BigNumber(30),
            migrationSurchargeMultiplier: new BigNumber(10),
            includeRedundancyMaxStoragePrice: false,
            includeRedundancyMaxUploadPrice: false,
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
        minMaxCollateral: '10000000000000000000000000',
        minMaxEphemeralAccountBalance: '1000000000000000000000000',
        minPriceTableValidity: 300000000000,
        migrationSurchargeMultiplier: 10,
      })
    })

    it('up gouging with include redundancy for storage', () => {
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
            defragThreshold: new BigNumber('1000'),
            defaultContractSet: 'myset',
            uploadPackingEnabled: false,
            hostBlockHeightLeeway: new BigNumber(4),
            maxContractPrice: new BigNumber('20'),
            maxDownloadPriceTB: new BigNumber('1004.31'),
            maxRpcPriceMillion: new BigNumber('99970619'),
            maxStoragePriceTBMonth: new BigNumber('909.494702'),
            maxUploadPriceTB: new BigNumber('1000.232323'),
            minAccountExpiryDays: new BigNumber(1),
            minMaxCollateral: new BigNumber('10'),
            minMaxEphemeralAccountBalance: new BigNumber('1'),
            minPriceTableValidityMinutes: new BigNumber(5),
            migrationSurchargeMultiplier: new BigNumber(10),
            minShards: new BigNumber(10),
            totalShards: new BigNumber(30),
            includeRedundancyMaxStoragePrice: true,
            includeRedundancyMaxUploadPrice: false,
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
        maxStoragePrice: '70177060340',
        maxUploadPrice: '1000232323000000000000000000',
        minAccountExpiry: 86400000000000,
        minMaxCollateral: '10000000000000000000000000',
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
  })

  describe('up down', () => {
    it('converts ap download up down', () => {
      const {
        autopilot,
        contractSet,
        uploadPacking,
        gouging,
        redundancy,
        display,
      } = buildAllResponses()
      let settings = transformDown({
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
        gouging,
        redundancy,
        display,
      })
      expect(settings.downloadTBMonth).toEqual(new BigNumber('92.72'))
      // a little different due to rounding
      expect(
        transformUpAutopilot('Mainnet', settings, autopilot).contracts.download
      ).toEqual(91088814814815)

      settings = transformDown({
        autopilot: {
          ...autopilot,
          contracts: {
            ...autopilot.contracts,
            download: 91088814814815,
            period: 4244,
          },
        },
        contractSet,
        uploadPacking,
        gouging,
        redundancy,
        display,
      })
      expect(settings.downloadTBMonth).toEqual(new BigNumber('92.72'))
      // using the rounded value results in same value
      expect(
        transformUpAutopilot('Mainnet', settings, autopilot).contracts.download
      ).toEqual(91088814814815)
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
      wallet: {
        defragThreshold: 1000,
      },
      hosts: {
        allowRedundantIPs: false,
        maxDowntimeHours: 1440,
        minRecentScanFailures: 10,
        scoreOverrides: null,
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
      minMaxCollateral: '10000000000000000000000000',
      minMaxEphemeralAccountBalance: '1000000000000000000000000',
      minPriceTableValidity: 300000000000,
      migrationSurchargeMultiplier: 10,
    },
    redundancy: {
      minShards: 10,
      totalShards: 30,
    },
    display: {
      includeRedundancyMaxStoragePrice: false,
      includeRedundancyMaxUploadPrice: false,
    },
  }
}
