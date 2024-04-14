import { HookArgsSwr } from '@siafoundation/react-core'
import { ContractSetSettings, useSetting } from '@siafoundation/renterd-react'

export function useContractSetSettings(
  args?: HookArgsSwr<void, ContractSetSettings>
) {
  return useSetting<ContractSetSettings>({
    ...args,
    params: { key: 'contractset' },
  })
}
