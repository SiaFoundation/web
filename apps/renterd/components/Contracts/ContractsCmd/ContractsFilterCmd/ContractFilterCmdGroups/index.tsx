import { ExpiryCmdGroup } from './Expiry'
import { FormationCmdGroup } from './Formation'
import { RenewCmdGroup } from './Renew'
import { Page } from '../../../../CmdRoot/types'
import { PublicKeyCmdGroup } from './PublicKey'

type Props = {
  currentPage: Page
  select: () => void
}

export function ContractFilterCmdGroups({ currentPage, select }: Props) {
  return (
    <>
      <PublicKeyCmdGroup currentPage={currentPage} select={select} />
      <ExpiryCmdGroup currentPage={currentPage} select={select} />
      <FormationCmdGroup currentPage={currentPage} select={select} />
      <RenewCmdGroup currentPage={currentPage} select={select} />
    </>
  )
}
