import { DNSProvider } from '@siafoundation/hostd-types'
import BigNumber from 'bignumber.js'

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

export const initialValues = {
  // Host settings
  acceptingContracts: false,
  netAddress: '',
  maxContractDuration: undefined as BigNumber | undefined,

  // Pricing
  contractPrice: undefined as BigNumber | undefined,
  baseRPCPrice: undefined as BigNumber | undefined,
  sectorAccessPrice: undefined as BigNumber | undefined,

  collateralMultiplier: undefined as BigNumber | undefined,
  maxCollateral: undefined as BigNumber | undefined,

  storagePrice: undefined as BigNumber | undefined,
  egressPrice: undefined as BigNumber | undefined,
  ingressPrice: undefined as BigNumber | undefined,

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

export type SettingsData = typeof initialValues
