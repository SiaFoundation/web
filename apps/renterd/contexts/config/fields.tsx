/* eslint-disable react/no-unescaped-entities */
import {
  Code,
  ConfigFields,
  Maybe,
  toFixedMaxString,
} from '@siafoundation/design-system'
import { hoursInDays, secondsInMinutes } from '@siafoundation/units'
import BigNumber from 'bignumber.js'
import React from 'react'
import {
  Categories,
  ConfigViewMode,
  RecommendationItem,
  InputValues,
  AdvancedDefaults,
} from './types'
import { currencyOptions } from '@siafoundation/react-core'
import {
  MaxStoragePriceTips,
  MaxStoragePricePinnedTips,
} from './fieldTips/MaxStoragePrice'
import {
  MaxUploadPriceTips,
  MaxUploadPricePinnedTips,
} from './fieldTips/MaxUploadPrice'
import {
  MaxDownloadPriceTips,
  MaxDownloadPricePinnedTips,
} from './fieldTips/MaxDownloadPrice'
import { MaxRPCPriceTips } from './fieldTips/MaxRPCPrice'
import { MaxContractPriceTips } from './fieldTips/MaxContractPrice'

export const scDecimalPlaces = 6

type GetFields = {
  advancedDefaults?: AdvancedDefaults
  isAutopilotEnabled: boolean
  configViewMode: ConfigViewMode
  recommendations: Partial<Record<keyof InputValues, RecommendationItem>>
  validationContext: {
    isAutopilotEnabled: boolean
    configViewMode: ConfigViewMode
  }
}

export type Fields = ReturnType<typeof getFields>

export function getFields({
  advancedDefaults,
  recommendations,
  isAutopilotEnabled,
  configViewMode,
  validationContext,
}: GetFields): ConfigFields<InputValues, Categories> {
  return {
    // storage
    storageTB: {
      type: 'number',
      category: 'storage',
      title: 'Expected storage',
      description: <>The amount of storage you would like to rent in TB.</>,
      units: 'TB',
      hidden: !isAutopilotEnabled,
      validation: {
        validate: {
          required: requiredIfAutopilot(validationContext),
        },
      },
    },
    uploadTBMonth: {
      type: 'number',
      category: 'storage',
      title: 'Expected upload',
      description: (
        <>The amount of upload bandwidth you plan to use each month in TB.</>
      ),
      units: 'TB/month',
      hidden: !isAutopilotEnabled,
      validation: {
        validate: {
          required: requiredIfAutopilot(validationContext),
        },
      },
    },
    downloadTBMonth: {
      type: 'number',
      category: 'storage',
      title: 'Expected download',
      description: (
        <>The amount of download bandwidth you plan to use each month in TB.</>
      ),
      units: 'TB/month',
      hidden: !isAutopilotEnabled,
      validation: {
        validate: {
          required: requiredIfAutopilot(validationContext),
        },
      },
    },
    periodWeeks: {
      type: 'number',
      category: 'storage',
      title: 'Period',
      description: <>The length of the storage contracts.</>,
      units: 'weeks',
      suggestion: advancedDefaults?.periodWeeks,
      suggestionTip: `Typically ${advancedDefaults?.periodWeeks} weeks.`,
      hidden: !isAutopilotEnabled || configViewMode === 'basic',
      validation: {
        validate: {
          required: requiredIfAutopilotAndAdvanced(validationContext),
        },
      },
    },
    renewWindowWeeks: {
      type: 'number',
      category: 'storage',
      title: 'Renew window',
      description: (
        <>
          The number of weeks prior to contract expiration that Sia will attempt
          to renew your contracts.
        </>
      ),
      units: 'weeks',
      decimalsLimit: 6,
      suggestion: advancedDefaults?.renewWindowWeeks,
      suggestionTip: `Typically ${advancedDefaults?.renewWindowWeeks} weeks.`,
      hidden: !isAutopilotEnabled || configViewMode === 'basic',
      validation: {
        validate: {
          required: requiredIfAutopilotAndAdvanced(validationContext),
        },
      },
    },
    amountHosts: {
      type: 'number',
      category: 'storage',
      title: 'Hosts',
      description: <>The number of hosts to create contracts with.</>,
      units: 'hosts',
      decimalsLimit: 0,
      suggestion: advancedDefaults?.amountHosts,
      suggestionTip: `Typically ${advancedDefaults?.amountHosts} hosts.`,
      hidden: !isAutopilotEnabled || configViewMode === 'basic',
      validation: {
        validate: {
          required: requiredIfAutopilotAndAdvanced(validationContext),
        },
      },
    },
    prune: {
      type: 'boolean',
      category: 'storage',
      title: 'Prune sector roots',
      description: (
        <>
          When enabled, autopilot will try to prune deleted sector roots from
          contracts one contract at a time, for a max duration of 10 minutes per
          contract. For old hosts this process takes quite a while, while for
          new hosts it is fast. For new hosts pruning effectively deletes data
          from the contract, allowing the renter to stop paying for storage they
          are not using.
        </>
      ),
      suggestion: advancedDefaults?.prune,
      suggestionTip: (
        <>
          The default value is <Code>{advancedDefaults?.prune}</Code>.
        </>
      ),
      hidden: !isAutopilotEnabled || configViewMode === 'basic',
      validation: {},
    },

    // hosts
    allowRedundantIPs: {
      type: 'boolean',
      category: 'hosts',
      title: 'Redundant IPs',
      description: (
        <>
          Whether or not to allow forming contracts with multiple hosts in the
          same IP subnet. The subnets used are /16 for IPv4, and /64 for IPv6.
        </>
      ),
      suggestion: advancedDefaults?.allowRedundantIPs,
      suggestionTip: `Defaults to ${
        advancedDefaults?.allowRedundantIPs ? 'on' : 'off'
      }.`,
      hidden: !isAutopilotEnabled || configViewMode === 'basic',
      validation: {},
    },
    maxDowntimeHours: {
      type: 'number',
      category: 'hosts',
      title: 'Max downtime',
      description: (
        <>
          The maximum amount of host downtime that autopilot will tolerate in
          hours.
        </>
      ),
      units: 'hours',
      suggestion: advancedDefaults?.maxDowntimeHours,
      suggestionTip: advancedDefaults?.maxDowntimeHours
        ? `Defaults to ${advancedDefaults?.maxDowntimeHours
            .toNumber()
            .toLocaleString()} which is ${toFixedMaxString(
            new BigNumber(
              hoursInDays(advancedDefaults?.maxDowntimeHours.toNumber())
            ),
            1
          )} days.`
        : undefined,
      hidden: !isAutopilotEnabled || configViewMode === 'basic',
      validation: {
        validate: {
          required: requiredIfAutopilotAndAdvanced(validationContext),
        },
      },
    },
    maxConsecutiveScanFailures: {
      type: 'number',
      category: 'hosts',
      title: 'Max consecutive scan failures',
      description: (
        <>
          The maximum number of consecutive scan failures that autopilot will
          tolerate.
        </>
      ),
      units: 'scans',
      decimalsLimit: 0,
      suggestion: advancedDefaults?.maxConsecutiveScanFailures,
      suggestionTip: advancedDefaults?.maxConsecutiveScanFailures
        ? `Defaults to ${advancedDefaults?.maxConsecutiveScanFailures.toNumber()}.`
        : undefined,
      hidden: !isAutopilotEnabled || configViewMode === 'basic',
      validation: {
        validate: {
          required: requiredIfAutopilotAndAdvanced(validationContext),
        },
      },
    },
    minProtocolVersion: {
      type: 'text',
      category: 'hosts',
      title: 'Min protocol version',
      description: (
        <>
          The minimum protocol version that autopilot will consider when forming
          contracts with hosts.
        </>
      ),
      suggestion: advancedDefaults?.minProtocolVersion,
      suggestionTip: `Defaults to ${advancedDefaults?.minProtocolVersion}.`,
      hidden: !isAutopilotEnabled || configViewMode === 'basic',
      validation: {
        validate: {
          required: requiredIfAutopilotAndAdvanced(validationContext),
          version: requiredIfAutopilotAndAdvanced(
            validationContext,
            (value: Maybe<string>) => {
              const regex = /^\d+\.\d+\.\d+$/
              return regex.test(value || '') || 'must be a valid version number'
            }
          ),
        },
      },
    },

    uploadPackingEnabled: {
      category: 'uploadpacking',
      type: 'boolean',
      title: 'Upload packing',
      description: (
        <>
          Data on the Sia network is stored in 4MiB sectors. With the default 10
          of 30 redundancy scheme, uploaded files are split into 40MiB chunks
          and encoded into 120MiB slabs. This means that storage is wasted on
          padding and files smaller than 40MiB still use 120MiB of space. The
          redundancy scheme can be configured, but unless all files are exactly
          4MiB * the redundancy's minimum shards, there will always be wasted
          storage. Upload packing avoids this waste by buffering files and
          packing them together before they are uploaded to the network. This
          trades some performance for storage efficiency. It is also important
          to note that because buffered files are temporarily stored on disk
          they must be considered when backing up your renterd data.
        </>
      ),
      hidden: configViewMode === 'basic',
      validation: {},
    },

    // gouging
    shouldPinMaxStoragePrice: {
      title: '',
      description: '',
      type: 'boolean',
      category: 'gouging',
      validation: {},
    },
    maxStoragePriceTBMonth: {
      category: 'gouging',
      type: 'siacoin',
      title: 'Max storage price',
      description: (
        <>
          The max allowed price a host is allowed to charge to store 1 TB worth
          of data per month. Choose whether to set the price in siacoin per TB
          per month or to pin the siacoin price to a fixed fiat value per TB per
          month.
        </>
      ),
      units: 'SC/TB/month',
      decimalsLimitSc: scDecimalPlaces,
      validation: {
        required: 'required',
      },
      after: ({ form, fields }) => (
        <MaxStoragePriceTips
          form={form}
          fields={fields}
          recommendations={recommendations}
        />
      ),
    },
    maxStoragePriceTBMonthPinned: {
      title: '',
      description: '',
      units: '/TB/month',
      type: 'fiat',
      category: 'gouging',
      validation: {
        validate: {
          required: requiredIfPinningEnabled(
            'shouldPinMaxStoragePrice',
            (value: Maybe<BigNumber>, values) => {
              if (!values.shouldPinMaxStoragePrice) {
                return true
              }
              return !!value || 'required'
            }
          ),
          currency: requiredIfPinningEnabled(
            'shouldPinMaxStoragePrice',
            (_, values) =>
              !!values.pinnedCurrency || 'must select a pinned currency'
          ),
          range: requiredIfPinningEnabled(
            'shouldPinMaxStoragePrice',
            (value: Maybe<BigNumber>, values) =>
              !values.shouldPinMaxStoragePrice ||
              value?.gt(0) ||
              'must be greater than 0'
          ),
        },
      },
      after: ({ form, fields }) => (
        <MaxStoragePricePinnedTips
          form={form}
          fields={fields}
          recommendations={recommendations}
        />
      ),
    },
    shouldPinMaxUploadPrice: {
      title: '',
      description: '',
      type: 'boolean',
      category: 'gouging',
      validation: {},
    },
    maxUploadPriceTB: {
      category: 'gouging',
      type: 'siacoin',
      title: 'Max upload price',
      description: (
        <>
          The max allowed price a host is allowed to charge for uploading 1 TB
          worth of data. Choose whether to set the price in siacoin per TB or to
          pin the siacoin price to a fixed fiat value per TB.
        </>
      ),
      units: 'SC/TB',
      decimalsLimitSc: scDecimalPlaces,
      validation: {
        required: 'required',
      },
      after: ({ form, fields }) => (
        <MaxUploadPriceTips
          form={form}
          fields={fields}
          recommendations={recommendations}
        />
      ),
    },
    maxUploadPriceTBPinned: {
      title: '',
      description: '',
      units: '/TB',
      type: 'fiat',
      category: 'gouging',
      validation: {
        validate: {
          required: requiredIfPinningEnabled(
            'shouldPinMaxUploadPrice',
            (value: Maybe<BigNumber>, values) => {
              if (!values.shouldPinMaxUploadPrice) {
                return true
              }
              return !!value || 'required'
            }
          ),
          currency: requiredIfPinningEnabled(
            'shouldPinMaxUploadPrice',
            (_, values) =>
              !!values.pinnedCurrency || 'must select a pinned currency'
          ),
          range: requiredIfPinningEnabled(
            'shouldPinMaxUploadPrice',
            (value: Maybe<BigNumber>, values) =>
              !values.shouldPinMaxUploadPrice ||
              value?.gt(0) ||
              'must be greater than 0'
          ),
        },
      },
      after: ({ form, fields }) => (
        <MaxUploadPricePinnedTips
          form={form}
          fields={fields}
          recommendations={recommendations}
        />
      ),
    },
    shouldPinMaxDownloadPrice: {
      title: '',
      description: '',
      type: 'boolean',
      category: 'gouging',
      validation: {},
    },
    maxDownloadPriceTB: {
      category: 'gouging',
      type: 'siacoin',
      title: 'Max download price',
      description: (
        <>
          The max allowed price to download 1 TB. Choose whether to set the
          price in siacoin per TB or to pin the siacoin price to a fixed fiat
          value per TB.
        </>
      ),
      units: 'SC/TB',
      decimalsLimitSc: scDecimalPlaces,
      validation: {
        required: 'required',
      },
      after: ({ form, fields }) => (
        <MaxDownloadPriceTips
          form={form}
          fields={fields}
          recommendations={recommendations}
        />
      ),
    },
    maxDownloadPriceTBPinned: {
      title: '',
      description: '',
      units: '/TB',
      type: 'fiat',
      category: 'gouging',
      validation: {
        validate: {
          required: requiredIfPinningEnabled(
            'shouldPinMaxDownloadPrice',
            (value: Maybe<BigNumber>, values) => {
              if (!values.shouldPinMaxDownloadPrice) {
                return true
              }
              return !!value || 'required'
            }
          ),
          currency: requiredIfPinningEnabled(
            'shouldPinMaxDownloadPrice',
            (_, values) =>
              !!values.pinnedCurrency || 'must select a pinned currency'
          ),
          range: requiredIfPinningEnabled(
            'shouldPinMaxDownloadPrice',
            (value: Maybe<BigNumber>, values) =>
              !values.shouldPinMaxDownloadPrice ||
              value?.gt(0) ||
              'must be greater than 0'
          ),
        },
      },
      after: ({ form, fields }) => (
        <MaxDownloadPricePinnedTips
          form={form}
          fields={fields}
          recommendations={recommendations}
        />
      ),
    },
    maxContractPrice: {
      category: 'gouging',
      type: 'siacoin',
      title: 'Max contract price',
      description: <>The max allowed price to form a contract.</>,
      suggestion: new BigNumber(1),
      suggestionTip: 'The suggested value is 1 SC.',
      decimalsLimitSc: scDecimalPlaces,
      tipsDecimalsLimitSc: 0,
      hidden: configViewMode === 'basic',
      validation: {
        validate: {
          required: requiredIfAdvanced(validationContext),
        },
      },
      after: ({ form, fields }) => (
        <MaxContractPriceTips
          form={form}
          fields={fields}
          recommendations={recommendations}
        />
      ),
    },
    maxRPCPriceMillion: {
      category: 'gouging',
      type: 'siacoin',
      title: 'Max RPC price',
      description: (
        <>The max allowed base price for RPCs in siacoins per million calls.</>
      ),
      units: 'SC/million',
      decimalsLimitSc: scDecimalPlaces,
      suggestion: new BigNumber(10),
      suggestionTip: 'The suggested value is 10 SC.',
      tipsDecimalsLimitSc: 0,
      hidden: configViewMode === 'basic',
      validation: {
        validate: {
          required: requiredIfAdvanced(validationContext),
        },
      },
      after: ({ form, fields }) => (
        <MaxRPCPriceTips
          form={form}
          fields={fields}
          recommendations={recommendations}
        />
      ),
    },
    hostBlockHeightLeeway: {
      category: 'gouging',
      type: 'number',
      title: 'Block height leeway',
      description: (
        <>
          The amount of blocks of leeway given to the host block height in the
          host's price table.
        </>
      ),
      units: 'blocks',
      decimalsLimit: 0,
      ...(recommendations.hostBlockHeightLeeway
        ? {
            suggestionLabel: 'Match with more hosts',
            suggestion: recommendations.hostBlockHeightLeeway?.targetValue,
            suggestionTip: 'This value will help you match with more hosts.',
          }
        : {
            suggestion: advancedDefaults?.hostBlockHeightLeeway,
            suggestionTip: `The recommended value is ${advancedDefaults?.hostBlockHeightLeeway
              .toNumber()
              .toLocaleString()} blocks.`,
          }),
      hidden: configViewMode === 'basic',
      validation: {
        validate: {
          required: requiredIfAdvanced(validationContext),
          min: requiredIfAdvanced(
            validationContext,
            (value: Maybe<BigNumber>) => {
              return (
                new BigNumber(value || 0).gte(3) || 'must be at least 3 blocks'
              )
            }
          ),
        },
      },
    },
    minPriceTableValidityMinutes: {
      category: 'gouging',
      type: 'number',
      title: 'Min price table validity',
      units: 'minutes',
      description: (
        <>The min accepted value for `Validity` in the host's price settings.</>
      ),
      hidden: configViewMode === 'basic',
      suggestionLabel: 'Match with more hosts',
      suggestion: recommendations.minPriceTableValidityMinutes?.targetValue,
      suggestionTip: 'This value will help you match with more hosts.',
      validation: {
        validate: {
          required: requiredIfAdvanced(validationContext),
          min: requiredIfAdvanced(
            validationContext,
            (value: Maybe<BigNumber>) => {
              return (
                new BigNumber(value || 0).gte(secondsInMinutes(10)) ||
                'must be at least 10 seconds'
              )
            }
          ),
        },
      },
    },
    minAccountExpiryDays: {
      category: 'gouging',
      type: 'number',
      title: 'Min account expiry',
      units: 'days',
      description: (
        <>
          The min accepted value for `AccountExpiry` in the host's price
          settings.
        </>
      ),
      hidden: configViewMode === 'basic',
      suggestionLabel: 'Match with more hosts',
      suggestion: recommendations.minAccountExpiryDays?.targetValue,
      suggestionTip: 'This value will help you match with more hosts.',
      validation: {
        validate: {
          required: requiredIfAdvanced(validationContext),
          min: requiredIfAdvanced(
            validationContext,
            (value: Maybe<BigNumber>) => {
              return (
                new BigNumber(value || 0).gte(hoursInDays(1)) ||
                'must be at least 1 hour'
              )
            }
          ),
        },
      },
    },
    minMaxEphemeralAccountBalance: {
      category: 'gouging',
      type: 'siacoin',
      title: 'Min max ephemeral account balance',
      description: (
        <>
          The min accepted value for `MaxEphemeralAccountBalance` in the host's
          price settings.
        </>
      ),
      decimalsLimitSc: scDecimalPlaces,
      hidden: configViewMode === 'basic',
      suggestionLabel: 'Match with more hosts',
      suggestion: recommendations.minMaxEphemeralAccountBalance?.targetValue,
      suggestionTip: 'This value will help you match with more hosts.',
      validation: {
        validate: {
          required: requiredIfAdvanced(validationContext),
          min: requiredIfAdvanced(
            validationContext,
            (value: Maybe<BigNumber>) => {
              return new BigNumber(value || 0).gte(1) || 'must be at least 1 SC'
            }
          ),
        },
      },
    },
    migrationSurchargeMultiplier: {
      category: 'gouging',
      type: 'number',
      title: 'Migration surcharge multiplier',
      units: '* download price',
      placeholder: '10',
      decimalsLimit: 1,
      description: (
        <>
          Factor that gets applied on the max download price when trying to
          download migration-critical sectors from a host that is price gouging.
          For example, when migrating a low-health file, if the download is
          failing but would potentially succeed with looser gouging settings, we
          apply the migration surcharge multiplier to overpay on every sector
          download if it means saving the file/migration.
        </>
      ),
      ...(recommendations.migrationSurchargeMultiplier
        ? {
            suggestionLabel: 'Match with more hosts',
            suggestion:
              recommendations.migrationSurchargeMultiplier?.targetValue,
            suggestionTip: 'This value will help you match with more hosts.',
          }
        : {
            suggestion: new BigNumber(10),
            suggestionTip: 'The default multiplier is 10x the download price.',
          }),
      hidden: configViewMode === 'basic',
      validation: {
        validate: {
          required: requiredIfAdvanced(validationContext),
        },
      },
    },

    // Redundancy
    minShards: {
      type: 'number',
      category: 'redundancy',
      title: 'Min shards',
      description: <>The min amount of shards needed to reconstruct a slab.</>,
      suggestion: advancedDefaults?.minShards,
      suggestionTip: `Typically ${advancedDefaults?.minShards} shards.`,
      units: 'shards',
      hidden: configViewMode === 'basic',
      validation: {
        validate: {
          required: requiredIfAdvanced(validationContext),
          min: requiredIfAdvanced(
            validationContext,
            (value: Maybe<BigNumber>) => {
              return new BigNumber(value || 0).gt(0) || 'must be greater than 0'
            }
          ),
        },
      },
      trigger: ['totalShards'],
    },
    totalShards: {
      type: 'number',
      category: 'redundancy',
      title: 'Total shards',
      description: <>The total amount of shards for each slab.</>,
      suggestion: advancedDefaults?.totalShards,
      suggestionTip: `Typically ${advancedDefaults?.totalShards} shards.`,
      units: 'shards',
      hidden: configViewMode === 'basic',
      validation: {
        validate: {
          required: requiredIfAdvanced(validationContext),
          gteMinShards: requiredIfAdvanced(
            validationContext,
            (value: Maybe<BigNumber>, values) =>
              new BigNumber(value || 0).gte(values.minShards || 0) ||
              'must be at least equal to min shards'
          ),
          max: requiredIfAdvanced(
            validationContext,
            (value: Maybe<BigNumber>) =>
              new BigNumber(value || 0).lt(256) || 'must be less than 256'
          ),
        },
      },
    },

    // pinning
    pinnedCurrency: {
      category: 'pinning',
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
      validation: {
        required: 'required',
      },
    },
    pinnedThreshold: {
      category: 'pinning',
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
      validation: {
        required: 'required',
        validate: {
          max: (value: Maybe<BigNumber>) =>
            new BigNumber(value || 0).lte(100) || `must be at most 100%`,
          min: (value: Maybe<BigNumber>) =>
            new BigNumber(value || 0).gte(0) || `must be at least 0%`,
        },
      },
    },
  }
}

// The following validation helper methods treat the value as any so that the type can
// be specified by the caller.
// Theoretically this could be inferred by ConfigFields but I could not figure it out.

function requiredIfAdvanced(
  context: { configViewMode: ConfigViewMode },
  method?: (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    value: any,
    values: InputValues
  ) => string | boolean
) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (value: any, values: InputValues) => {
    if (context.configViewMode === 'advanced') {
      if (method) {
        return method(value, values)
      }
      return !!value || 'required'
    }
    return true
  }
}

function requiredIfAutopilot(
  context: { isAutopilotEnabled: boolean },
  method?: (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    value: any,
    values: InputValues
  ) => string | boolean
) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (value: any, values: InputValues) => {
    if (context.isAutopilotEnabled) {
      if (method) {
        return method(value, values)
      }
      return !!value || 'required'
    }
    return true
  }
}

function requiredIfAutopilotAndAdvanced(
  context: {
    isAutopilotEnabled: boolean
    configViewMode: ConfigViewMode
  },
  method?: (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    value: any,
    values: InputValues
  ) => string | boolean
) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (value: any, values: InputValues) => {
    if (context.isAutopilotEnabled && context.configViewMode === 'advanced') {
      if (method) {
        return method(value, values)
      }
      return !!value || 'required'
    }
    return true
  }
}

type ShouldPinField =
  | 'shouldPinMaxStoragePrice'
  | 'shouldPinMaxUploadPrice'
  | 'shouldPinMaxDownloadPrice'

function requiredIfPinningEnabled(
  field: ShouldPinField,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  method?: (value: any, values: InputValues) => string | boolean
) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (value: any, values: InputValues) => {
    if (values[field]) {
      if (method) {
        return method(value, values)
      }
      return !!value || 'required'
    }
    return true
  }
}
