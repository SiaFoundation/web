import { CommandItemNav } from '../../../../CmdRoot/Item'
import type { Page } from '../../../../CmdRoot/types'
import { AddressCmdNav } from '../ContractFilterCmdGroups/Address'
import { ContractSetCmdNav } from '../ContractFilterCmdGroups/ContractSet'
import { contractFilterExpiryPage } from '../ContractFilterCmdGroups/Expiry'
import { contractFilterFormationPage } from '../ContractFilterCmdGroups/Formation'
import { PublicKeyCmdNav } from '../ContractFilterCmdGroups/PublicKey'
import { contractFilterRenewPage } from '../ContractFilterCmdGroups/Renew'

export const commandPage = {
  namespace: 'contracts',
  label: 'Contracts',
}

type Props = {
  currentPage?: Page
  parentPage?: Page
  pushPage: (page: Page) => void
  select: () => void
}

export function ContractFilterNav({
  currentPage,
  parentPage,
  pushPage,
  select,
}: Props) {
  return (
    <>
      <AddressCmdNav
        currentPage={currentPage}
        parentPage={parentPage}
        commandPage={commandPage}
        select={select}
      />
      <PublicKeyCmdNav
        currentPage={currentPage}
        parentPage={parentPage}
        commandPage={commandPage}
        select={select}
      />
      <ContractSetCmdNav
        currentPage={currentPage}
        parentPage={parentPage}
        commandPage={commandPage}
        select={select}
      />
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
