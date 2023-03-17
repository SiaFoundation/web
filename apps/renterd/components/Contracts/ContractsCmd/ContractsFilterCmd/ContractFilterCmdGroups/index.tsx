import { ExpiryCmdGroup } from './Expiry'
import { ContractData } from '../../../../../contexts/contracts/types'
import { FormationCmdGroup } from './Formation'
import { RenewCmdGroup } from './Renew'
import { Page } from '../../../../CmdRoot/types'
import { ClientFilterItem } from '@siafoundation/design-system'
import { AddressCmdGroup } from './Address'
import { PublicKeyCmdGroup } from './PublicKey'

type Props = {
  currentPage: Page
  select?: (filter?: ClientFilterItem<ContractData>) => void
}

export function ContractFilterCmdGroups({ currentPage, select }: Props) {
  return (
    <>
      <AddressCmdGroup currentPage={currentPage} select={select} />
      <PublicKeyCmdGroup currentPage={currentPage} select={select} />
      <ExpiryCmdGroup currentPage={currentPage} select={select} />
      <FormationCmdGroup currentPage={currentPage} select={select} />
      <RenewCmdGroup currentPage={currentPage} select={select} />
    </>
  )
}
