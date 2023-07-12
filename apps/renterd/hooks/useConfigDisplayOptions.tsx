import { HookArgsSwr } from '@siafoundation/react-core'
import { useSetting } from '@siafoundation/react-renterd'

export const configDisplayOptionsKey = 'v0-config-display-options'

export type ConfigDisplayOptions = {
  includeRedundancyMaxStoragePrice: boolean
  includeRedundancyMaxUploadPrice: boolean
}

export function useConfigDisplayOptions(
  args?: HookArgsSwr<void, ConfigDisplayOptions>
) {
  return useSetting<ConfigDisplayOptions>({
    ...args,
    params: { key: configDisplayOptionsKey },
  })
}
