import BigNumber from 'bignumber.js'
import { transformDown, transformUp } from './transform'

describe('data transforms', () => {
  it('down', () => {
    expect(
      transformDown({
        acceptingContracts: true,
        netAddress: 'tabo.zen.sia.tech:9882',
        maxContractDuration: 25920,
        windowSize: 144,
        contractPrice: '200000000000000000000000',
        baseRPCPrice: '100000000000000000',
        sectorAccessPrice: '100000000000000000',
        collateral: '21053118096',
        maxCollateral: '1000000000000000000000000000',
        minStoragePrice: '10526559048',
        minEgressPrice: '227373675443232',
        minIngressPrice: '9094947017729',
        priceTableValidity: 1800000000000,
        maxRegistryEntries: 100000,
        accountExpiry: 2592000000000000,
        maxAccountBalance: '10000000000000000000000000',
        ingressLimit: 0,
        egressLimit: 0,
        dynDNS: {
          provider: '',
          ipv4: false,
          ipv6: false,
          options: null,
        },
        revision: 0,
      })
    ).toEqual({
      acceptingContracts: true,
      netAddress: 'tabo.zen.sia.tech:9882',
      maxContractDuration: new BigNumber('6'),
      windowSize: new BigNumber('1'),
      contractPrice: new BigNumber('0.2'),
      baseRPCPrice: new BigNumber('1'),
      sectorAccessPrice: new BigNumber('1'),
      collateral: new BigNumber('90.94947'),
      maxCollateral: new BigNumber('1000'),
      minStoragePrice: new BigNumber('45.474735'),
      minEgressPrice: new BigNumber('227.373675'),
      minIngressPrice: new BigNumber('9.094947'),
      priceTableValidity: new BigNumber('30'),
      maxRegistryEntries: new BigNumber('100000'),
      accountExpiry: new BigNumber('30'),
      maxAccountBalance: new BigNumber('10'),
      ingressLimit: new BigNumber('0'),
      egressLimit: new BigNumber('0'),
      dnsProvider: '',
      dnsIpv4: false,
      dnsIpv6: false,
      dnsOptions: null,
    })
  })

  it('up', () => {
    expect(
      transformUp({
        acceptingContracts: true,
        netAddress: 'tabo.zen.sia.tech:9882',
        maxContractDuration: new BigNumber('6'),
        windowSize: new BigNumber('1'),
        contractPrice: new BigNumber('0.2'),
        baseRPCPrice: new BigNumber('1'),
        sectorAccessPrice: new BigNumber('1'),
        collateral: new BigNumber('100'),
        maxCollateral: new BigNumber('1000'),
        minStoragePrice: new BigNumber('50'),
        minEgressPrice: new BigNumber('250'),
        minIngressPrice: new BigNumber('10'),
        priceTableValidity: new BigNumber('30'),
        maxRegistryEntries: new BigNumber('100000'),
        accountExpiry: new BigNumber('30'),
        maxAccountBalance: new BigNumber('10'),
        ingressLimit: new BigNumber('0'),
        egressLimit: new BigNumber('0'),
        dnsProvider: '',
        dnsIpv4: false,
        dnsIpv6: false,
        dnsOptions: null,
      })
    ).toEqual({
      acceptingContracts: true,
      netAddress: 'tabo.zen.sia.tech:9882',
      maxContractDuration: 25920,
      windowSize: 144,
      contractPrice: '200000000000000000000000',
      baseRPCPrice: '100000000000000000',
      sectorAccessPrice: '100000000000000000',
      collateral: '23148148148',
      maxCollateral: '1000000000000000000000000000',
      minStoragePrice: '11574074074',
      minEgressPrice: '250000000000000',
      minIngressPrice: '10000000000000',
      priceTableValidity: 1800000000000,
      maxRegistryEntries: 100000,
      accountExpiry: 2592000000000000,
      maxAccountBalance: '10000000000000000000000000',
      ingressLimit: 0,
      egressLimit: 0,
      dynDNS: {
        provider: '',
        ipv4: false,
        ipv6: false,
        options: null,
      },
    })
  })
})
