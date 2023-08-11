import { ServerFilterItem } from '@siafoundation/design-system'
import { CommandGroup, CommandItemSearch } from '../../../../CmdRoot/Item'
import { Page } from '../../../../CmdRoot/types'

export const hostsFilterContractsPage = {
  namespace: 'hosts/filterActiveContracts',
  label: 'Hosts filter by contracts',
}

export const hostsFilterByHasActiveContracts = {
  id: 'hasActiveContracts',
  bool: true,
  label: 'has active contracts',
}

export function ContractsCmdGroup({
  select,
  currentPage,
}: {
  currentPage: Page
  select: (filter: ServerFilterItem) => void
}) {
  return (
    <CommandGroup
      currentPage={currentPage}
      commandPage={hostsFilterContractsPage}
    >
      <CommandItemSearch
        currentPage={currentPage}
        commandPage={hostsFilterContractsPage}
        onSelect={() => {
          select(hostsFilterByHasActiveContracts)
        }}
      >
        {hostsFilterByHasActiveContracts.label}
      </CommandItemSearch>
    </CommandGroup>
  )
}
