import { ConfigFields } from '@siafoundation/design-system'
import { Maybe } from '@siafoundation/types'
import BigNumber from 'bignumber.js'
import React from 'react'
import { Categories, InputValues } from './types'
import { currencyOptions } from '@siafoundation/react-core'
import {
  MaxStoragePriceTips,
  MaxStoragePricePinnedTips,
} from './fieldTips/MaxStoragePrice'
import {
  MaxIngressPriceTips,
  MaxIngressPricePinnedTips,
} from './fieldTips/MaxIngressPrice'
import {
  MaxEgressPriceTips,
  MaxEgressPricePinnedTips,
} from './fieldTips/MaxEgressPrice'

export const scDecimalPlaces = 6

export type Fields = ReturnType<typeof getFields>

export function getFields(): ConfigFields<InputValues, Categories> {
  return {
    // contracts
    wantedContracts: {
      type: 'number',
      category: 'contracts',
      title: 'Wanted contracts',
      description: <>The number of contracts you would like to have.</>,
      units: 'contracts',
      validation: {
        required: 'required',
      },
    },
    periodWeeks: {
      type: 'number',
      category: 'contracts',
      title: 'Period',
      description: <>The length of the storage contracts.</>,
      units: 'weeks',
      suggestion: new BigNumber(6),
      suggestionTip: `Typically 6 weeks.`,
      validation: {
        required: 'required',
      },
    },
    renewWindowWeeks: {
      type: 'number',
      category: 'contracts',
      title: 'Renew window',
      description: (
        <>
          The number of weeks prior to contract expiration that Sia will attempt
          to renew your contracts.
        </>
      ),
      units: 'weeks',
      decimalsLimit: 6,
      suggestion: new BigNumber(2),
      suggestionTip: `Typically 2 weeks.`,
      validation: {
        required: 'required',
      },
    },

    // pricing
    shouldPinMaxStoragePrice: {
      title: '',
      description: '',
      type: 'boolean',
      category: 'pricing',
      validation: {},
    },
    maxStoragePriceTBMonth: {
      category: 'pricing',
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
        <MaxStoragePriceTips form={form} fields={fields} />
      ),
    },
    maxStoragePriceTBMonthPinned: {
      title: '',
      description: '',
      units: '/TB/month',
      type: 'fiat',
      category: 'pricing',
      validation: {
        validate: {
          required: requiredIfPinningEnabled(
            'shouldPinMaxStoragePrice',
            (value: Maybe<BigNumber>, values) => {
              if (!values.shouldPinMaxStoragePrice) {
                return true
              }
              return !!value || 'required'
            },
          ),
          currency: requiredIfPinningEnabled(
            'shouldPinMaxStoragePrice',
            (_, values) =>
              !!values.pinnedCurrency || 'must select a pinned currency',
          ),
          range: requiredIfPinningEnabled(
            'shouldPinMaxStoragePrice',
            (value: Maybe<BigNumber>, values) =>
              !values.shouldPinMaxStoragePrice ||
              value?.gt(0) ||
              'must be greater than 0',
          ),
        },
      },
      after: ({ form, fields }) => (
        <MaxStoragePricePinnedTips form={form} fields={fields} />
      ),
    },
    shouldPinMaxIngressPrice: {
      title: '',
      description: '',
      type: 'boolean',
      category: 'pricing',
      validation: {},
    },
    maxIngressPriceTB: {
      category: 'pricing',
      type: 'siacoin',
      title: 'Max ingress price',
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
        <MaxIngressPriceTips form={form} fields={fields} />
      ),
    },
    maxIngressPriceTBPinned: {
      title: '',
      description: '',
      units: '/TB',
      type: 'fiat',
      category: 'pricing',
      validation: {
        validate: {
          required: requiredIfPinningEnabled(
            'shouldPinMaxIngressPrice',
            (value: Maybe<BigNumber>, values) => {
              if (!values.shouldPinMaxIngressPrice) {
                return true
              }
              return !!value || 'required'
            },
          ),
          currency: requiredIfPinningEnabled(
            'shouldPinMaxIngressPrice',
            (_, values) =>
              !!values.pinnedCurrency || 'must select a pinned currency',
          ),
          range: requiredIfPinningEnabled(
            'shouldPinMaxIngressPrice',
            (value: Maybe<BigNumber>, values) =>
              !values.shouldPinMaxIngressPrice ||
              value?.gt(0) ||
              'must be greater than 0',
          ),
        },
      },
      after: ({ form, fields }) => (
        <MaxIngressPricePinnedTips form={form} fields={fields} />
      ),
    },
    shouldPinMaxEgressPrice: {
      title: '',
      description: '',
      type: 'boolean',
      category: 'pricing',
      validation: {},
    },
    maxEgressPriceTB: {
      category: 'pricing',
      type: 'siacoin',
      title: 'Max egress price',
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
        <MaxEgressPriceTips form={form} fields={fields} />
      ),
    },
    maxEgressPriceTBPinned: {
      title: '',
      description: '',
      units: '/TB',
      type: 'fiat',
      category: 'pricing',
      validation: {
        validate: {
          required: requiredIfPinningEnabled(
            'shouldPinMaxEgressPrice',
            (value: Maybe<BigNumber>, values) => {
              if (!values.shouldPinMaxEgressPrice) {
                return true
              }
              return !!value || 'required'
            },
          ),
          currency: requiredIfPinningEnabled(
            'shouldPinMaxEgressPrice',
            (_, values) =>
              !!values.pinnedCurrency || 'must select a pinned currency',
          ),
          range: requiredIfPinningEnabled(
            'shouldPinMaxEgressPrice',
            (value: Maybe<BigNumber>, values) =>
              !values.shouldPinMaxEgressPrice ||
              value?.gt(0) ||
              'must be greater than 0',
          ),
        },
      },
      after: ({ form, fields }) => (
        <MaxEgressPricePinnedTips form={form} fields={fields} />
      ),
    },
    shouldPinMinCollateral: {
      title: '',
      description: '',
      type: 'boolean',
      category: 'pricing',
      validation: {},
    },
    minCollateral: {
      category: 'pricing',
      type: 'siacoin',
      title: 'Min collateral',
      description: (
        <>
          The min allowed collateral a contract must have. Choose whether to set
          the collateral in siacoin or to pin the collateral to a fixed fiat
          value.
        </>
      ),
      units: 'SC',
      decimalsLimitSc: scDecimalPlaces,
      validation: {
        required: 'required',
      },
    },
    minCollateralPinned: {
      title: '',
      description: '',
      type: 'fiat',
      category: 'pricing',
      validation: {
        validate: {
          required: requiredIfPinningEnabled(
            'shouldPinMinCollateral',
            (value: Maybe<BigNumber>, values) => {
              if (!values.shouldPinMinCollateral) {
                return true
              }
              return !!value || 'required'
            },
          ),
          currency: requiredIfPinningEnabled(
            'shouldPinMinCollateral',
            (_, values) =>
              !!values.pinnedCurrency || 'must select a pinned currency',
          ),
          range: requiredIfPinningEnabled(
            'shouldPinMinCollateral',
            (value: Maybe<BigNumber>, values) =>
              !values.shouldPinMinCollateral ||
              value?.gt(0) ||
              'must be greater than 0',
          ),
        },
      },
    },
    pinnedCurrency: {
      category: 'pricing',
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
    minProtocolVersion: {
      category: 'other',
      type: 'text',
      title: 'Min protocol version',
      description: 'The minimum protocol version to accept contracts.',
      validation: {
        validate: {
          version: (value: Maybe<string>) => {
            if (!value) {
              return true
            }
            return /^[0-9]+\.[0-9]+\.[0-9]+$/.test(value) || 'invalid version'
          },
        },
      },
    },
  }
}

type ShouldPinField =
  | 'shouldPinMaxStoragePrice'
  | 'shouldPinMaxIngressPrice'
  | 'shouldPinMaxEgressPrice'
  | 'shouldPinMinCollateral'

// The following validation helper methods treat the value as any so that the
// type can be specified by the caller. Theoretically this could be inferred by
// ConfigFields but I could not figure it out.
function requiredIfPinningEnabled(
  field: ShouldPinField,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  method?: (value: any, values: InputValues) => string | boolean,
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
