import {
  CommandGroup,
  CommandItemNav,
  CommandItemSearch,
} from '../../../../CmdRoot/Item'
import { Page } from '../../../../CmdRoot/types'
import { useDialog } from '../../../../../contexts/dialog'
import { publicKeyContainsFilter } from '../../../ContractsFilterPublicKeyDialog'

export const contractsFilterPublicKeyPage = {
  namespace: 'contracts/filterPublicKey',
  label: 'Contracts filter by public key',
}

export function PublicKeyCmdGroup({
  select,
  currentPage,
}: {
  currentPage: Page
  select: () => void
}) {
  const filter = publicKeyContainsFilter('')
  const { openDialog } = useDialog()
  return (
    <CommandGroup
      currentPage={currentPage}
      commandPage={contractsFilterPublicKeyPage}
    >
      <CommandItemSearch
        currentPage={currentPage}
        commandPage={contractsFilterPublicKeyPage}
        onSelect={() => {
          select()
          openDialog('contractsFilterPublicKey')
        }}
      >
        {filter.label}
      </CommandItemSearch>
    </CommandGroup>
  )
}

export function PublicKeyCmdNav({
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
        openDialog('contractsFilterPublicKey')
      }}
    >
      {contractsFilterPublicKeyPage.label}
    </CommandItemNav>
  )
}
