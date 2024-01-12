import { HookArgsSwr } from '@siafoundation/react-core'
import {
  S3AuthenticationSettings,
  useSetting,
} from '@siafoundation/react-renterd'

export function useS3AuthenticationSettings(
  args?: HookArgsSwr<void, S3AuthenticationSettings>
) {
  return useSetting<S3AuthenticationSettings>({
    ...args,
    params: { key: 's3authentication' },
  })
}
