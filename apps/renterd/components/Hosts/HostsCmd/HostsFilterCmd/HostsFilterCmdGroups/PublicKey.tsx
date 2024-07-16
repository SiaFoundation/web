import { useDialog } from '../../../../../contexts/dialog'
import {
  CommandGroup,
  CommandItemNav,
  CommandItemSearch,
} from '../../../../CmdRoot/Item'
import type { Page } from '../../../../CmdRoot/types'
import { filterPublicKeyEquals } from '../../../HostsFilterPublicKeyDialog'

export const hostsFilterPublicKeyPage = {
  namespace: 'hosts/filterPublicKey',
  label: 'Hosts filter by public key',
}

export function PublicKeyCmdGroup({
  select,
  currentPage,
}: {
  currentPage?: Page
  select: () => void
}) {
  const { openDialog } = useDialog()
  const filter = filterPublicKeyEquals('')
  return (
    <CommandGroup
      currentPage={currentPage}
      commandPage={hostsFilterPublicKeyPage}
    >
      <CommandItemSearch
        currentPage={currentPage}
        commandPage={hostsFilterPublicKeyPage}
        onSelect={() => {
          select()
          openDialog('hostsFilterPublicKey')
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
        openDialog('hostsFilterPublicKey')
      }}
    >
      {hostsFilterPublicKeyPage.label}
    </CommandItemNav>
  )
}
