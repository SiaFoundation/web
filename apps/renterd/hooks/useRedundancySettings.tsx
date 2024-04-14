import { HookArgsSwr } from '@siafoundation/react-core'
import { RedundancySettings } from '@siafoundation/renterd-types'
import { useSetting } from '@siafoundation/renterd-react'

export function useRedundancySettings(
  args?: HookArgsSwr<void, RedundancySettings>
) {
  return useSetting<RedundancySettings>({
    ...args,
    params: { key: 'redundancy' },
  })
}
