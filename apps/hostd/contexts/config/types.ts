import { DNSProvider } from '@siafoundation/hostd-types'
import { CurrencyId } from '@siafoundation/react-core'
import BigNumber from 'bignumber.js'

export type ConfigViewMode = 'basic' | 'advanced'

export const scDecimalPlaces = 6
export const dnsProviderOptions: { value: DNSProvider; label: string }[] = [
  {
    value: '',
    label: 'Off',
  },
  {
    value: 'route53',
    label: 'Route 53',
  },
  {
    value: 'noip',
    label: 'No-IP',
  },
  {
    value: 'duckdns',
    label: 'Duck DNS',
  },
  {
    value: 'cloudflare',
    label: 'Cloudflare',
  },
]

export const defaultValuesSettingsPinned = {
  pinnedCurrency: '' as CurrencyId | '',
  pinnedThreshold: new BigNumber(0),
  // Pinning is all or nothing - either every price is pinned to a fiat value
  // or none are. Hosts configured before this was enforced may still have a
  // mixed set of pinned prices, which reads as `null`: the host has not made
  // an all or nothing choice yet, so their configuration is left as it is
  // until they do. `null` is reserved for that confirmed mixed response - the
  // default here is `false` so that pinned settings which are missing or
  // errored are not mistaken for a mixed configuration.
  shouldPinPrices: false as boolean | null,
  storagePricePinned: new BigNumber(0),
  egressPricePinned: new BigNumber(0),
  ingressPricePinned: new BigNumber(0),
  maxCollateralPinned: new BigNumber(0),
}

/**
 * The prices that can be pinned to a fiat value, as keyed on the daemon's
 * pinned settings.
 */
export type PinnablePrice = 'storage' | 'egress' | 'ingress' | 'maxCollateral'

export const defaultValuesSettings = {
  // Host settings
  acceptingContracts: false,
  netAddress: '',
  maxContractDuration: undefined as BigNumber | undefined,

  // Pricing
  contractPrice: undefined as BigNumber | undefined,
  baseRPCPrice: undefined as BigNumber | undefined,
  sectorAccessPrice: undefined as BigNumber | undefined,

  storagePrice: undefined as BigNumber | undefined,
  egressPrice: undefined as BigNumber | undefined,
  ingressPrice: undefined as BigNumber | undefined,

  collateralMultiplier: undefined as BigNumber | undefined,
  maxCollateral: undefined as BigNumber | undefined,

  priceTableValidity: undefined as BigNumber | undefined,

  // RHP3 settings
  accountExpiry: undefined as BigNumber | undefined,
  maxAccountBalance: undefined as BigNumber | undefined,

  // Bandwidth limiter settings
  ingressLimit: undefined as BigNumber | undefined,
  egressLimit: undefined as BigNumber | undefined,

  // DNS settings
  dnsProvider: '' as DNSProvider,
  dnsIpv4: false,
  dnsIpv6: false,
  // dnsOptions: {} as Record<string, unknown>,

  // DNS DuckDNS
  dnsDuckDnsToken: '',

  // DNS No-IP
  dnsNoIpEmail: '',
  dnsNoIpPassword: '',

  // DNS AWS
  dnsAwsId: '',
  dnsAwsSecret: '',
  dnsAwsZoneId: '',

  // DNS Cloudflare
  dnsCloudflareToken: '',
  dnsCloudflareZoneId: '',
}

export const defaultValues = {
  ...defaultValuesSettings,
  ...defaultValuesSettingsPinned,
}

export type SettingsData = typeof defaultValues
