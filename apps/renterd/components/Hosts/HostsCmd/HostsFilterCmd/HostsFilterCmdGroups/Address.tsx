import {
  CommandGroup,
  CommandItemNav,
  CommandItemSearch,
} from '../../../../CmdRoot/Item'
import { Page } from '../../../../CmdRoot/types'
import { useDialog } from '../../../../../contexts/dialog'
import { filterAddressContains } from '../../../HostsFilterAddressDialog'

export const hostsFilterAddressPage = {
  namespace: 'hosts/filterAddress',
  label: 'Hosts filter by address',
}

export function AddressCmdGroup({
  select,
  currentPage,
}: {
  currentPage: Page
  select: () => void
}) {
  const { openDialog } = useDialog()
  const filter = filterAddressContains('')
  return (
    <CommandGroup
      currentPage={currentPage}
      commandPage={hostsFilterAddressPage}
    >
      <CommandItemSearch
        currentPage={currentPage}
        commandPage={hostsFilterAddressPage}
        onSelect={() => {
          select()
          openDialog('hostsFilterAddress')
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
        openDialog('hostsFilterAddress')
      }}
    >
      {hostsFilterAddressPage.label}
    </CommandItemNav>
  )
}
