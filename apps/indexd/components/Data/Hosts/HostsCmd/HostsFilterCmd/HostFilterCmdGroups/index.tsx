import { Page } from '../../../../../CmdRoot/types'
import { UsableCmdGroup } from './Usable'
import { BlockedCmdGroup } from './Blocked'
import { ActiveContractsCmdGroup } from './ActiveContracts'
import { HostFilter } from '../../../types'

type Props = {
  currentPage: Page
  select: (filter: HostFilter) => void
}

export function HostFilterCmdGroups({ currentPage, select }: Props) {
  return (
    <>
      <UsableCmdGroup currentPage={currentPage} select={select} />
      <BlockedCmdGroup currentPage={currentPage} select={select} />
      <ActiveContractsCmdGroup currentPage={currentPage} select={select} />
    </>
  )
}
