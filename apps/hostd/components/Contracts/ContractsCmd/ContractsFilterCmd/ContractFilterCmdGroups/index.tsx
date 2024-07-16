import type { ClientFilterItem } from '@siafoundation/design-system'
import type { ContractData } from '../../../../../contexts/contracts/types'
import type { Page } from '../../../../CmdRoot/types'
import { ContractIdCmdGroup } from './ContractId'
import { StatusCmdGroup } from './Status'

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
