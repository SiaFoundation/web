/* eslint-disable react/no-unescaped-entities */
import {
  Code,
  ConfigFields,
  Link,
  Text,
  hoursInDays,
  secondsInMinutes,
  toFixedMaxString,
} from '@siafoundation/design-system'
import BigNumber from 'bignumber.js'
import React from 'react'
import {
  Categories,
  ConfigViewMode,
  RecommendationItem,
  SettingsData,
} from './types'
import { currencyOptions } from '@siafoundation/react-core'
import { AllowanceTips } from './fieldTips/Allowance'
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
import { MaxRPCPricePinnedTips, MaxRPCPriceTips } from './fieldTips/MaxRPCPrice'

export const scDecimalPlaces = 6

type GetFields = {
  advancedDefaults?: SettingsData
  maxStoragePriceTBMonth: BigNumber
  maxUploadPriceTB: BigNumber
  minShards: BigNumber
  totalShards: BigNumber
  redundancyMultiplier: BigNumber
  averagesSc?: {
    storageAverage?: BigNumber
    uploadAverage?: BigNumber
    downloadAverage?: BigNumber
    contractAverage?: BigNumber
    rpcAverage?: BigNumber
  }
  averagesFiat?: {
    storageAverage?: BigNumber
    uploadAverage?: BigNumber
    downloadAverage?: BigNumber
    contractAverage?: BigNumber
    rpcAverage?: BigNumber
  }
  isAutopilotEnabled: boolean
  configViewMode: ConfigViewMode
  recommendations: Partial<Record<keyof SettingsData, RecommendationItem>>
  validationContext: {
    isAutopilotEnabled: boolean
    configViewMode: ConfigViewMode
    pinningEnabled: boolean
  }
}

export type Fields = ReturnType<typeof getFields>

export function getFields({
  advancedDefaults,
  averagesSc,
  averagesFiat,
  recommendations,
  isAutopilotEnabled,
  configViewMode,
  validationContext,
}: GetFields): ConfigFields<SettingsData, Categories> {
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
    shouldPinAllowance: {
      title: '',
      description: '',
      type: 'boolean',
      category: 'storage',
      validation: {},
    },
    allowanceMonth: {
      type: 'siacoin',
      category: 'storage',
      title: 'Allowance',
      description: (
        <>
          The amount you would like to spend per month. Choose whether to set
          your allowance in siacoin per month or to pin the siacoin price to a
          fixed fiat value per month.
        </>
      ),
      units: 'SC/month',
      decimalsLimitSc: scDecimalPlaces,
      hidden: !isAutopilotEnabled,
      validation: {
        validate: {
          required: requiredIfAutopilot(validationContext),
        },
      },
      after: AllowanceTips,
    },
    allowanceMonthPinned: {
      title: '',
      description: '',
      units: '/month',
      type: 'fiat',
      category: 'storage',
      validation: {
        validate: {
          required: requiredIfPinningEnabled(
            validationContext,
            (value: BigNumber, values) => {
              if (!values.shouldPinAllowance) {
                return true
              }
              return !!value || 'required'
            }
          ),
          currency: requiredIfPinningEnabled(
            validationContext,
            (_, values) =>
              !!values.pinnedCurrency || 'must select a pinned currency'
          ),
          range: requiredIfPinningEnabled(
            validationContext,
            (value: BigNumber, values) =>
              !values.shouldPinAllowance ||
              value?.gt(0) ||
              'must be greater than 0'
          ),
        },
      },
      after: AllowanceTips,
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
    autopilotContractSet: {
      type: 'text',
      category: 'storage',
      title: 'Contract set',
      description: (
        <>
          The contract set that autopilot should use. This should typically be
          the same as the default contract set.
        </>
      ),
      placeholder: advancedDefaults?.autopilotContractSet,
      suggestion: advancedDefaults?.autopilotContractSet,
      suggestionTip: (
        <>
          The default contract set is{' '}
          <Code>{advancedDefaults?.autopilotContractSet}</Code>.
        </>
      ),
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
      suggestionTip: `Defaults to ${advancedDefaults?.maxDowntimeHours
        .toNumber()
        .toLocaleString()} which is ${toFixedMaxString(
        new BigNumber(
          hoursInDays(advancedDefaults?.maxDowntimeHours.toNumber())
        ),
        1
      )} days.`,
      hidden: !isAutopilotEnabled || configViewMode === 'basic',
      validation: {
        validate: {
          required: requiredIfAutopilotAndAdvanced(validationContext),
        },
      },
    },
    minRecentScanFailures: {
      type: 'number',
      category: 'hosts',
      title: 'Min recent scan failures',
      description: (
        <>
          The minimum number of recent scan failures that autopilot will
          tolerate.
        </>
      ),
      units: 'scans',
      decimalsLimit: 0,
      suggestion: advancedDefaults?.minRecentScanFailures,
      suggestionTip: `Defaults to ${advancedDefaults?.minRecentScanFailures.toNumber()}.`,
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
            (value: string) => {
              const regex = /^\d+\.\d+\.\d+$/
              return regex.test(value) || 'must be a valid version number'
            }
          ),
        },
      },
    },

    // contract
    defaultContractSet: {
      category: 'contractset',
      type: 'text',
      title: 'Default contract set',
      placeholder: advancedDefaults?.defaultContractSet,
      suggestion: advancedDefaults?.defaultContractSet,
      suggestionTip: (
        <>
          Autopilot users will typically want to keep this the same as the
          autopilot contract set.
        </>
      ),
      description: (
        <>The default contract set is where data is uploaded to by default.</>
      ),
      hidden: configViewMode === 'basic',
      validation: {
        validate: {
          required: requiredIfAdvanced(validationContext),
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
      average: averagesSc?.storageAverage,
      averageTip: 'Averages provided by Sia Central.',
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
      average: averagesFiat?.storageAverage,
      averageTip: 'Averages provided by Sia Central.',
      validation: {
        validate: {
          required: requiredIfPinningEnabled(
            validationContext,
            (value: BigNumber, values) => {
              if (!values.shouldPinMaxStoragePrice) {
                return true
              }
              return !!value || 'required'
            }
          ),
          disabled: (value: BigNumber, values) => {
            if (!values.pinningEnabled && values.shouldPinMaxStoragePrice) {
              return 'please enable pinning and select a currency'
            }
          },
          currency: requiredIfPinningEnabled(
            validationContext,
            (_, values) =>
              !!values.pinnedCurrency || 'must select a pinned currency'
          ),
          range: requiredIfPinningEnabled(
            validationContext,
            (value: BigNumber, values) =>
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
      average: averagesSc?.uploadAverage,
      averageTip: 'Averages provided by Sia Central.',
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
      average: averagesFiat?.uploadAverage,
      averageTip: 'Averages provided by Sia Central.',
      category: 'gouging',
      validation: {
        validate: {
          required: requiredIfPinningEnabled(
            validationContext,
            (value: BigNumber, values) => {
              if (!values.shouldPinMaxUploadPrice) {
                return true
              }
              return !!value || 'required'
            }
          ),
          currency: requiredIfPinningEnabled(
            validationContext,
            (_, values) =>
              !!values.pinnedCurrency || 'must select a pinned currency'
          ),
          range: requiredIfPinningEnabled(
            validationContext,
            (value: BigNumber, values) =>
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
      average: averagesSc?.downloadAverage,
      averageTip: `Averages provided by Sia Central.`,
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
      average: averagesFiat?.downloadAverage,
      averageTip: `Averages provided by Sia Central.`,
      category: 'gouging',
      validation: {
        validate: {
          required: requiredIfPinningEnabled(
            validationContext,
            (value: BigNumber, values) => {
              if (!values.shouldPinMaxDownloadPrice) {
                return true
              }
              return !!value || 'required'
            }
          ),
          currency: requiredIfPinningEnabled(
            validationContext,
            (_, values) =>
              !!values.pinnedCurrency || 'must select a pinned currency'
          ),
          range: requiredIfPinningEnabled(
            validationContext,
            (value: BigNumber, values) =>
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
      average: averagesSc?.contractAverage,
      averageTip: `Averages provided by Sia Central.`,
      decimalsLimitSc: scDecimalPlaces,
      tipsDecimalsLimitSc: 3,
      hidden: configViewMode === 'basic',
      suggestionLabel: 'Match with more hosts',
      suggestion: recommendations.maxContractPrice?.targetValue,
      suggestionTip: 'This value will help you match with more hosts.',
      validation: {
        validate: {
          required: requiredIfAdvanced(validationContext),
        },
      },
    },
    shouldPinMaxRPCPrice: {
      title: '',
      description: '',
      type: 'boolean',
      category: 'gouging',
      validation: {},
    },
    maxRPCPriceMillion: {
      category: 'gouging',
      type: 'siacoin',
      title: 'Max RPC price',
      description: (
        <>
          The max allowed base price for RPCs in siacoins per million calls.
          Choose whether to set the price in siacoin per million calls or to pin
          the siacoin price to a fixed fiat value per million calls.
        </>
      ),
      units: 'SC/million',
      decimalsLimitSc: scDecimalPlaces,
      hidden: configViewMode === 'basic',
      average: averagesSc?.rpcAverage,
      averageTip: 'Averages provided by Sia Central.',
      suggestionTip: 'This value will help you match with more hosts.',
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
    maxRPCPriceMillionPinned: {
      title: '',
      description: '',
      units: '/million',
      type: 'fiat',
      category: 'gouging',
      average: averagesFiat?.rpcAverage,
      averageTip: 'Averages provided by Sia Central.',
      validation: {
        validate: {
          required: requiredIfPinningEnabled(
            validationContext,
            (value: BigNumber, values) => {
              if (!values.shouldPinMaxRPCPrice) {
                return true
              }
              return !!value || 'required'
            }
          ),
          currency: requiredIfPinningEnabled(
            validationContext,
            (_, values) =>
              !!values.pinnedCurrency || 'must select a pinned currency'
          ),
          range: requiredIfPinningEnabled(
            validationContext,
            (value: BigNumber, values) =>
              !values.shouldPinMaxRPCPrice ||
              value?.gt(0) ||
              'must be greater than 0'
          ),
        },
      },
      after: ({ form, fields }) => (
        <MaxRPCPricePinnedTips
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
            suggestionTip: 'The recommended value is 6 blocks.',
          }),
      hidden: configViewMode === 'basic',
      validation: {
        validate: {
          required: requiredIfAdvanced(validationContext),
          min: requiredIfAdvanced(validationContext, (value) => {
            return (
              new BigNumber(value as BigNumber).gte(3) ||
              'must be at least 3 blocks'
            )
          }),
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
          min: requiredIfAdvanced(validationContext, (value) => {
            return (
              new BigNumber(value as BigNumber).gte(secondsInMinutes(10)) ||
              'must be at least 10 seconds'
            )
          }),
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
          min: requiredIfAdvanced(validationContext, (value) => {
            return (
              new BigNumber(value as BigNumber).gte(hoursInDays(1)) ||
              'must be at least 1 hour'
            )
          }),
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
          min: requiredIfAdvanced(validationContext, (value) => {
            return (
              new BigNumber(value as BigNumber).gte(1) ||
              'must be at least 1 SC'
            )
          }),
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
          min: requiredIfAdvanced(validationContext, (value) => {
            return (
              new BigNumber(value as BigNumber).gt(0) ||
              'must be greater than 0'
            )
          }),
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
            (value, values) =>
              new BigNumber(value as BigNumber).gte(values.minShards) ||
              'must be at least equal to min shards'
          ),
          max: requiredIfAdvanced(
            validationContext,
            (value) =>
              new BigNumber(value as BigNumber).lt(256) ||
              'must be less than 256'
          ),
        },
      },
    },

    // pinning
    pinningEnabled: {
      category: 'pinning',
      type: 'boolean',
      title: 'Pinning',
      description:
        'Pinning allows you to set a fixed fiat price for each supported field. Pinning is available for allowance and maximum price fields.',
      validation: {},
    },
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
        validate: {
          required: requiredIfPinningEnabled(validationContext),
        },
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
      // hidden: configViewMode === 'basic',
      validation: {
        validate: {
          required: requiredIfPinningEnabled(validationContext),
          max: requiredIfPinningEnabled(
            validationContext,
            (value) =>
              new BigNumber(value as BigNumber).lte(100) ||
              `must be at most 100%`
          ),
          min: requiredIfPinningEnabled(
            validationContext,
            (value) =>
              new BigNumber(value as BigNumber).gte(0) || `must be at least 0%`
          ),
        },
      },
    },
    forexEndpointURL: {
      category: 'pinning',
      type: 'text',
      title: 'Forex endpoint URL',
      placeholder: 'https://api.siascan.com/exchange-rate/siacoin',
      suggestion: 'https://api.siascan.com/exchange-rate/siacoin',
      suggestionTip: 'SiaScan provides an exchange rate endpoint.',
      description: (
        <Text className="flex flex-col gap-2">
          <Text color="subtle" size="14">
            Endpoint for fetching exchange rates. The endpoint URL should allow
            appending a currency code to the URL and the endpoint response
            should be a single number representing the exchange rate. For
            example, the SiaScan exchange rate endpoint:
          </Text>
          <Text color="contrast">
            https://api.siascan.com/exchange-rate/siacoin
          </Text>
          <Link
            color="subtle"
            target="_blank"
            href={'https://api.siascan.com/exchange-rate/siacoin/usd'}
          >
            https://api.siascan.com/exchange-rate/siacoin/usd
          </Link>
          <Link
            color="subtle"
            target="_blank"
            href={'https://api.siascan.com/exchange-rate/siacoin/jpy'}
          >
            https://api.siascan.com/exchange-rate/siacoin/jpy
          </Link>
        </Text>
      ),
      validation: {
        validate: {
          required: requiredIfPinningEnabled(validationContext),
        },
      },
    },
  }
}

function requiredIfAdvanced<Values>(
  context: { configViewMode: ConfigViewMode },
  method?: (value: unknown, values: Values) => string | boolean
) {
  return (value: unknown, values: Values) => {
    if (context.configViewMode === 'advanced') {
      if (method) {
        return method(value, values)
      }
      return !!value || 'required'
    }
    return true
  }
}

function requiredIfAutopilot<Values>(
  context: { isAutopilotEnabled: boolean },
  method?: (value: unknown, values: Values) => string | boolean
) {
  return (value: unknown, values: Values) => {
    if (context.isAutopilotEnabled) {
      if (method) {
        return method(value, values)
      }
      return !!value || 'required'
    }
    return true
  }
}

function requiredIfAutopilotAndAdvanced<Values>(
  context: {
    isAutopilotEnabled: boolean
    configViewMode: ConfigViewMode
  },
  method?: (value: unknown, values: Values) => string | boolean
) {
  return (value: unknown, values: Values) => {
    if (context.isAutopilotEnabled && context.configViewMode === 'advanced') {
      if (method) {
        return method(value, values)
      }
      return !!value || 'required'
    }
    return true
  }
}

function requiredIfPinningEnabled<Values>(
  context: {
    pinningEnabled: boolean
  },
  method?: (value: unknown, values: Values) => string | boolean
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
