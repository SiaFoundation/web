import { CommandItemNav } from '../../../../CmdRoot/Item'
import { contractFilterAddressPage } from '../HostsFilterCmdGroups/Address'
import { Page } from '../../../../CmdRoot/types'
import { contractFilterAllowBlockPage } from '../HostsFilterCmdGroups/AllowBlock'

export const commandPage = {
  namespace: 'hosts',
  label: 'Hosts',
}

type Props = {
  currentPage: Page
  parentPage?: Page
  pushPage: (page: Page) => void
}

export function HostsFilterNav({ currentPage, parentPage, pushPage }: Props) {
  return (
    <>
      <CommandItemNav
        currentPage={currentPage}
        parentPage={parentPage}
        commandPage={commandPage}
        onSelect={() => {
          pushPage(contractFilterAddressPage)
        }}
      >
        {contractFilterAddressPage.label}
      </CommandItemNav>
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
