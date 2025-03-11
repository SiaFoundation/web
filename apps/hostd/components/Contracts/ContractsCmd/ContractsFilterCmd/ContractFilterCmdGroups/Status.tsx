import {
  ClientFilterItem,
  ServerFilterItem,
} from '@siafoundation/design-system'
import { CommandGroup, CommandItemSearch } from '../../../../CmdRoot/Item'
import { Page } from '../../../../CmdRoot/types'
import { ContractData } from '../../../../../contexts/contracts/types'

export const contractsFilterStatusPage = {
  namespace: 'contracts/filterStatus',
  label: 'Contracts filter by status',
}

const options: ClientFilterItem<ContractData>[] = [
  {
    id: 'filterStatusActive',
    value: 'active',
    label: 'Contract is active',
    fn: (c) => c.status === 'active',
  },
  {
    id: 'filterStatusSuccessful',
    value: 'successful',
    label: 'Contract was successful',
    fn: (c) => c.status === 'successful',
  },
  {
    id: 'filterStatusPending',
    value: 'pending',
    label: 'Contract is pending',
    fn: (c) => c.status === 'pending',
  },
  {
    id: 'filterStatusRejected',
    value: 'rejected',
    label: 'Contract was rejected',
    fn: (c) => c.status === 'rejected',
  },
  {
    id: 'filterStatusFailed',
    value: 'failed',
    label: 'Contract has failed',
    fn: (c) => c.status === 'failed',
  },
]

export function StatusCmdGroup({
  select,
  currentPage,
}: {
  currentPage: Page
  select: (filter: ServerFilterItem) => void
}) {
  return (
    <CommandGroup
      currentPage={currentPage}
      commandPage={contractsFilterStatusPage}
    >
      {options.map((o) => (
        <CommandItemSearch
          key={o.id + o.value}
          currentPage={currentPage}
          commandPage={contractsFilterStatusPage}
          onSelect={() => {
            select(o)
          }}
        >
          {o.label}
        </CommandItemSearch>
      ))}
    </CommandGroup>
  )
}
