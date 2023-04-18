import { ContractData } from '../../../../../contexts/contracts/types'
import { Page } from '../../../../CmdRoot/types'
import { ClientFilterItem } from '@siafoundation/design-system'
import { StatusCmdGroup } from './Status'
import { ContractIdCmdGroup } from './ContractId'

type Props = {
  currentPage: Page
  select?: (filter?: ClientFilterItem<ContractData>) => void
}

export function ContractFilterCmdGroups({ currentPage, select }: Props) {
  return (
    <>
      <StatusCmdGroup currentPage={currentPage} select={select} />
      <ContractIdCmdGroup currentPage={currentPage} select={select} />
    </>
  )
}
