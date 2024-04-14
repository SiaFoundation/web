import { HookArgsSwr } from '@siafoundation/react-core'
import { UploadPackingSettings, useSetting } from '@siafoundation/renterd-react'

export function useUploadPackingSettings(
  args?: HookArgsSwr<void, UploadPackingSettings>
) {
  return useSetting<UploadPackingSettings>({
    ...args,
    params: { key: 'uploadpacking' },
  })
}
