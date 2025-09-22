import { CommandGroup, CommandItemSearch } from '../../../../../CmdRoot/Item'
import { Page } from '../../../../../CmdRoot/types'
import { HostFilterUsable, getFilterLabel } from '../../../types'

export const hostsFilterUsablePage = {
  namespace: 'hosts/filterUsable',
  label: 'Hosts filter by usable',
}

const options: HostFilterUsable[] = [
  {
    id: 'usable',
    value: true,
  },
  {
    id: 'usable',
    value: false,
  },
]

export function UsableCmdGroup({
  select,
  currentPage,
}: {
  currentPage: Page
  select: (filter: HostFilterUsable) => void
}) {
  return (
    <CommandGroup currentPage={currentPage} commandPage={hostsFilterUsablePage}>
      {options.map((o) => (
        <CommandItemSearch
          key={o.id + o.value}
          currentPage={currentPage}
          commandPage={hostsFilterUsablePage}
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
