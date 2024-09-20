import {
  CommandGroup,
  CommandItemNav,
  CommandItemSearch,
} from '../../../../CmdRoot/Item'
import { Page } from '../../../../CmdRoot/types'
import { useDialog } from '../../../../../contexts/dialog'
import { contractSetsIncludeFilter } from '../../../ContractsFilterContractSetDialog'

export const contractsFilterContractSetPage = {
  namespace: 'contracts/filterContractSet',
  label: 'Contracts filter by contract set',
}

export function ContractSetCmdGroup({
  select,
  currentPage,
}: {
  currentPage: Page
  select: () => void
}) {
  const filter = contractSetsIncludeFilter('')
  const { openDialog } = useDialog()
  return (
    <CommandGroup
      currentPage={currentPage}
      commandPage={contractsFilterContractSetPage}
    >
      <CommandItemSearch
        currentPage={currentPage}
        commandPage={contractsFilterContractSetPage}
        onSelect={() => {
          select()
          openDialog('contractsFilterContractSet')
        }}
      >
        {filter.label}
      </CommandItemSearch>
    </CommandGroup>
  )
}

export function ContractSetCmdNav({
  select,
  currentPage,
  parentPage,
  commandPage,
}: {
  currentPage: Page
  parentPage?: Page
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
        openDialog('contractsFilterContractSet')
      }}
    >
      {contractsFilterContractSetPage.label}
    </CommandItemNav>
  )
}
