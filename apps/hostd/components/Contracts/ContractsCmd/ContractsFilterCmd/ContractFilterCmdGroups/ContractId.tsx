import { useDialog } from '../../../../../contexts/dialog'
import { filterContractId } from '../../../../../dialogs/ContractsFilterContractIdDialog'
import {
  CommandGroup,
  CommandItemNav,
  CommandItemSearch,
} from '../../../../CmdRoot/Item'
import type { Page } from '../../../../CmdRoot/types'

export const contractsFilterContractIdPage = {
  namespace: 'contracts/filterAddress',
  label: 'Contracts filter by ID',
}

export function ContractIdCmdGroup({
  select,
  currentPage,
}: {
  currentPage: Page
  select: () => void
}) {
  const { openDialog } = useDialog()
  const filter = filterContractId('')
  return (
    <CommandGroup
      currentPage={currentPage}
      commandPage={contractsFilterContractIdPage}
    >
      <CommandItemSearch
        currentPage={currentPage}
        commandPage={contractsFilterContractIdPage}
        onSelect={() => {
          select()
          openDialog('contractsFilterContractId')
        }}
      >
        {filter.label}
      </CommandItemSearch>
    </CommandGroup>
  )
}

export function ContractIdCmdNav({
  select,
  currentPage,
  parentPage,
  commandPage,
}: {
  currentPage: Page
  parentPage: Page
  commandPage: Page
  select: () => void
}) {
  const { openDialog } = useDialog()
  return (
    <CommandItemNav
      currentPage={currentPage}
      parentPage={parentPage}
      commandPage={commandPage}
      onSelect={() => {
        select()
        openDialog('contractsFilterContractId')
      }}
    >
      {contractsFilterContractIdPage.label}
    </CommandItemNav>
  )
}
