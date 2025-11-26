import { Page } from '../../../../../CmdRoot/types'
import { ConnectKeyCmdGroup } from './ConnectKey'
import { AccountFilter } from '../../../types'

type Props = {
  currentPage: Page
  select: (filter: AccountFilter) => void
}

export function AccountFilterCmdGroups({ select, currentPage }: Props) {
  return (
    <>
      <ConnectKeyCmdGroup currentPage={currentPage} select={select} />
    </>
  )
}
