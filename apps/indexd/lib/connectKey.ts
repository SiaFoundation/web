import { ConfigFields } from '@siafoundation/design-system'
import { ConnectKey, Quota } from '@siafoundation/indexd-types'
import { humanBytes } from '@siafoundation/units'

export type KeyData = {
  id: string
  key: string
  description: string
  quota: string
  remainingUses: number
  pinnedData: number
  dateCreated: string
  lastUpdated: string
  lastUsed: string
  displayFields: {
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
    quota: key.quota,
    remainingUses: key.remainingUses,
    pinnedData: key.pinnedData,
    dateCreated: key.dateCreated,
    lastUpdated: key.lastUpdated,
    lastUsed: key.lastUsed,
    displayFields: {
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
  connectKey: Pick<KeyData, 'description' | 'quota'>,
): Values {
  return {
    description: connectKey.description,
    quota: connectKey.quota,
  }
}

export function transformUpForm(
  values: Values,
): Pick<ConnectKey, 'description' | 'quota'> {
  return {
    description: values.description,
    quota: values.quota,
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
  quota: '',
}

export type Values = typeof defaultValues

export function getFields(
  quotas: Quota[] | undefined,
): ConfigFields<typeof defaultValues, never> {
  return {
    description: {
      type: 'text',
      title: 'Description',
      placeholder: 'Description',
      validation: {
        required: 'required',
      },
    },
    quota: {
      type: 'select',
      title: 'Quota',
      options: (quotas || []).map((q) => ({
        label: q.key,
        value: q.key,
      })),
      validation: {
        required: 'required',
      },
    },
  }
}
