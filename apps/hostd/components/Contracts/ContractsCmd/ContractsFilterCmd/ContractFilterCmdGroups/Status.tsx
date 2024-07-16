import type { ServerFilterItem } from '@siafoundation/design-system'
import { CommandGroup, CommandItemSearch } from '../../../../CmdRoot/Item'
import type { Page } from '../../../../CmdRoot/types'

export const contractsFilterStatusPage = {
  namespace: 'contracts/filterStatus',
  label: 'Contracts filter by status',
}

const options = [
  {
    id: 'filterStatusActive',
    value: 'active',
    label: 'Contract is active',
  },
  {
    id: 'filterStatusSuccessful',
    value: 'successful',
    label: 'Contract was successful',
  },
  {
    id: 'filterStatusPending',
    value: 'pending',
    label: 'Contract is pending',
  },
  {
    id: 'filterStatusRejected',
    value: 'rejected',
    label: 'Contract was rejected',
  },
  {
    id: 'filterStatusFailed',
    value: 'failed',
    label: 'Contract has failed',
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
