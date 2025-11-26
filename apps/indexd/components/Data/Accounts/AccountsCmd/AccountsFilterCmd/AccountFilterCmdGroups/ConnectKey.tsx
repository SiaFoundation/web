import { CommandGroup, CommandItemSearch } from '../../../../../CmdRoot/Item'
import { Page } from '../../../../../CmdRoot/types'
import { AccountFilterConnectKey } from '../../../types'
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
  select: (filter: AccountFilterConnectKey) => void
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
          openDialog('accountFilterConnectKey')
        }}
      >
        Filter by connect key
      </CommandItemSearch>
    </CommandGroup>
  )
}
