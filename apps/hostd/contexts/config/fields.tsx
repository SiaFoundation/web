import { blocksToMonths, ConfigFields } from '@siafoundation/design-system'
import BigNumber from 'bignumber.js'
import { dnsProviderOptions, initialValues, scDecimalPlaces } from './types'
import { SiaCentralExchangeRates } from '@siafoundation/sia-central'
import { calculateMaxCollateral } from './transform'

type Categories = 'host' | 'pricing' | 'DNS' | 'bandwidth' | 'registry' | 'RHP3'

type GetFields = {
  showAdvanced: boolean
  storageTBMonth?: BigNumber
  collateralMultiplier?: BigNumber
  rates?: SiaCentralExchangeRates
}

export function getFields({
  showAdvanced,
  storageTBMonth,
  collateralMultiplier,
  rates,
}: GetFields): ConfigFields<typeof initialValues, Categories> {
  return {
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
      description: (
        <>The maximum contract duration that the host will accept.</>
      ),
      hidden: !showAdvanced,
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
      suggestion: rates ? usdInScRoundedToNearestTen(1, rates) : undefined,
      suggestionTip:
        'The suggested storage price in siacoins per TB per month.',
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
      suggestion: rates ? usdInScRoundedToNearestTen(10, rates) : undefined,
      suggestionTip:
        'The suggested egress price in siacoins for egress per TB.',
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
      suggestion: rates ? usdInScRoundedToNearestTen(0.05, rates) : undefined,
      suggestionTip: 'The suggested ingress price in siacoins per TB.',
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
      suggestion:
        storageTBMonth && collateralMultiplier
          ? calculateMaxCollateral(storageTBMonth, collateralMultiplier)
          : undefined,
      suggestionTip: 'The suggested maximum collateral.',
      description: <>{`The host's maximum collateral in siacoins.`}</>,
      hidden: !showAdvanced,
      validation: {
        required: 'required',
      },
    },
    contractPrice: {
      title: 'Contract price',
      type: 'siacoin',
      category: 'pricing',
      decimalsLimitSc: scDecimalPlaces,
      suggestionTip: 'The suggested contract price.',
      tipsDecimalsLimitSc: 1,
      suggestion: new BigNumber(0.2),
      description: <>{`The host's contract price in siacoins.`}</>,
      hidden: !showAdvanced,
      validation: {
        required: 'required',
      },
    },
    baseRPCPrice: {
      title: 'Base RPC price',
      type: 'siacoin',
      category: 'pricing',
      units: 'SC/million',
      suggestion: new BigNumber(1),
      suggestionTip:
        'The suggested base RPC price in siacoins per million calls.',
      decimalsLimitSc: scDecimalPlaces,
      description: (
        <>{`The host's base RPC price in siacoins per million calls.`}</>
      ),
      hidden: !showAdvanced,
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
      suggestion: new BigNumber(1),
      suggestionTip:
        'The suggested sector access price in siacoins per million sectors.',
      description: (
        <>{`The host's sector access price in siacoins per million sectors.`}</>
      ),
      hidden: !showAdvanced,
      validation: {
        required: 'required',
      },
    },
    priceTableValidity: {
      title: 'Price table validity',
      type: 'number',
      category: 'pricing',
      units: 'minutes',
      suggestion: new BigNumber(30),
      suggestionTip: 'The suggested price table validity.',
      description: (
        <>{`How long a renter's registered price table remains valid.`}</>
      ),
      hidden: !showAdvanced,
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
      suggestion: new BigNumber(1_000),
      suggestionTip: 'The suggested maximum registry size.',
      decimalsLimit: 0,
      description: (
        <>{`The maximum number of registry entries that the host will store. Each registry entry is up to 113 bytes.`}</>
      ),
      hidden: !showAdvanced,
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
      suggestion: new BigNumber(30),
      suggestionTip: 'The suggested account expiry.',
      description: (
        <>{`How long a renter's ephemeral accounts are inactive before the host prunes them and recovers the remaining funds.`}</>
      ),
      hidden: !showAdvanced,
      validation: {
        required: 'required',
        validate: {
          min: (value) =>
            new BigNumber(value as BigNumber).gte(7) ||
            `must be at least 1 week`,
        },
      },
    },
    maxAccountBalance: {
      title: 'Maximum balance',
      type: 'siacoin',
      category: 'RHP3',
      suggestion: new BigNumber(10),
      suggestionTip: 'The suggested maximum account balance.',
      description: (
        <>{`Maximum balance a renter's ephemeral account can have. When the limit is reached, deposits are rejected until some of the funds have been spent.`}</>
      ),
      hidden: !showAdvanced,
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
}

function usdInScRoundedToNearestTen(
  usdAmount: number,
  rates: SiaCentralExchangeRates
) {
  return rates
    ? new BigNumber(
        new BigNumber(usdAmount).div(rates.sc.usd).div(10).toFixed(0)
      ).times(10)
    : undefined
}
