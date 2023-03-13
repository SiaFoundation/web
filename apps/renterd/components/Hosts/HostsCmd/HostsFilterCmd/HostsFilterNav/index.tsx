import { CommandItemNav } from '../../../../CmdRoot/Item'
import { AddressCmdNav } from '../HostsFilterCmdGroups/Address'
import { Page } from '../../../../CmdRoot/types'
import { contractFilterAllowBlockPage } from '../HostsFilterCmdGroups/AllowBlock'
import { ServerFilterItem } from '@siafoundation/design-system'

export const commandPage = {
  namespace: 'hosts',
  label: 'Hosts',
}

type Props = {
  currentPage: Page
  parentPage?: Page
  pushPage: (page: Page) => void
  select: (filter?: ServerFilterItem) => void
}

export function HostsFilterNav({
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
      <CommandItemNav
        currentPage={currentPage}
        parentPage={parentPage}
        commandPage={commandPage}
        onSelect={() => {
          pushPage(contractFilterAllowBlockPage)
        }}
      >
        {contractFilterAllowBlockPage.label}
      </CommandItemNav>
    </>
  )
}
