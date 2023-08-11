import { ServerFilterItem } from '@siafoundation/design-system'
import { CommandGroup, CommandItemSearch } from '../../../../CmdRoot/Item'
import { Page } from '../../../../CmdRoot/types'

export const hostsFilterUsablePage = {
  namespace: 'hosts/filterUsable',
  label: 'Hosts filter by usable',
}

export const hostsFilterByUsable = {
  id: 'usabilityMode',
  value: 'usable',
  label: 'usable',
}
export const hostsFilterByUnusable = {
  id: 'usabilityMode',
  value: 'unusable',
  label: 'unusable',
}

const options = [hostsFilterByUsable, hostsFilterByUnusable]

export function UsableCmdGroup({
  select,
  currentPage,
}: {
  currentPage: Page
  select: (filter: ServerFilterItem) => void
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
          {o.label}
        </CommandItemSearch>
      ))}
    </CommandGroup>
  )
}
