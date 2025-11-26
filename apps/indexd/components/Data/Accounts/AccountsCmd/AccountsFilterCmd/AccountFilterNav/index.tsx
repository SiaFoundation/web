import { CommandItemNav } from '../../../../../CmdRoot/Item'
import { Page } from '../../../../../CmdRoot/types'
import { accountsFilterConnectKeyPage } from '../AccountFilterCmdGroups/ConnectKey'
import { AccountFilter } from '../../../types'

export const commandPage = {
  namespace: 'accounts',
  label: 'Accounts',
}

type Props = {
  currentPage: Page
  parentPage?: Page
  pushPage: (page: Page) => void
  select: (filter: AccountFilter) => void
}

export function AccountFilterNav({ currentPage, parentPage, pushPage }: Props) {
  return (
    <>
      <CommandItemNav
        currentPage={currentPage}
        parentPage={parentPage}
        commandPage={commandPage}
        onSelect={() => {
          pushPage(accountsFilterConnectKeyPage)
        }}
      >
        {accountsFilterConnectKeyPage.label}
      </CommandItemNav>
    </>
  )
}
