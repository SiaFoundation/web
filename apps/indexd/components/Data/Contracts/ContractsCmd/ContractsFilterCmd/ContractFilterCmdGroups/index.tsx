import { Page } from '../../../../../CmdRoot/types'
import { StatusCmdGroup } from './Status'
import { PublicKeyCmdGroup } from './PublicKey'
import { ContractIDCmdGroup } from './ContractID'
import { ContractFilter } from '../../../types'

type Props = {
  currentPage: Page
  select: (filter?: ContractFilter) => void
}

export function ContractFilterCmdGroups({ currentPage, select }: Props) {
  return (
    <>
      <StatusCmdGroup currentPage={currentPage} select={select} />
      <PublicKeyCmdGroup currentPage={currentPage} select={select} />
      <ContractIDCmdGroup currentPage={currentPage} select={select} />
    </>
  )
}
