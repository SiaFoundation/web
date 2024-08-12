import BigNumber from 'bignumber.js'
import {
  transformUpAutopilot,
  transformUpContractSet,
  transformUpGouging,
  transformUpRedundancy,
} from './transformUp'
import { monthsToBlocks, toHastings } from '@siafoundation/units'
import { transformDown } from './transformDown'

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
          maxRpcPriceMillion: new BigNumber('99970619'),
          maxStoragePriceTBMonth: new BigNumber('909.494702'),
          maxUploadPriceTB: new BigNumber('1000.232323'),
          minAccountExpiryDays: new BigNumber(1),
          minMaxEphemeralAccountBalance: new BigNumber('1'),
          minPriceTableValidityMinutes: new BigNumber(5),
          minShards: new BigNumber(10),
          totalShards: new BigNumber(30),
          migrationSurchargeMultiplier: new BigNumber(10),
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
})

describe('up down', () => {
  it('converts ap download up down', () => {
    const { autopilot, contractSet, uploadPacking, gouging, redundancy } =
      buildAllResponses()
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
    })
    expect(settings.downloadTBMonth).toEqual(new BigNumber('92.72'))
    // A little different due to rounding.
    expect(
      transformUpAutopilot('mainnet', settings, autopilot).contracts.download
    ).toEqual(91088814814815)
    expect(settings.maxRpcPriceMillion).toEqual(new BigNumber('0.1'))

    settings = transformDown({
      hasBeenConfigured: true,
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
    })
    expect(settings.downloadTBMonth).toEqual(new BigNumber('92.72'))
    // Using the rounded value results in same value.
    expect(
      transformUpAutopilot('mainnet', settings, autopilot).contracts.download
    ).toEqual(91088814814815)
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
  }
}
