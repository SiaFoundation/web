import { Page } from '../../../../../CmdRoot/types'
import { ConnectKeyCmdNav } from '../AccountFilterCmdGroups/ConnectKey'

export const commandPage = {
  namespace: 'accounts',
  label: 'Accounts',
}

type Props = {
  currentPage: Page
  parentPage?: Page
  pushPage: (page: Page) => void
  select: () => void
}

export function AccountFilterNav({ currentPage, parentPage, select }: Props) {
  return (
    <>
      <ConnectKeyCmdNav
        currentPage={currentPage}
        parentPage={parentPage}
        commandPage={commandPage}
        select={select}
      />
    </>
  )
}
