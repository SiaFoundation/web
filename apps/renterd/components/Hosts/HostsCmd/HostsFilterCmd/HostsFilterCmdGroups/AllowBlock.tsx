import { ServerFilterItem } from '@siafoundation/design-system'
import { CommandGroup, CommandItemSearch } from '../../../../CmdRoot/Item'
import { Page } from '../../../../CmdRoot/types'

export const hostsFilterAllowBlockPage = {
  namespace: 'hosts/filterAllowBlock',
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
  select: (filter: ServerFilterItem) => void
}) {
  return (
    <CommandGroup
      currentPage={currentPage}
      commandPage={hostsFilterAllowBlockPage}
    >
      {options.map((o) => (
        <CommandItemSearch
          key={o.id + o.value}
          currentPage={currentPage}
          commandPage={hostsFilterAllowBlockPage}
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
