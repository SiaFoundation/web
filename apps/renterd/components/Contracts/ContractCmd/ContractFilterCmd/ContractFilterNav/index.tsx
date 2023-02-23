import { CommandItemNav } from '../../../../CmdRoot/Item'
import { contractFilterExpiryPage } from '../ContractFilterCmdGroups/Expiry'
import { contractFilterFormationPage } from '../ContractFilterCmdGroups/Formation'
import { contractFilterRenewPage } from '../ContractFilterCmdGroups/Renew'
import { Page } from '../../../../CmdRoot/types'

export const commandPage = {
  namespace: 'contracts',
  label: 'Contracts',
}

type Props = {
  currentPage: Page
  parentPage?: Page
  pushPage: (page: Page) => void
}

export function ContractFilterNav({
  currentPage,
  parentPage,
  pushPage,
}: Props) {
  return (
    <>
      <CommandItemNav
        currentPage={currentPage}
        parentPage={parentPage}
        commandPage={commandPage}
        onSelect={() => {
          pushPage(contractFilterFormationPage)
        }}
      >
        {contractFilterFormationPage.label}
      </CommandItemNav>
      <CommandItemNav
        currentPage={currentPage}
        parentPage={parentPage}
        commandPage={commandPage}
        onSelect={() => {
          pushPage(contractFilterExpiryPage)
        }}
      >
        {contractFilterExpiryPage.label}
      </CommandItemNav>
      <CommandItemNav
        currentPage={currentPage}
        parentPage={parentPage}
        commandPage={commandPage}
        onSelect={() => {
          pushPage(contractFilterRenewPage)
        }}
      >
        {contractFilterRenewPage.label}
      </CommandItemNav>
    </>
  )
}
