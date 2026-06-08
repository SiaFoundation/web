import {
  CommandGroup,
  CommandItemNav,
  CommandItemSearch,
} from '../../../../../CmdRoot/Item'
import { Page } from '../../../../../CmdRoot/types'
import { useDialog } from '../../../../../../contexts/dialog'

export const contractsFilterContractIDPage = {
  namespace: 'contracts/filterContractID',
  label: 'Contracts filter by contract ID',
}

export function ContractIDCmdGroup({
  select,
  currentPage,
}: {
  currentPage: Page
  select: () => void
}) {
  const { openDialog } = useDialog()
  return (
    <CommandGroup
      currentPage={currentPage}
      commandPage={contractsFilterContractIDPage}
    >
      <CommandItemSearch
        currentPage={currentPage}
        commandPage={contractsFilterContractIDPage}
        onSelect={() => {
          select()
          openDialog('contractsFilterContractID')
        }}
      >
        Filter by contract ID
      </CommandItemSearch>
    </CommandGroup>
  )
}

export function ContractIDCmdNav({
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
        openDialog('contractsFilterContractID')
      }}
    >
      {contractsFilterContractIDPage.label}
    </CommandItemNav>
  )
}
