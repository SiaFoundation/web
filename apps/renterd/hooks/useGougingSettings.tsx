import { HookArgsSwr } from '@siafoundation/react-core'
import { GougingSettings, useSetting } from '@siafoundation/react-renterd'

export function useGougingSettings(args?: HookArgsSwr<void, GougingSettings>) {
  return useSetting<GougingSettings>({
    ...args,
    params: { key: 'gouging' },
  })
}
