import { BlockedObject } from '@siafoundation/indexd-types'
import { BlockedObjectData } from './types'

export function transformBlockedObject(
  object: BlockedObject,
): BlockedObjectData {
  return {
    id: object.key,
    key: object.key,
    reason: object.reason,
    createdAt: object.createdAt,
    displayFields: {
      createdAt: Intl.DateTimeFormat('en-US', {
        dateStyle: 'short',
        timeStyle: 'short',
      }).format(new Date(object.createdAt)),
    },
  }
}
