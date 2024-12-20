import { MultiSelectionMenu } from '@siafoundation/design-system'
import { useContracts } from '../../../contexts/contracts'
import { ContractsBulkDelete } from './ContractsBulkDelete'
import { ContractsAddAllowlist } from './ContractsAddAllowlist'
import { ContractsRemoveAllowlist } from './ContractsRemoveAllowlist'
import { ContractsRescanHosts } from './ContractsRescanHosts'

export function ContractsBulkMenu() {
  const { multiSelect } = useContracts()

  return (
    <MultiSelectionMenu multiSelect={multiSelect} entityWord="contract">
      <ContractsAddAllowlist />
      <ContractsRemoveAllowlist />
      <ContractsRescanHosts />
      <ContractsBulkDelete />
    </MultiSelectionMenu>
  )
}
