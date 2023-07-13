import { blocksToMonths, ConfigFields } from '@siafoundation/design-system'
import { DNSProvider } from '@siafoundation/react-hostd'
import BigNumber from 'bignumber.js'

export const scDecimalPlaces = 6
const dnsProviderOptions: { value: DNSProvider; label: string }[] = [
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

  // Registry settings
  maxRegistryEntries: undefined as BigNumber | undefined,

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

type Categories = 'host' | 'pricing' | 'DNS' | 'bandwidth' | 'registry' | 'RHP3'

export const fields: ConfigFields<typeof initialValues, Categories> = {
  // Host
  acceptingContracts: {
    type: 'boolean',
    category: 'host',
    title: 'Accepting contracts',
    description: <>Whether or not the host is accepting contracts.</>,
    validation: {},
  },
  netAddress: {
    type: 'text',
    category: 'host',
    title: 'Address',
    description: <>The network address of the host.</>,
    placeholder: 'my.host.com:9882',
    validation: {
      required: 'required',
    },
  },
  maxContractDuration: {
    type: 'number',
    category: 'host',
    title: 'Maximum contract duration',
    units: 'months',
    decimalsLimit: 2,
    suggestion: new BigNumber(6),
    suggestionTip: 'The default maximum duration is 6 months.',

    description: <>The maximum contract duration that the host will accept.</>,
    validation: {
      required: 'required',
      validate: {
        min: (value) =>
          new BigNumber(value as BigNumber).gte(blocksToMonths(4320)) ||
          `must be at least 1 month`,
      },
    },
  },

  // Pricing
  storagePrice: {
    title: 'Storage price',
    type: 'siacoin',
    category: 'pricing',
    units: 'SC/TB/month',
    decimalsLimitSc: scDecimalPlaces,

    description: (
      <>{`The host's storage price in siacoins per TB per month.`}</>
    ),
    validation: {
      required: 'required',
    },
  },
  egressPrice: {
    title: 'Egress price',
    type: 'siacoin',
    category: 'pricing',
    units: 'SC/TB',
    decimalsLimitSc: scDecimalPlaces,

    description: <>{`The host's egress price in siacoins per TB.`}</>,
    validation: {
      required: 'required',
    },
  },
  ingressPrice: {
    title: 'Ingress price',
    type: 'siacoin',
    category: 'pricing',
    units: 'SC/TB',
    decimalsLimitSc: scDecimalPlaces,

    description: <>{`The host's ingress price in siacoins per TB.`}</>,
    validation: {
      required: 'required',
    },
  },
  collateralMultiplier: {
    title: 'Collateral multiplier',
    type: 'number',
    category: 'pricing',
    units: '* storage price',
    placeholder: '2',
    decimalsLimit: 1,
    description: (
      <>{`The host's target collateral as a multiple of storage price.`}</>
    ),
    suggestion: new BigNumber(2),
    suggestionTip: 'The default multiplier is 2x the storage price.',
    validation: {
      required: 'required',
    },
  },
  maxCollateral: {
    title: 'Maximum collateral',
    type: 'siacoin',
    category: 'pricing',
    decimalsLimitSc: scDecimalPlaces,

    description: <>{`The host's maximum collateral in siacoins.`}</>,
    validation: {
      required: 'required',
    },
  },
  contractPrice: {
    title: 'Contract price',
    type: 'siacoin',
    category: 'pricing',
    decimalsLimitSc: scDecimalPlaces,
    description: <>{`The host's contract price in siacoins.`}</>,
    validation: {
      required: 'required',
    },
  },
  baseRPCPrice: {
    title: 'Base RPC price',
    type: 'siacoin',
    category: 'pricing',
    units: 'SC/million',
    decimalsLimitSc: scDecimalPlaces,
    description: (
      <>{`The host's base RPC price in siacoins per million calls.`}</>
    ),
    validation: {
      required: 'required',
    },
  },
  sectorAccessPrice: {
    title: 'Sector access price',
    type: 'siacoin',
    category: 'pricing',
    units: 'SC/million',
    decimalsLimitSc: scDecimalPlaces,

    description: (
      <>{`The host's sector access price in siacoins million sectors.`}</>
    ),
    validation: {
      required: 'required',
    },
  },
  priceTableValidity: {
    title: 'Price table validity',
    type: 'number',
    category: 'pricing',
    units: 'minutes',
    description: (
      <>{`How long a renter's registered price table remains valid.`}</>
    ),
    validation: {
      required: 'required',
    },
  },

  // Registry
  maxRegistryEntries: {
    title: 'Maximum registry size',
    type: 'number',
    category: 'registry',
    units: 'entries',
    decimalsLimit: 0,
    description: (
      <>{`The maximum number of registry entries that the host will store. Each registry entry is up to 113 bytes.`}</>
    ),
    validation: {
      required: 'required',
    },
  },

  // RHP3 settings
  accountExpiry: {
    title: 'Expiry',
    type: 'number',
    category: 'RHP3',
    units: 'days',
    description: (
      <>{`How long a renter's ephemeral accounts are inactive before the host prunes them and recovers the remaining funds.`}</>
    ),
    validation: {
      required: 'required',
      validate: {
        min: (value) =>
          new BigNumber(value as BigNumber).gte(7) || `must be at least 1 week`,
      },
    },
  },
  maxAccountBalance: {
    title: 'Maximum balance',
    type: 'siacoin',
    category: 'RHP3',
    description: (
      <>{`Maximum balance a renter's ephemeral account can have. When the limit is reached, deposits are rejected until some of the funds have been spent.`}</>
    ),
    validation: {
      required: 'required',
      validate: {
        min: (value) =>
          new BigNumber(value as BigNumber).gte(1) || `must be at least 1 SC`,
      },
    },
  },

  // Bandwidth
  ingressLimit: {
    title: 'Ingress limit',
    type: 'number',
    category: 'bandwidth',
    units: 'MB/second',
    description: (
      <>The maximum amount of ingress bandwidth traffic in MB per second.</>
    ),
    validation: {
      required: 'required',
    },
  },
  egressLimit: {
    title: 'Egress limit',
    type: 'number',
    category: 'bandwidth',
    units: 'MB/second',
    description: (
      <>The maximum amount of egress bandwidth traffic in MB per second.</>
    ),
    validation: {
      required: 'required',
    },
  },

  // DNS
  dnsProvider: {
    title: 'Dynamic DNS Provider',
    type: 'select',
    category: 'DNS',
    options: dnsProviderOptions,

    description: <>Enable dynamic DNS with one of the supported providers.</>,
    validation: {
      validate: (value) =>
        !!dnsProviderOptions.find((o) => o.value === value) ||
        'must be one of supported providers',
    },
  },
  dnsIpv4: {
    title: 'IPv4',
    type: 'boolean',
    category: 'DNS',
    description: <>Whether IPv4 is enabled.</>,
    show: (values) => !!values.dnsProvider,
    validation: {
      validate: (value, values) =>
        !values.dnsProvider ||
        !!(value || values.dnsIpv6) ||
        'at least one of IPv4 and IPv6 must be enabled',
    },
    trigger: ['dnsIpv6'],
  },
  dnsIpv6: {
    type: 'boolean',
    title: 'IPv6',
    category: 'DNS',
    description: <>Whether IPv6 is enabled.</>,
    show: (values) => !!values.dnsProvider,
    validation: {
      validate: (value, values) =>
        !values.dnsProvider ||
        !!(value || values.dnsIpv4) ||
        'at least one of IPv4 and IPv6 must be enabled',
    },
    trigger: ['dnsIpv4'],
  },

  // DNS DuckDNS
  dnsDuckDnsToken: {
    type: 'text',
    title: 'Token',
    category: 'DNS',
    description: <>DuckDNS token.</>,
    show: (values) => values.dnsProvider === 'duckdns',
    validation: {
      validate: (value, values) =>
        values.dnsProvider !== 'duckdns' || !!value || 'required',
    },
  },

  // DNS No-IP
  dnsNoIpEmail: {
    type: 'text',
    title: 'Email',
    category: 'DNS',
    description: <>No-IP email.</>,
    show: (values) => values.dnsProvider === 'noip',
    validation: {
      validate: (value, values) =>
        values.dnsProvider !== 'noip' || !!value || 'required',
    },
  },
  dnsNoIpPassword: {
    type: 'password',
    title: 'Password',
    category: 'DNS',
    description: <>No-IP password.</>,
    show: (values) => values.dnsProvider === 'noip',
    validation: {
      validate: (value, values) =>
        values.dnsProvider !== 'noip' || !!value || 'required',
    },
  },

  // DNS AWS Route53
  dnsAwsId: {
    type: 'text',
    title: 'ID',
    category: 'DNS',
    description: <>AWS Route53 ID.</>,
    show: (values) => values.dnsProvider === 'route53',
    validation: {
      validate: (value, values) =>
        values.dnsProvider !== 'route53' || !!value || 'required',
    },
  },
  dnsAwsSecret: {
    type: 'password',
    title: 'Secret',
    category: 'DNS',
    description: <>AWS Route53 secret.</>,
    show: (values) => values.dnsProvider === 'route53',
    validation: {
      validate: (value, values) =>
        values.dnsProvider !== 'route53' || !!value || 'required',
    },
  },
  dnsAwsZoneId: {
    type: 'text',
    title: 'Zone ID',
    category: 'DNS',
    description: <>AWS Route53 zone ID.</>,
    show: (values) => values.dnsProvider === 'route53',
    validation: {
      validate: (value, values) =>
        values.dnsProvider !== 'route53' || !!value || 'required',
    },
  },

  // DNS Cloudflare
  dnsCloudflareToken: {
    type: 'text',
    title: 'Token',
    category: 'DNS',
    description: <>Cloudflare token.</>,
    show: (values) => values.dnsProvider === 'cloudflare',
    validation: {
      validate: (value, values) =>
        values.dnsProvider !== 'cloudflare' || !!value || 'required',
    },
  },
  dnsCloudflareZoneId: {
    type: 'text',
    title: 'Zone ID',
    category: 'DNS',
    description: <>Cloudflare zone ID.</>,
    show: (values) => values.dnsProvider === 'cloudflare',
    validation: {
      validate: (value, values) =>
        values.dnsProvider !== 'cloudflare' || !!value || 'required',
    },
  },
}
