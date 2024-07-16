import type { ServerFilterItem } from '@siafoundation/design-system'
import { useApp } from '../../../../../contexts/app'
import { CommandItemNav } from '../../../../CmdRoot/Item'
import type { Page } from '../../../../CmdRoot/types'
import { AddressCmdNav } from '../HostsFilterCmdGroups/Address'
import { hostsFilterAllowBlockPage } from '../HostsFilterCmdGroups/AllowBlock'
import { hostsFilterContractsPage } from '../HostsFilterCmdGroups/Contracts'
import { PublicKeyCmdNav } from '../HostsFilterCmdGroups/PublicKey'
import { hostsFilterUsablePage } from '../HostsFilterCmdGroups/Usable'

export const commandPage = {
  namespace: 'hosts',
  label: 'Hosts',
}

type Props = {
  currentPage?: Page
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
  const { autopilot } = useApp()
  return (
    <>
      {autopilot.status === 'on' && (
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
      )}
      <PublicKeyCmdNav
        currentPage={currentPage}
        parentPage={parentPage}
        commandPage={commandPage}
        select={select}
      />
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
          pushPage(hostsFilterContractsPage)
        }}
      >
        {hostsFilterContractsPage.label}
      </CommandItemNav>
      <CommandItemNav
        currentPage={currentPage}
        parentPage={parentPage}
        commandPage={commandPage}
        onSelect={() => {
          pushPage(hostsFilterAllowBlockPage)
        }}
      >
        {hostsFilterAllowBlockPage.label}
      </CommandItemNav>
    </>
  )
}
