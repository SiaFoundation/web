import { MultiSelectionMenu } from '@siafoundation/design-system'
import { useContracts } from '../../../contexts/contracts'
import { ContractsBulkDelete } from './ContractsBulkDelete'
import { ContractsAddBlocklist } from './ContractsAddBlocklist'
import { ContractsAddAllowlist } from './ContractsAddAllowlist'
import { ContractsRemoveBlocklist } from './ContractsRemoveBlocklist'
import { ContractsRemoveAllowlist } from './ContractsRemoveAllowlist'

export function ContractsBulkMenu() {
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
      <ContractsBulkDelete />
    </MultiSelectionMenu>
  )
}
