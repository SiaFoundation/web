import { ContractFilterCmdGroups } from './HostsFilterCmdGroups'
import { HostsFilterNav } from './HostsFilterNav'
import { Page } from '../../../CmdRoot/types'

export function ContractFilterCmd({
  currentPage,
  parentPage,
  pushPage,
  beforeSelect,
  afterSelect,
}: {
  currentPage: Page
  parentPage?: Page
  beforeSelect?: () => void
  afterSelect?: () => void
  pushPage: (page: Page) => void
}) {
  return (
    <>
      <HostsFilterNav
        parentPage={parentPage}
        currentPage={currentPage}
        pushPage={pushPage}
      />
      <ContractFilterCmdGroups
        currentPage={currentPage}
        beforeSelect={beforeSelect}
        afterSelect={afterSelect}
        pushPage={pushPage}
      />
    </>
  )
}
