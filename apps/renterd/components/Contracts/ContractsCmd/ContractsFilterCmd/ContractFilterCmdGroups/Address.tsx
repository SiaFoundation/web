import { useDialog } from '../../../../../contexts/dialog'
import {
  CommandGroup,
  CommandItemNav,
  CommandItemSearch,
} from '../../../../CmdRoot/Item'
import type { Page } from '../../../../CmdRoot/types'
import { addressContainsFilter } from '../../../ContractsFilterAddressDialog'

export const contractsFilterAddressPage = {
  namespace: 'contracts/filterAddress',
  label: 'Contracts filter by address',
}

export function AddressCmdGroup({
  select,
  currentPage,
}: {
  currentPage?: Page
  select: () => void
}) {
  const { openDialog } = useDialog()
  const filter = addressContainsFilter('')
  return (
    <CommandGroup
      currentPage={currentPage}
      commandPage={contractsFilterAddressPage}
    >
      <CommandItemSearch
        currentPage={currentPage}
        commandPage={contractsFilterAddressPage}
        onSelect={() => {
          select()
          openDialog('contractsFilterAddress')
        }}
      >
        {filter.label}
      </CommandItemSearch>
    </CommandGroup>
  )
}

export function AddressCmdNav({
  select,
  currentPage,
  parentPage,
  commandPage,
}: {
  currentPage?: Page
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
        openDialog('contractsFilterAddress')
      }}
    >
      {contractsFilterAddressPage.label}
    </CommandItemNav>
  )
}
