import { CommandGroup, CommandItemSearch } from '../../../../../CmdRoot/Item'
import { Page } from '../../../../../CmdRoot/types'
import { HostFilterBlocked, getFilterLabel } from '../../../types'

export const hostsFilterBlockedPage = {
  namespace: 'hosts/filterBlocked',
  label: 'Hosts filter by blocked',
}

const options: HostFilterBlocked[] = [
  {
    id: 'blocked',
    value: true,
  },
  {
    id: 'blocked',
    value: false,
  },
]

export function BlockedCmdGroup({
  select,
  currentPage,
}: {
  currentPage: Page
  select: (filter: HostFilterBlocked) => void
}) {
  return (
    <CommandGroup
      currentPage={currentPage}
      commandPage={hostsFilterBlockedPage}
    >
      {options.map((o) => (
        <CommandItemSearch
          key={o.id + o.value}
          currentPage={currentPage}
          commandPage={hostsFilterBlockedPage}
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
