import { HookArgsSwr } from '@siafoundation/react-core'
import { UploadPackingSettings, useSetting } from '@siafoundation/react-renterd'

export function useUploadPackingSettings(
  args?: HookArgsSwr<void, UploadPackingSettings>
) {
  return useSetting<UploadPackingSettings>({
    ...args,
    params: { key: 'uploadpacking' },
  })
}
