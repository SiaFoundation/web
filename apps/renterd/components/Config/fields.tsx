/* eslint-disable react/no-unescaped-entities */
import {
  Code,
  ConfigFields,
  FieldSwitch,
  hoursInDays,
  secondsInMinutes,
  Text,
  Tooltip,
} from '@siafoundation/design-system'
import BigNumber from 'bignumber.js'
import React from 'react'

export const scDecimalPlaces = 6

export const defaultContractSet = {
  contractSet: '',
}

export const defaultConfigApp = {
  includeRedundancyMaxStoragePrice: true,
  includeRedundancyMaxUploadPrice: true,
}

export const defaultGouging = {
  maxRpcPrice: undefined as BigNumber | undefined,
  maxStoragePrice: undefined as BigNumber | undefined,
  maxContractPrice: undefined as BigNumber | undefined,
  maxDownloadPrice: undefined as BigNumber | undefined,
  maxUploadPrice: undefined as BigNumber | undefined,
  minMaxCollateral: undefined as BigNumber | undefined,
  hostBlockHeightLeeway: undefined as BigNumber | undefined,
  minPriceTableValidity: undefined as BigNumber | undefined,
  minAccountExpiry: undefined as BigNumber | undefined,
  minMaxEphemeralAccountBalance: undefined as BigNumber | undefined,
}

export const defaultRedundancy = {
  minShards: undefined as BigNumber | undefined,
  totalShards: undefined as BigNumber | undefined,
}

export const defaultValues = {
  // contract set
  ...defaultContractSet,
  // gouging
  ...defaultGouging,
  // redundancy
  ...defaultRedundancy,
  // config app
  ...defaultConfigApp,
}

export type ContractSetData = typeof defaultContractSet
export type ConfigAppData = typeof defaultConfigApp
export type GougingData = typeof defaultGouging
export type RedundancyData = typeof defaultRedundancy
export type SettingsData = typeof defaultValues

type Categories = 'contractset' | 'gouging' | 'redundancy'

type GetFields = {
  redundancyMultiplier: BigNumber
  includeRedundancyMaxStoragePrice: boolean
  includeRedundancyMaxUploadPrice: boolean
  storageAverage?: BigNumber
  uploadAverage?: BigNumber
  downloadAverage?: BigNumber
  contractAverage?: BigNumber
}

export function getFields({
  redundancyMultiplier,
  includeRedundancyMaxStoragePrice,
  includeRedundancyMaxUploadPrice,
  storageAverage,
  uploadAverage,
  downloadAverage,
  contractAverage,
}: GetFields): ConfigFields<typeof defaultValues, Categories> {
  return {
    // contract
    contractSet: {
      category: 'contractset',
      type: 'text',
      title: 'Default contract set',
      placeholder: 'autopilot',
      suggestion: 'autopilot',
      suggestionTip: (
        <>
          Autopilot users will typically want to keep this the same as the
          autopilot contract set.
        </>
      ),
      description: (
        <>The default contract set is where data is uploaded to by default.</>
      ),
      validation: {
        required: 'required',
      },
    },
    // gouging
    maxStoragePrice: {
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
    maxUploadPrice: {
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
    maxDownloadPrice: {
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
      validation: {
        required: 'required',
      },
    },
    maxRpcPrice: {
      category: 'gouging',
      type: 'siacoin',
      title: 'Max RPC price',
      description: (
        <>The max allowed base price for RPCs in siacoins per million calls.</>
      ),
      units: 'SC/million',
      decimalsLimitSc: scDecimalPlaces,
      validation: {
        required: 'required',
      },
    },
    minMaxCollateral: {
      category: 'gouging',
      type: 'siacoin',
      title: 'Min max collateral',
      description: (
        <>The min value for max collateral in the host's price settings.</>
      ),
      decimalsLimitSc: scDecimalPlaces,
      validation: {
        required: 'required',
      },
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
      suggestion: new BigNumber(6),
      suggestionTip: 'The recommended value is 6 blocks.',
      validation: {
        required: 'required',
        validate: {
          min: (value) =>
            new BigNumber(value as BigNumber).gte(3) ||
            'must be at least 3 blocks',
        },
      },
    },
    minPriceTableValidity: {
      category: 'gouging',
      type: 'number',
      title: 'Min price table validity',
      units: 'minutes',
      description: (
        <>The min accepted value for `Validity` in the host's price settings.</>
      ),
      validation: {
        required: 'required',
        validate: {
          min: (value) =>
            new BigNumber(value as BigNumber).gte(secondsInMinutes(10)) ||
            'must be at least 10 seconds',
        },
      },
    },
    minAccountExpiry: {
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
      validation: {
        required: 'required',
        validate: {
          min: (value) =>
            new BigNumber(value as BigNumber).gte(hoursInDays(1)) ||
            'must be at least 1 hour',
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
      validation: {
        required: 'required',
        validate: {
          min: (value) =>
            new BigNumber(value as BigNumber).gte(1) || 'must be at least 1 SC',
        },
      },
    },

    // Redundancy
    minShards: {
      type: 'number',
      category: 'redundancy',
      title: 'Min shards',
      description: <>The min amount of shards needed to reconstruct a slab.</>,
      units: 'shards',
      validation: {
        required: 'required',
        validate: {
          min: (value) =>
            new BigNumber(value as BigNumber).gt(0) || 'must be greater than 0',
        },
      },
      trigger: ['totalShards'],
    },
    totalShards: {
      type: 'number',
      category: 'redundancy',
      title: 'Total shards',
      description: <>The total amount of shards for each slab.</>,
      units: 'shards',
      validation: {
        required: 'required',
        validate: {
          gteMinShards: (value, values) =>
            new BigNumber(value as BigNumber).gte(values.minShards) ||
            'must be at least equal to min shards',
          max: (value) =>
            new BigNumber(value as BigNumber).lt(256) ||
            'must be less than 256',
        },
      },
    },
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
          <Code>min shards / total shards</Code>.
        </Text>
      </div>
    )
  }
  return `Specified max price does not include redundancy.`
}
