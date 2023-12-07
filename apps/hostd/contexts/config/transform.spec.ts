import BigNumber from 'bignumber.js'
import { calculateMaxCollateral, transformDown, transformUp } from './transform'

describe('data transforms', () => {
  it('down', () => {
    expect(
      transformDown({
        acceptingContracts: true,
        netAddress: 'tabo.zen.sia.tech:9882',
        maxContractDuration: 25920,
        contractPrice: '200000000000000000000000',
        baseRPCPrice: '100000000000000000',
        sectorAccessPrice: '100000000000000000',
        collateralMultiplier: 2,
        maxCollateral: '1000000000000000000000000000',
        storagePrice: '10526559048',
        egressPrice: '227373675443232',
        ingressPrice: '9094947017729',
        priceTableValidity: 1800000000000,
        maxRegistryEntries: 100000,
        accountExpiry: 2592000000000000,
        maxAccountBalance: '10000000000000000000000000',
        ingressLimit: 0,
        egressLimit: 0,
        ddns: {
          provider: 'route53',
          ipv4: false,
          ipv6: false,
          options: {
            id: 'ID',
            secret: 'secret',
            zoneID: 'zone',
          },
        },
        revision: 0,
      })
    ).toEqual({
      acceptingContracts: true,
      netAddress: 'tabo.zen.sia.tech:9882',
      maxContractDuration: new BigNumber('6'),
      contractPrice: new BigNumber('0.2'),
      baseRPCPrice: new BigNumber('1'),
      sectorAccessPrice: new BigNumber('1'),
      collateralMultiplier: new BigNumber('2'),
      maxCollateral: new BigNumber('1000'),
      storagePrice: new BigNumber('45.474735'),
      egressPrice: new BigNumber('227.373675'),
      ingressPrice: new BigNumber('9.094947'),
      priceTableValidity: new BigNumber('30'),
      maxRegistryEntries: new BigNumber('100000'),
      accountExpiry: new BigNumber('30'),
      maxAccountBalance: new BigNumber('10'),
      ingressLimit: new BigNumber('0'),
      egressLimit: new BigNumber('0'),
      dnsProvider: 'route53',
      dnsIpv4: false,
      dnsIpv6: false,
      dnsAwsId: 'ID',
      dnsAwsSecret: 'secret',
      dnsAwsZoneId: 'zone',
    })
  })

  it('up', () => {
    expect(
      transformUp(
        {
          acceptingContracts: true,
          netAddress: 'tabo.zen.sia.tech:9882',
          maxContractDuration: new BigNumber('6'),
          contractPrice: new BigNumber('0.2'),
          baseRPCPrice: new BigNumber('1'),
          sectorAccessPrice: new BigNumber('1'),
          collateralMultiplier: new BigNumber('2'),
          maxCollateral: new BigNumber('1000'),
          storagePrice: new BigNumber('50'),
          egressPrice: new BigNumber('250'),
          ingressPrice: new BigNumber('10'),
          priceTableValidity: new BigNumber('30'),
          maxRegistryEntries: new BigNumber('100000'),
          accountExpiry: new BigNumber('30'),
          maxAccountBalance: new BigNumber('10'),
          ingressLimit: new BigNumber('0'),
          egressLimit: new BigNumber('0'),
          dnsProvider: 'route53',
          dnsIpv4: false,
          dnsIpv6: false,

          // DNS DuckDNS
          dnsDuckDnsToken: '',

          // DNS No-IP
          dnsNoIpEmail: '',
          dnsNoIpPassword: '',

          // DNS AWS
          dnsAwsId: 'ID',
          dnsAwsSecret: 'secret',
          dnsAwsZoneId: 'zone',

          // DNS Cloudflare
          dnsCloudflareToken: '',
          dnsCloudflareZoneId: '',
        },
        { ddns: { provider: 'invalid' }, foobar: 'foobar' }
      )
    ).toEqual({
      foobar: 'foobar',
      acceptingContracts: true,
      netAddress: 'tabo.zen.sia.tech:9882',
      maxContractDuration: 25920,
      contractPrice: '200000000000000000000000',
      baseRPCPrice: '100000000000000000',
      sectorAccessPrice: '100000000000000000',
      collateralMultiplier: 2,
      maxCollateral: '1000000000000000000000000000',
      storagePrice: '11574074074',
      egressPrice: '250000000000000',
      ingressPrice: '10000000000000',
      priceTableValidity: 1800000000000,
      maxRegistryEntries: 100000,
      accountExpiry: 2592000000000000,
      maxAccountBalance: '10000000000000000000000000',
      ingressLimit: 0,
      egressLimit: 0,
      ddns: {
        provider: 'route53',
        ipv4: false,
        ipv6: false,
        options: {
          id: 'ID',
          secret: 'secret',
          zoneID: 'zone',
        },
      },
    })
  })

  it('max collateral', () => {
    expect(
      calculateMaxCollateral(new BigNumber('400'), new BigNumber(2))
    ).toEqual(new BigNumber('2400'))
  })
})
