import { CommandItemNav } from '../../../../../CmdRoot/Item'
import { Page } from '../../../../../CmdRoot/types'
import { contractsFilterStatusPage } from '../ContractFilterCmdGroups/Status'
import { PublicKeyCmdNav } from '../ContractFilterCmdGroups/PublicKey'
import { ContractFilter } from '../../../types'

export const commandPage = {
  namespace: 'contracts',
  label: 'Contracts',
}

type Props = {
  currentPage: Page
  parentPage?: Page
  pushPage: (page: Page) => void
  select: (filter?: ContractFilter) => void
}

export function ContractFilterNav({
  currentPage,
  parentPage,
  pushPage,
  select,
}: Props) {
  return (
    <>
      <CommandItemNav
        currentPage={currentPage}
        parentPage={parentPage}
        commandPage={commandPage}
        onSelect={() => {
          pushPage(contractsFilterStatusPage)
        }}
      >
        {contractsFilterStatusPage.label}
      </CommandItemNav>
      <PublicKeyCmdNav
        currentPage={currentPage}
        parentPage={parentPage}
        commandPage={commandPage}
        select={select}
      />
    </>
  )
}
