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
  fundTargetBytes: number
  displayFields: {
    maxPinnedData: string
    fundTargetBytes: string
  }
}

export function transformDownData(quota: Quota): QuotaData {
  return {
    id: quota.key,
    key: quota.key,
    description: quota.description,
    maxPinnedData: quota.maxPinnedData,
    totalUses: quota.totalUses,
    fundTargetBytes: quota.fundTargetBytes,
    displayFields: {
      maxPinnedData: humanBytes(quota.maxPinnedData),
      fundTargetBytes: humanBytes(quota.fundTargetBytes),
    },
  }
}

function transformDownForm(
  quota: Pick<
    QuotaData,
    'description' | 'maxPinnedData' | 'totalUses' | 'fundTargetBytes'
  >,
): Values {
  return {
    description: quota.description,
    maxPinnedDataGB: new BigNumber(quota.maxPinnedData).div(1e9),
    totalUses: new BigNumber(quota.totalUses),
    fundTargetGB: new BigNumber(quota.fundTargetBytes).div(1e9),
  }
}

export function transformUpForm(
  values: Values,
): Pick<Quota, 'description' | 'maxPinnedData' | 'totalUses' | 'fundTargetBytes'> {
  return {
    description: values.description,
    maxPinnedData: values.maxPinnedDataGB
      ? values.maxPinnedDataGB.times(1e9).toNumber()
      : 0,
    totalUses: values.totalUses ? values.totalUses.toNumber() : 0,
    fundTargetBytes: values.fundTargetGB
      ? values.fundTargetGB.times(1e9).toNumber()
      : 0,
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

// 16 GiB default fund target (16 << 30 bytes = 17.179869184 GB)
const defaultFundTargetGB = new BigNumber(16).times(
  new BigNumber(2).pow(30).div(1e9)
)

export const defaultValues = {
  description: '',
  maxPinnedDataGB: undefined as undefined | BigNumber,
  totalUses: undefined as undefined | BigNumber,
  fundTargetGB: defaultFundTargetGB as undefined | BigNumber,
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
    fundTargetGB: {
      type: 'number',
      title: 'Fund target',
      units: 'GB',
      decimalsLimit: 2,
      placeholder: '17.18',
      validation: {
        required: 'required',
      },
    },
  }
}
