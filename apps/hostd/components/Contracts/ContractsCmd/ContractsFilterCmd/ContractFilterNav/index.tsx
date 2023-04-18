import { CommandItemNav } from '../../../../CmdRoot/Item'
import { Page } from '../../../../CmdRoot/types'
import { ContractIdCmdNav } from '../ContractFilterCmdGroups/ContractId'
import { contractsFilterStatusPage } from '../ContractFilterCmdGroups/Status'

export const commandPage = {
  namespace: 'contracts',
  label: 'Contracts',
}

type Props = {
  currentPage: Page
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
      <ContractIdCmdNav
        currentPage={currentPage}
        parentPage={parentPage}
        commandPage={commandPage}
        select={select}
      />
    </>
  )
}
