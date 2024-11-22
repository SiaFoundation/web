import {
  triggerErrorToast,
  triggerToast,
  truncate,
} from '@siafoundation/design-system'
import { useHostsBlocklistUpdate } from '@siafoundation/renterd-react'
import { pluralize } from '@siafoundation/units'
import { useCallback } from 'react'

export function useBlocklistUpdate() {
  const blocklistUpdate = useHostsBlocklistUpdate()

  return useCallback(
    (add: string[], remove: string[]) => {
      const func = async (): Promise<boolean> => {
        const response = await blocklistUpdate.put({
          payload: {
            add,
            remove,
          },
        })
        if (response.error) {
          triggerErrorToast({
            title: 'Error updating blocklist',
            body: response.error,
          })
          return false
        } else {
          if (add.length) {
            triggerToast({
              title: 'Blocklist updated',
              body:
                add.length === 1
                  ? `Host ${truncate(add[0], 20)} added to blocklist.`
                  : `Added ${pluralize(add.length, 'host')} to the blocklist.`,
            })
          }
          if (remove.length) {
            triggerToast({
              title: 'Blocklist updated',
              body:
                remove.length === 1
                  ? `Host ${truncate(remove[0], 20)} removed from blocklist.`
                  : `Removed ${pluralize(
                      remove.length,
                      'host'
                    )} from the blocklist.`,
            })
          }
          return true
        }
      }
      return func()
    },
    [blocklistUpdate]
  )
}
