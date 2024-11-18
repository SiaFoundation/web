import BigNumber from 'bignumber.js'
import { transformDown } from './transformDown'
import {
  transformUp,
  transformUpAutopilot,
  transformUpGouging,
  transformUpPinned,
  transformUpUpload,
} from './transformUp'
import { InputValues, SubmitValues } from './types'
import {
  blocksToWeeks,
  weeksToBlocks,
  valuePerPeriodToPerMonth,
  valuePerMonthToPerPeriod,
} from '@siafoundation/units'
import { CurrencyId } from '@siafoundation/react-core'
import {
  AutopilotConfig,
  AutopilotState,
  SettingsGouging,
  SettingsPinned,
  SettingsUpload,
} from '@siafoundation/renterd-types'
import { merge } from '@technically/lodash'

describe('tansforms', () => {
  describe('down', () => {
    it('default', () => {
      const { autopilot, gouging, pinned, upload } = buildAllResponses()
      expect(
        transformDown({
          hasBeenConfigured: true,
          autopilot: {
            ...autopilot,
            hosts: {
              ...autopilot.hosts,
              minProtocolVersion: '',
            },
          },
          gouging,
          pinned,
          upload,
        })
      ).toEqual({
        amountHosts: new BigNumber('51'),
        periodWeeks: new BigNumber('6'),
        renewWindowWeeks: new BigNumber('2.2301587301587302'),
        downloadTBMonth: new BigNumber('0.79'),
        uploadTBMonth: new BigNumber('0.79'),
        storageTB: new BigNumber('1'),
        prune: true,
        allowRedundantIPs: false,
        maxDowntimeHours: new BigNumber('1440'),
        maxConsecutiveScanFailures: new BigNumber('10'),
        minProtocolVersion: '',
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
        maxStoragePriceTBMonthPinned: new BigNumber('5'),
        maxDownloadPriceTBPinned: new BigNumber('4'),
        maxUploadPriceTBPinned: new BigNumber('2'),
        shouldPinMaxDownloadPrice: false,
        shouldPinMaxUploadPrice: false,
        shouldPinMaxStoragePrice: false,
        pinnedCurrency: 'usd',
        pinnedThreshold: new BigNumber(10),
      } as InputValues)
    })

    it('applies first time user overrides', () => {
      const { gouging, pinned, upload } = buildAllResponses()
      const values = transformDown({
        hasBeenConfigured: false,
        autopilot: undefined,
        pinned,
        gouging,
        upload: merge(upload, {
          packing: {
            enabled: false,
          },
        }),
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
      const { gouging, pinned, upload } = buildAllResponses()
      const values = transformDown({
        hasBeenConfigured: false,
        autopilot: undefined,
        gouging,
        pinned,
        upload: merge(upload, {
          packing: {
            enabled: false,
          },
        }),
      })
      expect(values.maxUploadPriceTB).toEqual(new BigNumber('1000.232323'))
      expect(values.maxDownloadPriceTB).toEqual(new BigNumber('1004.31'))
      expect(values.maxStoragePriceTBMonth).toEqual(new BigNumber('909.494702'))
    })
  })

  describe('up', () => {
    describe('autopilot', () => {
      it('up autopilot', () => {
        expect(
          transformUpAutopilot(
            'mainnet',
            {
              amountHosts: new BigNumber('51'),
              periodWeeks: new BigNumber('6'),
              renewWindowWeeks: new BigNumber('2.2301587301587302'),
              downloadTBMonth: new BigNumber(
                '0.785365448411428571428571428571'
              ),
              uploadTBMonth: new BigNumber('0.785714285714285714285714285714'),
              storageTB: new BigNumber('1'),
              prune: true,
              allowRedundantIPs: false,
              maxDowntimeHours: new BigNumber('1440'),
              maxConsecutiveScanFailures: new BigNumber('10'),
              minProtocolVersion: '',
            },
            undefined
          )
        ).toEqual({
          hosts: {
            allowRedundantIPs: false,
            maxDowntimeHours: 1440,
            maxConsecutiveScanFailures: 10,
            scoreOverrides: {},
            minProtocolVersion: '1.6.0',
          },
          contracts: {
            amount: 51,
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
              amountHosts: new BigNumber('51'),
              periodWeeks: new BigNumber('6'),
              renewWindowWeeks: new BigNumber('2.2301587301587302'),
              downloadTBMonth: new BigNumber(
                '0.785365448411428571428571428571'
              ),
              uploadTBMonth: new BigNumber('0.785714285714285714285714285714'),
              storageTB: new BigNumber('1'),
              prune: true,
              allowRedundantIPs: false,
              maxDowntimeHours: new BigNumber('1440'),
              maxConsecutiveScanFailures: new BigNumber('10'),
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
            maxConsecutiveScanFailures: 10,
            scoreOverrides: {},
            minProtocolVersion: '1.7.0',
          },
          contracts: {
            foobar: 'value',
            amount: 51,
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
              amountHosts: undefined,
              periodWeeks: new BigNumber('6'),
              renewWindowWeeks: new BigNumber('2.2301587301587302'),
              downloadTBMonth: new BigNumber(
                '0.785365448411428571428571428571'
              ),
              uploadTBMonth: new BigNumber('0.785714285714285714285714285714'),
              storageTB: new BigNumber('1'),
              prune: true,
              allowRedundantIPs: false,
              maxDowntimeHours: new BigNumber('1440'),
              maxConsecutiveScanFailures: new BigNumber('10'),
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
            maxConsecutiveScanFailures: 10,
            scoreOverrides: {},
            minProtocolVersion: '1.7.0',
          },
          contracts: {
            amount: 12,
            period: 6048,
            renewWindow: 2248,
            download: 1099511627776,
            upload: 1100000000000,
            storage: 1000000000000,
            prune: true,
          },
        })
      })
    })

    describe('up gouging', () => {
      it('up gouging', () => {
        expect(
          transformUpGouging(
            {
              amountHosts: new BigNumber('51'),
              periodWeeks: new BigNumber('6'),
              renewWindowWeeks: new BigNumber('2.2301587301587302'),
              downloadTBMonth: new BigNumber(
                '0.785365448411428571428571428571'
              ),
              uploadTBMonth: new BigNumber('0.785714285714285714285714285714'),
              storageTB: new BigNumber('1'),
              prune: true,
              allowRedundantIPs: false,
              maxDowntimeHours: new BigNumber('1440'),
              maxConsecutiveScanFailures: new BigNumber('10'),
              minProtocolVersion: '1.7.0',
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
              maxStoragePriceTBMonthPinned: new BigNumber('0'),
              maxDownloadPriceTBPinned: new BigNumber('0'),
              maxUploadPriceTBPinned: new BigNumber('0'),
              shouldPinMaxDownloadPrice: false,
              shouldPinMaxUploadPrice: false,
              shouldPinMaxStoragePrice: false,
              pinnedCurrency: 'usd',
              pinnedThreshold: new BigNumber(0),
            } as SubmitValues,
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
          maxDownloadPrice: '1004310000000000',
          maxRPCPrice: '99970619000000000000000000',
          maxStoragePrice: '210531181019',
          maxUploadPrice: '1000232323000000',
          minAccountExpiry: 86400000000000,
          minMaxEphemeralAccountBalance: '1000000000000000000000000',
          minPriceTableValidity: 300000000000,
          migrationSurchargeMultiplier: 10,
        })
      })
    })

    describe('up pinned', () => {
      it('up pinned', () => {
        expect(
          transformUpPinned(
            {
              pinnedCurrency: 'usd',
              pinnedThreshold: new BigNumber(1),
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
          currency: 'usd' as CurrencyId,
          threshold: 0.01,
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
  })

  describe('up upload', () => {
    it('up upload', () => {
      const { upload } = buildAllResponses()
      expect(
        transformUpUpload(
          {
            uploadPackingEnabled: false,
            minShards: new BigNumber(11),
            totalShards: new BigNumber(30),
          },
          {
            ...upload,
            extraUploadValue: 'value',
            packing: {
              ...upload.packing,
              extraPackingValue: 'value',
            },
            redundancy: {
              ...upload.redundancy,
              extraRedundancyValue: 'value',
            },
          } as SettingsUpload
        )
      ).toEqual({
        packing: {
          ...upload.packing,
          enabled: false,
          extraPackingValue: 'value',
        },
        redundancy: {
          ...upload.redundancy,
          minShards: 11,
          totalShards: 30,
          extraRedundancyValue: 'value',
        },
        extraUploadValue: 'value',
      })
    })
  })

  describe('down up down - ensure converting back and forth results in the same values', () => {
    it('converts ap download down up down', () => {
      const { autopilotState, autopilot, gouging, pinned, upload } =
        buildAllResponses()
      const transformUpMocks = {
        resources: {
          autopilotState: {
            data: autopilotState,
          },
          autopilot: {},
          gouging: { data: gouging },
          pinned: { data: pinned },
          upload: { data: upload },
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
        gouging,
        pinned,
        upload,
      })
      // Coming down, some fields are a little different due to rounding.
      expect(down.downloadTBMonth).toEqual(new BigNumber('92.72'))

      const downUp = transformUp({
        ...transformUpMocks,
        values: down as SubmitValues,
      })
      const downUpDown = transformDown({
        hasBeenConfigured: true,
        ...downUp.payloads,
      })

      // Once saved/rounded, values are then always the same.
      expect(down).toEqual(downUpDown)

      const downUpDownUp = transformUp({
        ...transformUpMocks,
        values: down as SubmitValues,
      })
      expect(downUp).toEqual(downUpDownUp)
    })
  })

  describe('specific unit conversions work back and forth', () => {
    it('period -> month -> period', () => {
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
      const valuePerPeriod = valuePerMonthToPerPeriod(
        valuePerMonth,
        periodWeeks
      )

      const periodBlocks = weeksToBlocks(periodWeeks.toNumber())
      expect(
        valuePerPeriodToPerMonth(valuePerPeriod, periodBlocks).toFixed(0)
      ).toEqual('30')
    })
  })
})

function buildAllResponses() {
  return {
    autopilotState: {
      id: 'autopilot',
      configured: true,
      migrating: true,
      migratingLastStart: new Date().toISOString(),
      scanning: true,
      scanningLastStart: new Date().toISOString(),
      pruning: true,
      pruningLastStart: new Date().toISOString(),
      uptimeMS: '333',
      network: 'mainnet' as const,
      version: '0.0.0',
      commit: 'commit',
      OS: 'os',
      buildTime: new Date().getTime(),
      startTime: new Date().getTime(),
    } as AutopilotState,
    autopilot: {
      hosts: {
        allowRedundantIPs: false,
        maxDowntimeHours: 1440,
        maxConsecutiveScanFailures: 10,
        scoreOverrides: {},
        minProtocolVersion: '1.7.0',
      },
      contracts: {
        amount: 51,
        period: weeksToBlocks(6),
        renewWindow: 2248,
        download: 1099511627776,
        upload: 1100000000000,
        storage: 1000000000000,
        prune: true,
      },
    } as AutopilotConfig,
    gouging: {
      hostBlockHeightLeeway: 4,
      maxContractPrice: '20000000000000000000000000',
      maxDownloadPrice: '1004310000000000',
      maxRPCPrice: '99970619000000000000000000',
      maxStoragePrice: '210531181019',
      maxUploadPrice: '1000232323000000',
      minAccountExpiry: 86400000000000,
      minMaxEphemeralAccountBalance: '1000000000000000000000000',
      minPriceTableValidity: 300000000000,
      migrationSurchargeMultiplier: 10,
    } as SettingsGouging,
    pinned: {
      currency: 'usd' as CurrencyId,
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
    } as SettingsPinned,
    upload: {
      packing: {
        enabled: true,
        slabBufferMaxSizeSoft: 1,
      },
      redundancy: {
        minShards: 10,
        totalShards: 30,
      },
    } as SettingsUpload,
  }
}
