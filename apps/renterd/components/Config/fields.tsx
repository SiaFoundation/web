/* eslint-disable react/no-unescaped-entities */
import {
  ConfigFields,
  hoursInDays,
  secondsInMinutes,
} from '@siafoundation/design-system'
import BigNumber from 'bignumber.js'
import React from 'react'

export const scDecimalPlaces = 6

export const initialValues = {
  // gouging
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
  // redundancy
  minShards: undefined as BigNumber | undefined,
  totalShards: undefined as BigNumber | undefined,
}

export type SettingsData = typeof initialValues

type Categories = 'gouging' | 'redundancy'

export const fields: ConfigFields<typeof initialValues, Categories> = {
  // gouging
  maxStoragePrice: {
    category: 'gouging',
    type: 'siacoin',
    title: 'Max storage price',
    description: <>The max allowed price to store 1 TB per month.</>,
    units: 'SC/TB/month',
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
    decimalsLimitSc: scDecimalPlaces,
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
        The min accepted value for `AccountExpiry` in the host's price settings.
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
          new BigNumber(value as BigNumber).lt(256) || 'must be less than 256',
      },
    },
  },
}
