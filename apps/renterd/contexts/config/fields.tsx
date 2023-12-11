/* eslint-disable react/no-unescaped-entities */
import {
  Code,
  ConfigFields,
  FieldSwitch,
  Text,
  Tooltip,
  hoursInDays,
  secondsInMinutes,
  toFixedMax,
} from '@siafoundation/design-system'
import BigNumber from 'bignumber.js'
import React from 'react'
import { defaultValues, SettingsData } from './types'

export const scDecimalPlaces = 6

type Categories =
  | 'storage'
  | 'gouging'
  | 'hosts'
  | 'wallet'
  | 'contractset'
  | 'uploadpacking'
  | 'redundancy'

type GetFields = {
  isAutopilotEnabled: boolean
  advancedDefaults?: SettingsData
  showAdvanced: boolean
  redundancyMultiplier: BigNumber
  includeRedundancyMaxStoragePrice: boolean
  includeRedundancyMaxUploadPrice: boolean
  storageAverage?: BigNumber
  uploadAverage?: BigNumber
  downloadAverage?: BigNumber
  contractAverage?: BigNumber
}

export function getFields({
  isAutopilotEnabled,
  advancedDefaults,
  showAdvanced,
  redundancyMultiplier,
  includeRedundancyMaxStoragePrice,
  includeRedundancyMaxUploadPrice,
  storageAverage,
  uploadAverage,
  downloadAverage,
  contractAverage,
}: GetFields): ConfigFields<typeof defaultValues, Categories> {
  return {
    // storage
    storageTB: {
      type: 'number',
      category: 'storage',
      title: 'Expected storage',
      description: <>The amount of storage you would like to rent in TB.</>,
      units: 'TB',
      hidden: !isAutopilotEnabled,
      validation: isAutopilotEnabled
        ? {
            required: 'required',
          }
        : {},
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
      validation: isAutopilotEnabled
        ? {
            required: 'required',
          }
        : {},
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
      validation: isAutopilotEnabled
        ? {
            required: 'required',
          }
        : {},
    },
    allowanceMonth: {
      type: 'siacoin',
      category: 'storage',
      title: 'Allowance',
      description: (
        <>The amount of Siacoin you would like to spend per month.</>
      ),
      units: 'SC/month',
      decimalsLimitSc: scDecimalPlaces,
      hidden: !isAutopilotEnabled || !showAdvanced,
      validation:
        isAutopilotEnabled && showAdvanced
          ? {
              required: 'required',
            }
          : {},
    },
    periodWeeks: {
      type: 'number',
      category: 'storage',
      title: 'Period',
      description: <>The length of the storage contracts.</>,
      units: 'weeks',
      suggestion: advancedDefaults?.periodWeeks,
      suggestionTip: `Typically ${advancedDefaults?.periodWeeks} weeks.`,
      hidden: !isAutopilotEnabled || !showAdvanced,
      validation:
        isAutopilotEnabled && showAdvanced
          ? {
              required: 'required',
            }
          : {},
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
      hidden: !isAutopilotEnabled || !showAdvanced,
      validation:
        isAutopilotEnabled && showAdvanced
          ? {
              required: 'required',
            }
          : {},
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
      hidden: !isAutopilotEnabled || !showAdvanced,
      validation:
        isAutopilotEnabled && showAdvanced
          ? {
              required: 'required',
            }
          : {},
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
      hidden: !isAutopilotEnabled || !showAdvanced,
      validation:
        isAutopilotEnabled && showAdvanced
          ? {
              required: 'required',
            }
          : {},
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
      hidden: !isAutopilotEnabled || !showAdvanced,
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
      hidden: !isAutopilotEnabled || !showAdvanced,
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
        .toLocaleString()} which is ${toFixedMax(
        new BigNumber(
          hoursInDays(advancedDefaults?.maxDowntimeHours.toNumber())
        ),
        1
      )} days.`,
      hidden: !isAutopilotEnabled || !showAdvanced,
      validation:
        isAutopilotEnabled && showAdvanced
          ? {
              required: 'required',
            }
          : {},
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
      hidden: !isAutopilotEnabled || !showAdvanced,
      validation:
        isAutopilotEnabled && showAdvanced
          ? {
              required: 'required',
            }
          : {},
    },

    // wallet
    defragThreshold: {
      type: 'number',
      category: 'wallet',
      title: 'Defrag threshold',
      description: (
        <>The threshold after which autopilot will defrag wallet outputs.</>
      ),
      units: 'outputs',
      suggestion: advancedDefaults?.defragThreshold,
      suggestionTip: 'Defaults to 1,000.',
      hidden: !isAutopilotEnabled || !showAdvanced,
      validation:
        isAutopilotEnabled && showAdvanced
          ? {
              required: 'required',
            }
          : {},
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
      hidden: !showAdvanced,
      validation: showAdvanced
        ? {
            required: 'required',
          }
        : {},
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
      hidden: !showAdvanced,
      validation: {},
    },

    // gouging
    maxStoragePriceTBMonth: {
      category: 'gouging',
      type: 'siacoin',
      title: 'Max storage price',
      description: <>The max allowed price to store 1 TB per month.</>,
      units: 'SC/TB/month',
      average: storageAverage,
      averageTip: getAverageTip(
        includeRedundancyMaxStoragePrice,
        redundancyMultiplier
      ),
      after: function After({ form, fields }) {
        return (
          <Tooltip
            align="start"
            side="bottom"
            content={getRedundancyTip(
              includeRedundancyMaxStoragePrice,
              redundancyMultiplier
            )}
          >
            <div>
              <FieldSwitch
                size="small"
                form={form}
                fields={fields}
                name="includeRedundancyMaxStoragePrice"
                group={false}
              >
                <Text size="12" weight="medium">
                  Including {redundancyMultiplier.toFixed(1)}x redundancy
                </Text>
              </FieldSwitch>
            </div>
          </Tooltip>
        )
      },
      decimalsLimitSc: scDecimalPlaces,
      validation: {
        required: 'required',
      },
    },
    maxUploadPriceTB: {
      category: 'gouging',
      type: 'siacoin',
      title: 'Max upload price',
      description: <>The max allowed price to upload 1 TB.</>,
      units: 'SC/TB/month',
      average: uploadAverage,
      averageTip: getAverageTip(
        includeRedundancyMaxUploadPrice,
        redundancyMultiplier
      ),
      after: function After({ form, fields }) {
        return (
          <Tooltip
            align="start"
            side="bottom"
            content={getRedundancyTip(
              includeRedundancyMaxUploadPrice,
              redundancyMultiplier
            )}
          >
            <div>
              <FieldSwitch
                size="small"
                form={form}
                fields={fields}
                name="includeRedundancyMaxUploadPrice"
                group={false}
              >
                <Text size="12" weight="medium">
                  Including {redundancyMultiplier.toFixed(1)}x redundancy
                </Text>
              </FieldSwitch>
            </div>
          </Tooltip>
        )
      },
      decimalsLimitSc: scDecimalPlaces,
      validation: {
        required: 'required',
      },
    },
    maxDownloadPriceTB: {
      category: 'gouging',
      type: 'siacoin',
      title: 'Max download price',
      description: <>The max allowed price to download 1 TB.</>,
      units: 'SC/TB/month',
      average: downloadAverage,
      averageTip: `Averages provided by Sia Central.`,
      decimalsLimitSc: scDecimalPlaces,
      validation: {
        required: 'required',
      },
    },
    maxContractPrice: {
      category: 'gouging',
      type: 'siacoin',
      title: 'Max contract price',
      description: <>The max allowed price to form a contract.</>,
      average: contractAverage,
      decimalsLimitSc: scDecimalPlaces,
      tipsDecimalsLimitSc: 3,
      hidden: !showAdvanced,
      validation: showAdvanced
        ? {
            required: 'required',
          }
        : {},
    },
    maxRpcPriceMillion: {
      category: 'gouging',
      type: 'siacoin',
      title: 'Max RPC price',
      description: (
        <>The max allowed base price for RPCs in siacoins per million calls.</>
      ),
      units: 'SC/million',
      decimalsLimitSc: scDecimalPlaces,
      hidden: !showAdvanced,
      validation: showAdvanced
        ? {
            required: 'required',
          }
        : {},
    },
    minMaxCollateral: {
      category: 'gouging',
      type: 'siacoin',
      title: 'Min max collateral',
      description: (
        <>The min value for max collateral in the host's price settings.</>
      ),
      decimalsLimitSc: scDecimalPlaces,
      hidden: !showAdvanced,
      validation: showAdvanced
        ? {
            required: 'required',
          }
        : {},
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
      suggestion: advancedDefaults?.hostBlockHeightLeeway,
      suggestionTip: 'The recommended value is 6 blocks.',
      hidden: !showAdvanced,
      validation: showAdvanced
        ? {
            required: 'required',
            validate: {
              min: (value) =>
                new BigNumber(value as BigNumber).gte(3) ||
                'must be at least 3 blocks',
            },
          }
        : {},
    },
    minPriceTableValidityMinutes: {
      category: 'gouging',
      type: 'number',
      title: 'Min price table validity',
      units: 'minutes',
      description: (
        <>The min accepted value for `Validity` in the host's price settings.</>
      ),
      hidden: !showAdvanced,
      validation: showAdvanced
        ? {
            required: 'required',
            validate: {
              min: (value) =>
                new BigNumber(value as BigNumber).gte(secondsInMinutes(10)) ||
                'must be at least 10 seconds',
            },
          }
        : {},
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
      hidden: !showAdvanced,
      validation: showAdvanced
        ? {
            required: 'required',
            validate: {
              min: (value) =>
                new BigNumber(value as BigNumber).gte(hoursInDays(1)) ||
                'must be at least 1 hour',
            },
          }
        : {},
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
      hidden: !showAdvanced,
      validation: showAdvanced
        ? {
            required: 'required',
            validate: {
              min: (value) =>
                new BigNumber(value as BigNumber).gte(1) ||
                'must be at least 1 SC',
            },
          }
        : {},
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
      suggestion: new BigNumber(10),
      suggestionTip: 'The default multiplier is 10x the download price.',
      hidden: !showAdvanced,
      validation: showAdvanced
        ? {
            required: 'required',
          }
        : {},
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
      hidden: !showAdvanced,
      validation: showAdvanced
        ? {
            required: 'required',
            validate: {
              min: (value) =>
                new BigNumber(value as BigNumber).gt(0) ||
                'must be greater than 0',
            },
          }
        : {},
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
      hidden: !showAdvanced,
      validation: showAdvanced
        ? {
            required: 'required',
            validate: {
              gteMinShards: (value, values) =>
                new BigNumber(value as BigNumber).gte(values.minShards) ||
                'must be at least equal to min shards',
              max: (value) =>
                new BigNumber(value as BigNumber).lt(256) ||
                'must be less than 256',
            },
          }
        : {},
    },

    // hidden fields used by other config options
    includeRedundancyMaxStoragePrice: {
      type: 'boolean',
      title: 'Include redundancy',
      validation: {},
    },
    includeRedundancyMaxUploadPrice: {
      type: 'boolean',
      title: 'Include redundancy',
      validation: {},
    },
  }
}

function getAverageTip(
  includeRedundancy: boolean,
  redundancyMultiplier: BigNumber
) {
  if (includeRedundancy) {
    return `The average price is adjusted for ${redundancyMultiplier.toFixed(
      1
    )}x redundancy. Averages provided by Sia Central.`
  }
  return `The average price is not adjusted for redundancy. Averages provided by Sia Central.`
}

function getRedundancyTip(
  includeRedundancy: boolean,
  redundancyMultiplier: BigNumber
) {
  if (includeRedundancy) {
    return (
      <div className="flex flex-col gap-1">
        <Text color="subtle">
          Specified max price includes the cost of{' '}
          {redundancyMultiplier.toFixed(1)}x redundancy.
        </Text>
        <Text color="subtle">
          Redundancy is calculated from the ratio of data shards:{' '}
          <Code>total shards / min shards</Code>.
        </Text>
      </div>
    )
  }
  return `Specified max price does not include redundancy.`
}
