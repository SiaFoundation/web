import { MultiSelectionMenu } from '@siafoundation/design-system'
import { useContracts } from '../../../contexts/contracts'
import { ContractsBatchDelete } from './ContractsBatchDelete'
import { ContractsAddBlocklist } from './ContractsAddBlocklist'
import { ContractsAddAllowlist } from './ContractsAddAllowlist'
import { ContractsRemoveBlocklist } from './ContractsRemoveBlocklist'
import { ContractsRemoveAllowlist } from './ContractsRemoveAllowlist'

export function ContractsBatchMenu() {
  const { multiSelect } = useContracts()

  return (
    <MultiSelectionMenu multiSelect={multiSelect} entityWord="contract">
      <div className="flex flex-col gap-1">
        <ContractsAddAllowlist />
        <ContractsAddBlocklist />
      </div>
      <div className="flex flex-col gap-1">
        <ContractsRemoveAllowlist />
        <ContractsRemoveBlocklist />
      </div>
      <ContractsBatchDelete />
    </MultiSelectionMenu>
  )
}
