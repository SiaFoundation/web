import { CommandGroup, CommandItemSearch } from '../../../../../CmdRoot/Item'
import { Page } from '../../../../../CmdRoot/types'
import { HostFilterActiveContracts, getFilterLabel } from '../../../types'

export const hostsFilterActiveContractsPage = {
  namespace: 'hosts/filterActiveContracts',
  label: 'Hosts filter by active contracts',
}

const options: HostFilterActiveContracts[] = [
  {
    id: 'activecontracts',
    value: true,
  },
  {
    id: 'activecontracts',
    value: false,
  },
]

export function ActiveContractsCmdGroup({
  select,
  currentPage,
}: {
  currentPage: Page
  select: (filter: HostFilterActiveContracts) => void
}) {
  return (
    <CommandGroup
      currentPage={currentPage}
      commandPage={hostsFilterActiveContractsPage}
    >
      {options.map((o) => (
        <CommandItemSearch
          key={o.id + o.value}
          currentPage={currentPage}
          commandPage={hostsFilterActiveContractsPage}
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
