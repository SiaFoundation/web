import { ConfigFields } from '@siafoundation/design-system'
import { Quota } from '@siafoundation/indexd-types'
import { humanBytes } from '@siafoundation/units'
import BigNumber from 'bignumber.js'

export type QuotaData = {
  id: string
  key: string
  description: string
  maxPinnedData: number
  totalUses: number
  displayFields: {
    maxPinnedData: string
  }
}

export function transformDownData(quota: Quota): QuotaData {
  return {
    id: quota.key,
    key: quota.key,
    description: quota.description,
    maxPinnedData: quota.maxPinnedData,
    totalUses: quota.totalUses,
    displayFields: {
      maxPinnedData: humanBytes(quota.maxPinnedData),
    },
  }
}

function transformDownForm(
  quota: Pick<QuotaData, 'description' | 'maxPinnedData' | 'totalUses'>,
): Values {
  return {
    description: quota.description,
    maxPinnedDataGB: new BigNumber(quota.maxPinnedData).div(1e9),
    totalUses: new BigNumber(quota.totalUses),
  }
}

export function transformUpForm(
  values: Values,
): Pick<Quota, 'description' | 'maxPinnedData' | 'totalUses'> {
  return {
    description: values.description,
    maxPinnedData: values.maxPinnedDataGB
      ? values.maxPinnedDataGB.times(1e9).toNumber()
      : 0,
    totalUses: values.totalUses ? values.totalUses.toNumber() : 0,
  }
}

export function transformDown(response: Quota): {
  quota: QuotaData
  values: Values
} {
  const quota = transformDownData(response)
  const values = transformDownForm(quota)
  return {
    quota,
    values,
  }
}

export const defaultValues = {
  description: '',
  maxPinnedDataGB: undefined as undefined | BigNumber,
  totalUses: undefined as undefined | BigNumber,
}

export type Values = typeof defaultValues

export function getFields(): ConfigFields<typeof defaultValues, never> {
  return {
    description: {
      type: 'text',
      title: 'Description',
      placeholder: 'Description',
      validation: {
        required: 'required',
      },
    },
    maxPinnedDataGB: {
      type: 'number',
      title: 'Max pinned data',
      units: 'GB',
      decimalsLimit: 2,
      placeholder: '100',
      validation: {
        required: 'required',
      },
    },
    totalUses: {
      type: 'number',
      title: 'Total uses',
      decimalsLimit: 0,
      placeholder: '1000',
      validation: {
        required: 'required',
      },
    },
  }
}
