import { HookArgsSwr } from '@siafoundation/react-core'
import { S3AuthenticationSettings } from '@siafoundation/renterd-types'
import { useSetting } from '@siafoundation/renterd-react'

export function useS3AuthenticationSettings(
  args?: HookArgsSwr<void, S3AuthenticationSettings>
) {
  return useSetting<S3AuthenticationSettings>({
    ...args,
    params: { key: 's3authentication' },
  })
}
