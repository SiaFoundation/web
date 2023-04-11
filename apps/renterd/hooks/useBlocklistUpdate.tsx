import {
  triggerErrorToast,
  triggerToast,
  truncate,
} from '@siafoundation/design-system'
import { useHostsBlocklistUpdate } from '@siafoundation/react-renterd'
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
          triggerErrorToast(response.error)
          return false
        } else {
          if (add.length) {
            triggerToast(
              `${add.map((i) => truncate(i, 20)).join(', ')} added to blocklist`
            )
          }
          if (remove.length) {
            triggerToast(
              `${remove
                .map((i) => truncate(i, 20))
                .join(', ')} removed from blocklist`
            )
          }
          return true
        }
      }
      return func()
    },
    [blocklistUpdate]
  )
}
