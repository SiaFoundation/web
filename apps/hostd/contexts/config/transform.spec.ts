import BigNumber from 'bignumber.js'
import {
  calculateMaxCollateral,
  getShouldPinPrices,
  transformDown,
  transformUpSettings,
  transformUpSettingsPinned,
} from './transform'

const pinnedValues = {
  // settings
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
  accountExpiry: new BigNumber('30'),
  maxAccountBalance: new BigNumber('10'),
  ingressLimit: new BigNumber('0'),
  egressLimit: new BigNumber('0'),
  dnsProvider: 'route53' as const,
  dnsIpv4: false,
  dnsIpv6: false,
  dnsDuckDnsToken: '',
  dnsNoIpEmail: '',
  dnsNoIpPassword: '',
  dnsAwsId: 'ID',
  dnsAwsSecret: 'secret',
  dnsAwsZoneId: 'zone',
  dnsCloudflareToken: '',
  dnsCloudflareZoneId: '',

  // settings pinned
  pinnedCurrency: 'usd' as const,
  pinnedThreshold: new BigNumber('2'),
  shouldPinPrices: false,
  storagePricePinned: new BigNumber('5'),
  egressPricePinned: new BigNumber('2'),
  ingressPricePinned: new BigNumber('1'),
  maxCollateralPinned: new BigNumber('100'),
}

describe('data transforms', () => {
  it('down', () => {
    expect(
      transformDown({
        settings: {
          acceptingContracts: true,
          netAddress: 'tabo.zen.sia.tech:9882',
          maxContractDuration: 25920,
          contractPrice: '200000000000000000000000',
          baseRPCPrice: '1000000000000000000',
          sectorAccessPrice: '1000000000000000000',
          collateralMultiplier: 2,
          maxCollateral: '1000000000000000000000000000',
          storagePrice: '10526559048',
          egressPrice: '227373675443232',
          ingressPrice: '9094947017729',
          priceTableValidity: 1800000000000,
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
        },
        settingsPinned: {
          currency: 'jpy',
          threshold: 0.1,
          storage: {
            pinned: false,
            value: 0,
          },
          ingress: {
            pinned: false,
            value: 0,
          },
          egress: {
            pinned: true,
            value: 400.5,
          },
          maxCollateral: {
            pinned: false,
            value: 0,
          },
        },
      }),
    ).toEqual({
      // settings
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
      // settingsPinned
      pinnedCurrency: 'jpy',
      pinnedThreshold: new BigNumber('10'),
      shouldPinPrices: null,
      storagePricePinned: new BigNumber('0'),
      egressPricePinned: new BigNumber('400.50'),
      ingressPricePinned: new BigNumber('0'),
      maxCollateralPinned: new BigNumber('0'),
    })
  })

  it('up settings', () => {
    expect(
      transformUpSettings(
        {
          // settings
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

          // settings pinned
          pinnedCurrency: 'jpy',
          pinnedThreshold: new BigNumber('10'),
          shouldPinPrices: null,
          storagePricePinned: new BigNumber('0'),
          egressPricePinned: new BigNumber('400.50'),
          ingressPricePinned: new BigNumber('0'),
          maxCollateralPinned: new BigNumber('0'),
        },
        { ddns: { provider: 'invalid' }, foobar: 'foobar' },
      ),
    ).toEqual({
      foobar: 'foobar',
      acceptingContracts: true,
      netAddress: 'tabo.zen.sia.tech:9882',
      maxContractDuration: 25920,
      contractPrice: '200000000000000000000000',
      baseRPCPrice: '1000000000000000000',
      sectorAccessPrice: '1000000000000000000',
      collateralMultiplier: 2,
      maxCollateral: '1000000000000000000000000000',
      storagePrice: '11574074074',
      egressPrice: '250000000000000',
      ingressPrice: '10000000000000',
      priceTableValidity: 1800000000000,
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

  it('up settings pinned', () => {
    expect(
      transformUpSettingsPinned(
        {
          // settings
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

          // settings pinned
          pinnedCurrency: 'jpy',
          pinnedThreshold: new BigNumber('10'),
          shouldPinPrices: false,
          storagePricePinned: new BigNumber('0'),
          egressPricePinned: new BigNumber('400.50'),
          ingressPricePinned: new BigNumber('0'),
          maxCollateralPinned: new BigNumber('0'),
        },
        { other: { pinned: true, value: 200 }, foobar: 'foobar' },
      ),
    ).toEqual({
      currency: 'jpy',
      threshold: 0.1,
      storage: {
        pinned: false,
        value: 0,
      },
      ingress: {
        pinned: false,
        value: 0,
      },
      egress: {
        pinned: false,
        value: 400.5,
      },
      maxCollateral: {
        pinned: false,
        value: 0,
      },
      other: {
        pinned: true,
        value: 200,
      },
      foobar: 'foobar',
    })
  })

  it('up settings pinned applies pinning to all prices', () => {
    expect(
      transformUpSettingsPinned(
        { ...pinnedValues, shouldPinPrices: true },
        undefined,
      ),
    ).toMatchObject({
      storage: { pinned: true },
      egress: { pinned: true },
      ingress: { pinned: true },
      maxCollateral: { pinned: true },
    })
  })

  it('up settings pinned keeps a mixed configuration until the host chooses', () => {
    // The host edited something else in the config and has not made an all or
    // nothing choice, so their existing configuration is written back as is.
    expect(
      transformUpSettingsPinned(
        { ...pinnedValues, shouldPinPrices: null },
        {
          storage: { pinned: true, value: 5 },
          egress: { pinned: false, value: 0 },
          ingress: { pinned: false, value: 0 },
          maxCollateral: { pinned: false, value: 0 },
        },
      ),
    ).toMatchObject({
      storage: { pinned: true },
      egress: { pinned: false },
      ingress: { pinned: false },
      maxCollateral: { pinned: false },
    })
  })

  it('up settings pinned resolves a mixed configuration once the host chooses', () => {
    // Unpinning all and saving unpins the previously pinned price.
    expect(
      transformUpSettingsPinned(
        { ...pinnedValues, shouldPinPrices: false },
        {
          storage: { pinned: true, value: 5 },
          egress: { pinned: false, value: 0 },
          ingress: { pinned: false, value: 0 },
          maxCollateral: { pinned: false, value: 0 },
        },
      ),
    ).toMatchObject({
      storage: { pinned: false },
      egress: { pinned: false },
      ingress: { pinned: false },
      maxCollateral: { pinned: false },
    })
  })

  it('down without pinned settings does not read as a mixed configuration', () => {
    // The pinned settings request can error, in which case the form falls back
    // to its defaults. That must not look like a mixed configuration, which
    // would show the notice and let an unrelated save unpin every price.
    const values = transformDown({
      settings: {
        acceptingContracts: true,
        netAddress: 'tabo.zen.sia.tech:9882',
        maxContractDuration: 25920,
        contractPrice: '200000000000000000000000',
        baseRPCPrice: '1000000000000000000',
        sectorAccessPrice: '1000000000000000000',
        collateralMultiplier: 2,
        maxCollateral: '1000000000000000000000000000',
        storagePrice: '10526559048',
        egressPrice: '227373675443232',
        ingressPrice: '9094947017729',
        priceTableValidity: 1800000000000,
        accountExpiry: 2592000000000000,
        maxAccountBalance: '10000000000000000000000000',
        ingressLimit: 0,
        egressLimit: 0,
        ddns: {
          provider: '',
          ipv4: false,
          ipv6: false,
          options: {},
        },
        revision: 0,
      },
      settingsPinned: undefined,
    } as Parameters<typeof transformDown>[0])
    expect(values.shouldPinPrices).toBe(false)
  })

  it('reads pinning as all, none, or an unresolved mixed configuration', () => {
    const settingsPinned = (
      storage: boolean,
      egress: boolean,
      ingress: boolean,
      maxCollateral: boolean,
    ) => ({
      currency: 'usd',
      threshold: 0.02,
      storage: { pinned: storage, value: 5 },
      egress: { pinned: egress, value: 0 },
      ingress: { pinned: ingress, value: 0 },
      maxCollateral: { pinned: maxCollateral, value: 0 },
    })
    expect(getShouldPinPrices(settingsPinned(true, true, true, true))).toBe(
      true,
    )
    expect(getShouldPinPrices(settingsPinned(false, false, false, false))).toBe(
      false,
    )
    expect(
      getShouldPinPrices(settingsPinned(true, false, false, false)),
    ).toBeNull()
    expect(
      getShouldPinPrices(settingsPinned(true, true, true, false)),
    ).toBeNull()
  })

  it('max collateral', () => {
    expect(
      calculateMaxCollateral(new BigNumber('400'), new BigNumber(2), 10),
    ).toEqual(new BigNumber('24000'))
  })
})
