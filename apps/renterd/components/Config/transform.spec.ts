import BigNumber from 'bignumber.js'
import {
  transformDown,
  transformUpContractSet,
  transformUpGouging,
  transformUpRedundancy,
} from './transform'

describe('data transforms', () => {
  it('down', () => {
    expect(
      transformDown(
        { default: 'myset' },
        { enabled: true },
        {
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
        },
        {
          minShards: 10,
          totalShards: 30,
        },
        {
          includeRedundancyMaxStoragePrice: false,
          includeRedundancyMaxUploadPrice: false,
        }
      )
    ).toEqual({
      contractSet: 'myset',
      uploadPackingEnabled: true,
      hostBlockHeightLeeway: new BigNumber(4),
      maxContractPrice: new BigNumber('20'),
      maxDownloadPrice: new BigNumber('1004.31'),
      maxRpcPrice: new BigNumber('99970619'),
      maxStoragePrice: new BigNumber('909.494702'),
      maxUploadPrice: new BigNumber('1000.232323'),
      minAccountExpiry: new BigNumber(1),
      minMaxCollateral: new BigNumber('10'),
      minMaxEphemeralAccountBalance: new BigNumber('1'),
      minPriceTableValidity: new BigNumber(5),
      minShards: new BigNumber(10),
      totalShards: new BigNumber(30),
      includeRedundancyMaxStoragePrice: false,
      includeRedundancyMaxUploadPrice: false,
    })
  })

  it('down with include redundancy for storage and upload', () => {
    expect(
      transformDown(
        { default: 'myset' },
        { enabled: true },
        {
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
        },
        {
          minShards: 10,
          totalShards: 30,
        },
        {
          includeRedundancyMaxStoragePrice: true,
          includeRedundancyMaxUploadPrice: true,
        }
      )
    ).toEqual({
      contractSet: 'myset',
      uploadPackingEnabled: true,
      hostBlockHeightLeeway: new BigNumber(4),
      maxContractPrice: new BigNumber('20'),
      maxDownloadPrice: new BigNumber('1004.31'),
      maxRpcPrice: new BigNumber('99970619'),
      maxStoragePrice: new BigNumber('2728.484106'),
      maxUploadPrice: new BigNumber('3000.696969'),
      minAccountExpiry: new BigNumber(1),
      minMaxCollateral: new BigNumber('10'),
      minMaxEphemeralAccountBalance: new BigNumber('1'),
      minPriceTableValidity: new BigNumber(5),
      minShards: new BigNumber(10),
      totalShards: new BigNumber(30),
      includeRedundancyMaxStoragePrice: true,
      includeRedundancyMaxUploadPrice: true,
    })
  })

  it('up contractset', () => {
    expect(
      transformUpContractSet(
        {
          contractSet: 'myset',
        },
        {
          default: '77777777777',
          foobar: 'value',
        }
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
          contractSet: 'myset',
          uploadPackingEnabled: false,
          hostBlockHeightLeeway: new BigNumber(4),
          maxContractPrice: new BigNumber('20'),
          maxDownloadPrice: new BigNumber('1004.31'),
          maxRpcPrice: new BigNumber('99970619'),
          maxStoragePrice: new BigNumber('909.494702'),
          maxUploadPrice: new BigNumber('1000.232323'),
          minAccountExpiry: new BigNumber(1),
          minMaxCollateral: new BigNumber('10'),
          minMaxEphemeralAccountBalance: new BigNumber('1'),
          minPriceTableValidity: new BigNumber(5),
          minShards: new BigNumber(10),
          totalShards: new BigNumber(30),
          includeRedundancyMaxStoragePrice: false,
          includeRedundancyMaxUploadPrice: false,
        },
        {
          maxStoragePrice: '77777777777',
          foobar: 'value',
        }
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
    })
  })

  it('up gouging with include redundancy for storage', () => {
    expect(
      transformUpGouging(
        {
          contractSet: 'myset',
          uploadPackingEnabled: false,
          hostBlockHeightLeeway: new BigNumber(4),
          maxContractPrice: new BigNumber('20'),
          maxDownloadPrice: new BigNumber('1004.31'),
          maxRpcPrice: new BigNumber('99970619'),
          maxStoragePrice: new BigNumber('909.494702'),
          maxUploadPrice: new BigNumber('1000.232323'),
          minAccountExpiry: new BigNumber(1),
          minMaxCollateral: new BigNumber('10'),
          minMaxEphemeralAccountBalance: new BigNumber('1'),
          minPriceTableValidity: new BigNumber(5),
          minShards: new BigNumber(10),
          totalShards: new BigNumber(30),
          includeRedundancyMaxStoragePrice: true,
          includeRedundancyMaxUploadPrice: false,
        },
        {
          maxStoragePrice: '77777777777',
          foobar: 'value',
        }
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
        }
      )
    ).toEqual({
      foobar: 'value',
      minShards: 10,
      totalShards: 30,
    })
  })
})
