import { FilterItem } from '../../../../../hooks/useServerFilters'
import { CommandGroup, CommandItemSearch } from '../../../../CmdRoot/Item'
import { Page } from '../../../../CmdRoot/types'

export const contractFilterAllowBlockPage = {
  namespace: 'contracts/filterAllowBlock',
  label: 'Hosts filter by allow/block status',
}

const options = [
  {
    id: 'filterMode',
    value: 'allowed',
    label: 'Host allowed',
  },
  {
    id: 'filterMode',
    value: 'blocked',
    label: 'Host blocked',
  },
]

export function AllowBlockCmdGroup({
  select,
  currentPage,
}: {
  currentPage: Page
  select: (filter: FilterItem) => void
}) {
  return (
    <CommandGroup
      currentPage={currentPage}
      commandPage={contractFilterAllowBlockPage}
    >
      {options.map((o) => (
        <CommandItemSearch
          key={o.id + o.value}
          currentPage={currentPage}
          commandPage={contractFilterAllowBlockPage}
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
