import { HookArgsSwr } from '@siafoundation/react-core'
import { ContractSetSettings, useSetting } from '@siafoundation/react-renterd'

export function useContractSetSettings(
  args?: HookArgsSwr<void, ContractSetSettings>
) {
  return useSetting<ContractSetSettings>({
    ...args,
    params: { key: 'contractset' },
  })
}
