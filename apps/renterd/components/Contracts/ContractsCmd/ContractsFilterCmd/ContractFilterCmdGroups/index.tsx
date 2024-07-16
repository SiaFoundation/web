import type { ClientFilterItem } from '@siafoundation/design-system'
import type { ContractData } from '../../../../../contexts/contracts/types'
import type { Page } from '../../../../CmdRoot/types'
import { AddressCmdGroup } from './Address'
import { ContractSetCmdGroup } from './ContractSet'
import { ExpiryCmdGroup } from './Expiry'
import { FormationCmdGroup } from './Formation'
import { PublicKeyCmdGroup } from './PublicKey'
import { RenewCmdGroup } from './Renew'

type Props = {
  currentPage?: Page
  select: (filter?: ClientFilterItem<ContractData>) => void
}

export function ContractFilterCmdGroups({ currentPage, select }: Props) {
  return (
    <>
      <AddressCmdGroup currentPage={currentPage} select={select} />
      <PublicKeyCmdGroup currentPage={currentPage} select={select} />
      <ContractSetCmdGroup currentPage={currentPage} select={select} />
      <ExpiryCmdGroup currentPage={currentPage} select={select} />
      <FormationCmdGroup currentPage={currentPage} select={select} />
      <RenewCmdGroup currentPage={currentPage} select={select} />
    </>
  )
}
