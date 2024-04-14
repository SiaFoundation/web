import { HookArgsSwr } from '@siafoundation/react-core'
import { GougingSettings, useSetting } from '@siafoundation/renterd-react'

export function useGougingSettings(args?: HookArgsSwr<void, GougingSettings>) {
  return useSetting<GougingSettings>({
    ...args,
    params: { key: 'gouging' },
  })
}
