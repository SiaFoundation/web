import { CommandGroup, CommandItemSearch } from '../../../../../CmdRoot/Item'
import { Page } from '../../../../../CmdRoot/types'
import { ContractFilterStatus, getFilterLabel } from '../../../types'

export const contractsFilterStatusPage = {
  namespace: 'contracts/filterStatus',
  label: 'Contracts filter by status',
}

const options: ContractFilterStatus[] = [
  {
    id: 'status',
    value: true,
  },
  {
    id: 'status',
    value: false,
  },
]

export function StatusCmdGroup({
  select,
  currentPage,
}: {
  currentPage: Page
  select: (filter: ContractFilterStatus) => void
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
          {getFilterLabel(o)}
        </CommandItemSearch>
      ))}
    </CommandGroup>
  )
}
