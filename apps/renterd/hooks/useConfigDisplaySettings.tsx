import { HookArgsSwr } from '@siafoundation/react-core'
import { useSetting } from '@siafoundation/react-renterd'

export const configDisplaySettingsKey = 'v0-config-display-options'

export type ConfigDisplaySettings = {
  includeRedundancyMaxStoragePrice: boolean
  includeRedundancyMaxUploadPrice: boolean
}

export function useConfigDisplaySettings(
  args?: HookArgsSwr<void, ConfigDisplaySettings>
) {
  return useSetting<ConfigDisplaySettings>({
    ...args,
    params: { key: configDisplaySettingsKey },
  })
}
