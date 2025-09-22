import { CommandItemNav } from '../../../../../CmdRoot/Item'
import { Page } from '../../../../../CmdRoot/types'
import { hostsFilterUsablePage } from '../HostFilterCmdGroups/Usable'
import { hostsFilterBlockedPage } from '../HostFilterCmdGroups/Blocked'
import { hostsFilterActiveContractsPage } from '../HostFilterCmdGroups/ActiveContracts'
import { HostFilter } from '../../../types'

export const commandPage = {
  namespace: 'hosts',
  label: 'Hosts',
}

type Props = {
  currentPage: Page
  parentPage?: Page
  pushPage: (page: Page) => void
  select: (filter: HostFilter) => void
}

export function HostFilterNav({ currentPage, parentPage, pushPage }: Props) {
  return (
    <>
      <CommandItemNav
        currentPage={currentPage}
        parentPage={parentPage}
        commandPage={commandPage}
        onSelect={() => {
          pushPage(hostsFilterUsablePage)
        }}
      >
        {hostsFilterUsablePage.label}
      </CommandItemNav>
      <CommandItemNav
        currentPage={currentPage}
        parentPage={parentPage}
        commandPage={commandPage}
        onSelect={() => {
          pushPage(hostsFilterBlockedPage)
        }}
      >
        {hostsFilterBlockedPage.label}
      </CommandItemNav>
      <CommandItemNav
        currentPage={currentPage}
        parentPage={parentPage}
        commandPage={commandPage}
        onSelect={() => {
          pushPage(hostsFilterActiveContractsPage)
        }}
      >
        {hostsFilterActiveContractsPage.label}
      </CommandItemNav>
    </>
  )
}
