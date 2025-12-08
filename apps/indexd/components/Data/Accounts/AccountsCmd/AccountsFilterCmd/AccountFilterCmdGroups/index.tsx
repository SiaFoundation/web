import { Page } from '../../../../../CmdRoot/types'
import { ConnectKeyCmdGroup } from './ConnectKey'

type Props = {
  currentPage: Page
  select: () => void
}

export function AccountFilterCmdGroups({ select, currentPage }: Props) {
  return (
    <ConnectKeyCmdGroup currentPage={currentPage} select={select} />
  )
}
