import { MultiSelectionMenu } from '@siafoundation/design-system'
import { useContracts } from '../../../contexts/contracts'
import { ContractsBulkIntegrityCheck } from './ContractsBulkIntegrityCheck'

export function ContractsBulkMenu() {
  const { multiSelect } = useContracts()

  return (
    <MultiSelectionMenu multiSelect={multiSelect} entityWord="contract">
      <ContractsBulkIntegrityCheck />
    </MultiSelectionMenu>
  )
}
