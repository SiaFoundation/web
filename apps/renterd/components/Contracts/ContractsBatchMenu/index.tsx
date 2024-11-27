import { MultiSelectionMenu } from '@siafoundation/design-system'
import { useContracts } from '../../../contexts/contracts'
import { ContractsBatchDelete } from './ContractsBatchDelete'

export function ContractsBatchMenu() {
  const { multiSelect } = useContracts()

  return (
    <MultiSelectionMenu multiSelect={multiSelect} entityWord="contract">
      <ContractsBatchDelete />
    </MultiSelectionMenu>
  )
}
