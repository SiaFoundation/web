import {
  triggerErrorToast,
  triggerSuccessToast,
  truncate,
} from '@siafoundation/design-system'
import { useHostsAllowlistUpdate } from '@siafoundation/react-renterd'
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
              body: `${add
                .map((i) => truncate(i, 20))
                .join(', ')} added to allowlist.`,
            })
          }
          if (remove.length) {
            triggerSuccessToast({
              title: 'Allowlist updated',
              body: `${remove
                .map((i) => truncate(i, 20))
                .join(', ')} removed from allowlist.`,
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
