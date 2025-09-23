/* eslint-disable react/no-unescaped-entities */
import { blocksToMonths } from '@siafoundation/units'
import { ConfigFields } from '@siafoundation/design-system'
import BigNumber from 'bignumber.js'
import {
  ConfigViewMode,
  SettingsData,
  dnsProviderOptions,
  scDecimalPlaces,
} from './types'
import { calculateMaxCollateral } from './transform'
import { currencyOptions } from '@siafoundation/react-core'
import { Maybe } from '@siafoundation/types'

type Categories = 'host' | 'pricing' | 'DNS' | 'bandwidth' | 'RHP3'

type GetFields = {
  pinningEnabled: boolean
  configViewMode: ConfigViewMode
  storageTBMonth?: BigNumber
  collateralMultiplier?: BigNumber
  exchangeRateUSD?: BigNumber
  validationContext: {
    pinningEnabled: boolean
  }
}

export function getFields({
  pinningEnabled,
  configViewMode,
  storageTBMonth,
  collateralMultiplier,
  exchangeRateUSD,
  validationContext,
}: GetFields): ConfigFields<SettingsData, Categories> {
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
      placeholder: 'my.host.com',
      validation: {
        required: 'required',
        validate: {
          noProtocol: (value: Maybe<string>) =>
            !/^https?:\/\//.test(value || '') ||
            'must not start with http:// or https://',
          noPort: (value: Maybe<string>) =>
            !/:\d+$/.test(value || '') || 'must not include port',
        },
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
      hidden: configViewMode === 'basic',
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
    pinnedCurrency: {
      title: 'Pinned currency',
      description: 'Currency to use for fields where price pinning is enabled.',
      type: 'select',
      options: [
        ...currencyOptions.map(({ id, label }) => ({
          label,
          value: id,
        })),
        { label: 'none', value: '' },
      ] as {
        label: string
        value: string
      }[],
      hidden: !pinningEnabled,
      validation: {},
    },
    pinnedThreshold: {
      title: 'Pinned currency change threshold',
      type: 'number',
      suggestionTip: 'A threshold of 2% is recommended.',
      suggestion: new BigNumber(2),
      units: '%',
      decimalsLimit: 0,
      description: (
        <>
          Percentage that controls the minimum change in exchange rate that will
          trigger an update to pinned prices. This prevents the host from
          changing prices too often.
        </>
      ),
      hidden: !pinningEnabled || configViewMode === 'basic',
      validation: {
        validate: {
          required: requiredIfPinningEnabled(validationContext),
          max: requiredIfPinningEnabled(
            validationContext,
            (value) =>
              new BigNumber(value as BigNumber).lte(100) ||
              `must be at most 100%`,
          ),
          min: requiredIfPinningEnabled(
            validationContext,
            (value) =>
              new BigNumber(value as BigNumber).gte(0) || `must be at least 0%`,
          ),
        },
      },
    },

    shouldPinStoragePrice: {
      title: 'Pin storage price',
      description: '',
      type: 'boolean',
      category: 'pricing',
      hidden: !pinningEnabled,
      validation: {},
    },
    storagePrice: {
      title: 'Storage price',
      description: (
        <>
          The host's storage price per TB per month. Choose whether to set your
          storage price in siacoin per TB per month or to pin the siacoin price
          to a fixed fiat value per TB per month.
        </>
      ),
      type: 'siacoin',
      category: 'pricing',
      units: 'SC/TB/month',
      decimalsLimitSc: scDecimalPlaces,
      suggestion: exchangeRateUSD
        ? usdInScRoundedToNearestTen(1, exchangeRateUSD)
        : undefined,
      suggestionTip:
        'The suggested storage price in siacoins per TB per month.',
      validation: {
        required: 'required',
      },
    },
    storagePricePinned: {
      title: 'Pinned storage price',
      description: '',
      units: '/TB/month',
      type: 'fiat',
      category: 'pricing',
      hidden: !pinningEnabled,
      validation: {
        validate: {
          required: requiredIfPinningEnabled(validationContext),
          currency: requiredIfPinningEnabled(
            validationContext,
            (_, values) =>
              !!values.pinnedCurrency || 'must select a pinned currency',
          ),
          range: requiredIfPinningEnabled(
            validationContext,
            (value: BigNumber, values) =>
              !values.shouldPinStoragePrice ||
              value?.gte(0) ||
              'storage price must not be negative',
          ),
        },
      },
    },

    shouldPinEgressPrice: {
      title: 'Pin egress price',
      description: '',
      type: 'boolean',
      category: 'pricing',
      hidden: !pinningEnabled,
      validation: {},
    },
    egressPrice: {
      title: 'Egress price',
      description: (
        <>
          The host's egress price per TB per month. Egress means bandwidth usage
          by outgoing download traffic. Choose whether to set your egress price
          in siacoin per TB or to pin the siacoin price to a fixed fiat value
          per TB.
        </>
      ),
      type: 'siacoin',
      category: 'pricing',
      units: 'SC/TB',
      decimalsLimitSc: scDecimalPlaces,
      suggestion: exchangeRateUSD
        ? usdInScRoundedToNearestTen(10, exchangeRateUSD)
        : undefined,
      suggestionTip:
        'The suggested egress price in siacoins for egress per TB.',
      validation: {
        required: 'required',
      },
    },
    egressPricePinned: {
      title: 'Pinned egress price',
      description: '',
      type: 'fiat',
      units: '/TB',
      category: 'pricing',
      hidden: !pinningEnabled,
      validation: {
        validate: {
          required: requiredIfPinningEnabled(validationContext),
          currency: requiredIfPinningEnabled(
            validationContext,
            (_, values) =>
              !!values.pinnedCurrency || 'must select a pinned currency',
          ),
          range: requiredIfPinningEnabled(
            validationContext,
            (value: BigNumber, values) =>
              !values.shouldPinEgressPrice ||
              value?.gte(0) ||
              'egress price must not be negative',
          ),
        },
      },
    },

    shouldPinIngressPrice: {
      title: 'Pin ingress price',
      description: '',
      type: 'boolean',
      category: 'pricing',
      hidden: !pinningEnabled,
      validation: {},
    },
    ingressPrice: {
      title: 'Ingress price',
      description: (
        <>
          The host's ingress price per TB per month. Ingress means bandwidth
          usage by incoming upload traffic. Choose whether to set your ingress
          price in siacoin per TB or to pin the siacoin price to a fixed fiat
          value per TB.
        </>
      ),
      type: 'siacoin',
      category: 'pricing',
      units: 'SC/TB',
      suggestion: exchangeRateUSD
        ? usdInScRoundedToNearestTen(0.05, exchangeRateUSD)
        : undefined,
      suggestionTip: 'The suggested ingress price in siacoins per TB.',
      decimalsLimitSc: scDecimalPlaces,
      validation: {
        required: 'required',
      },
    },
    ingressPricePinned: {
      title: 'Pinned ingress price',
      description: '',
      type: 'fiat',
      units: '/TB',
      category: 'pricing',
      hidden: !pinningEnabled,
      validation: {
        validate: {
          required: requiredIfPinningEnabled(validationContext),
          currency: requiredIfPinningEnabled(
            validationContext,
            (_, values) =>
              !!values.pinnedCurrency || 'must select a pinned currency',
          ),
          range: requiredIfPinningEnabled(
            validationContext,
            (value: BigNumber, values) =>
              !values.shouldPinIngressPrice ||
              value?.gte(0) ||
              'ingress price must not be negative',
          ),
        },
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

    shouldPinMaxCollateral: {
      title: 'Pin max collateral',
      description: '',
      type: 'boolean',
      category: 'pricing',
      hidden: !pinningEnabled,
      validation: {},
    },
    maxCollateral: {
      title: 'Max collateral',
      description: (
        <>
          The host's maximum collateral. Choose whether to set your max
          collateral price in siacoin or to pin the max collateral to a fixed
          fiat value. The suggested value for max collateral is the configured
          storage price * collateral multiplier * 10.
        </>
      ),
      type: 'siacoin',
      category: 'pricing',
      decimalsLimitSc: scDecimalPlaces,
      suggestion:
        storageTBMonth && collateralMultiplier
          ? calculateMaxCollateral(storageTBMonth, collateralMultiplier, 10)
          : undefined,
      suggestionTip:
        'The suggested maximum collateral, which is the configured storage price * collateral multiplier * 10.',
      validation: {
        required: 'required',
      },
    },
    maxCollateralPinned: {
      title: 'Pinned max collateral',
      description: '',
      type: 'fiat',
      category: 'pricing',
      hidden: !pinningEnabled || configViewMode === 'basic',
      validation: {
        validate: {
          required: requiredIfPinningEnabled(validationContext),
          currency: requiredIfPinningEnabled(
            validationContext,
            (_, values) =>
              !!values.pinnedCurrency || 'must select a pinned currency',
          ),
          range: requiredIfPinningEnabled(
            validationContext,
            (value: BigNumber, values) =>
              !values.shouldPinMaxCollateral ||
              value?.gte(0) ||
              'max collateral must not be negative',
          ),
        },
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
      hidden: configViewMode === 'basic',
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
      hidden: configViewMode === 'basic',
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
      hidden: configViewMode === 'basic',
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
      hidden: configViewMode === 'basic',
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
      hidden: configViewMode === 'basic',
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
      hidden: configViewMode === 'basic',
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
  exchangeRateUSD?: BigNumber,
) {
  return exchangeRateUSD
    ? new BigNumber(
        new BigNumber(usdAmount).div(exchangeRateUSD).div(10).toFixed(0),
      ).times(10)
    : undefined
}

function requiredIfPinningEnabled<Values>(
  context: {
    pinningEnabled: boolean
  },
  method?: (value: unknown, values: Values) => string | boolean,
) {
  return (value: unknown, values: Values) => {
    if (context.pinningEnabled) {
      if (method) {
        return method(value, values)
      }
      return !!value || 'required'
    }
    return true
  }
}
