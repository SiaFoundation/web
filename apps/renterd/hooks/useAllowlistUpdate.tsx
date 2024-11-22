import {
  triggerErrorToast,
  triggerSuccessToast,
  truncate,
} from '@siafoundation/design-system'
import { useHostsAllowlistUpdate } from '@siafoundation/renterd-react'
import { pluralize } from '@siafoundation/units'
import { useCallback } from 'react'

export function useAllowlistUpdate() {
  const allowlistUpdate = useHostsAllowlistUpdate()

  return useCallback(
    (add: string[], remove: string[]) => {
      const func = async (): Promise<boolean> => {
        const response = await allowlistUpdate.put({
          payload: {
            add,
            remove,
          },
        })
        if (response.error) {
          triggerErrorToast({
            title: 'Error updating allowlist',
            body: response.error,
          })
          return false
        } else {
          if (add.length) {
            triggerSuccessToast({
              title: 'Allowlist updated',
              body:
                add.length === 1
                  ? `Host ${truncate(add[0], 20)} added to allowlist.`
                  : `Added ${pluralize(add.length, 'host')} to the allowlist.`,
            })
          }
          if (remove.length) {
            triggerSuccessToast({
              title: 'Allowlist updated',
              body:
                remove.length === 1
                  ? `Host ${truncate(remove[0], 20)} removed from allowlist.`
                  : `Removed ${pluralize(
                      remove.length,
                      'host'
                    )} from the allowlist.`,
            })
          }
          return true
        }
      }
      return func()
    },
    [allowlistUpdate]
  )
}
