import { ConfigFields } from '@siafoundation/design-system'
import { Maybe } from '@siafoundation/types'
import BigNumber from 'bignumber.js'
import { ConnectKey } from '@siafoundation/indexd-types'
import { bytesToGB, GBToBytes } from '@siafoundation/units'
import { humanBytes } from '@siafoundation/units'

export type KeyData = {
  id: string
  key: string
  description: string
  maxPinnedData: number
  pinnedData: number
  totalUses: number
  remainingUses: number
  dateCreated: string
  lastUpdated: string
  lastUsed: string
  displayFields: {
    totalUses: string
    maxPinnedData: string
    pinnedData: string
    dateCreated: string
    lastUpdated: string
    lastUsed?: string
  }
}

export function transformDownData(key: ConnectKey): KeyData {
  const datum: KeyData = {
    id: key.key,
    key: key.key,
    description: key.description,
    maxPinnedData: key.maxPinnedData,
    pinnedData: key.pinnedData,
    totalUses: key.totalUses,
    remainingUses: key.remainingUses,
    dateCreated: key.dateCreated,
    lastUpdated: key.lastUpdated,
    lastUsed: key.lastUsed,
    displayFields: {
      totalUses: key.totalUses.toString(),
      maxPinnedData: humanBytes(key.maxPinnedData),
      pinnedData: humanBytes(key.pinnedData),
      dateCreated: Intl.DateTimeFormat('en-US', {
        dateStyle: 'short',
        timeStyle: 'short',
      }).format(new Date(key.dateCreated)),
      lastUpdated: Intl.DateTimeFormat('en-US', {
        dateStyle: 'short',
        timeStyle: 'short',
      }).format(new Date(key.lastUpdated)),
      lastUsed: key.lastUsed
        ? Intl.DateTimeFormat('en-US', {
            dateStyle: 'short',
            timeStyle: 'short',
          }).format(new Date(key.lastUsed))
        : undefined,
    },
  }
  return datum
}

function transformDownForm(
  connectKey: Pick<KeyData, 'description' | 'maxPinnedData' | 'remainingUses'>,
): Values {
  return {
    description: connectKey.description,
    maxPinnedDataGB: bytesToGB(connectKey.maxPinnedData),
    remainingUses: new BigNumber(connectKey.remainingUses),
  }
}

export function transformUpForm(
  values: Values,
): Pick<ConnectKey, 'description' | 'maxPinnedData' | 'remainingUses'> {
  return {
    description: values.description,
    maxPinnedData: GBToBytes(values.maxPinnedDataGB).toNumber(),
    remainingUses: values.remainingUses.toNumber(),
  }
}

export function transformDown(response: ConnectKey): {
  connectKey: KeyData
  values: Values
} {
  const connectKey = transformDownData(response)
  const values = transformDownForm(connectKey)
  return {
    connectKey,
    values,
  }
}

export const defaultValues = {
  description: '',
  maxPinnedDataGB: new BigNumber(1000),
  remainingUses: new BigNumber(1000),
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
      placeholder: 'Max pinned data',
      units: 'GB',
      validation: {
        required: 'required',
        validate: {
          number: (value: Maybe<BigNumber>) => {
            if (!value || value.isNaN()) {
              return 'Must be a number'
            }
            return true
          },
        },
      },
    },
    remainingUses: {
      type: 'number',
      title: 'Remaining uses',
      placeholder: 'Remaining uses',
      validation: {
        required: 'required',
        validate: {
          max: (value: Maybe<BigNumber>) => {
            if (value && value.gt(1_000)) {
              return 'Max value is 1,000'
            }
            return true
          },
          min: (value: Maybe<BigNumber>) => {
            if (value && value.lt(1)) {
              return 'Min value is 1'
            }
            return true
          },
        },
      },
    },
  }
}
