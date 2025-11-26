import {
  CommandGroup,
  CommandItemNav,
  CommandItemSearch,
} from '../../../../../CmdRoot/Item'
import { Page } from '../../../../../CmdRoot/types'
import { useDialog } from '../../../../../../contexts/dialog'

export const accountsFilterConnectKeyPage = {
  namespace: 'accounts/filterConnectKey',
  label: 'Accounts filter by connect key',
}

export function ConnectKeyCmdGroup({
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
      commandPage={accountsFilterConnectKeyPage}
    >
      <CommandItemSearch
        currentPage={currentPage}
        commandPage={accountsFilterConnectKeyPage}
        onSelect={() => {
          select()
          openDialog('accountFilterConnectKey')
        }}
      >
        Filter by connect key
      </CommandItemSearch>
    </CommandGroup>
  )
}

export function ConnectKeyCmdNav({
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
        openDialog('accountFilterConnectKey')
      }}
    >
      {accountsFilterConnectKeyPage.label}
    </CommandItemNav>
  )
}
