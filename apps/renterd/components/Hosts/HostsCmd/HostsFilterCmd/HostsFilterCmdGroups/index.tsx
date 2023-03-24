import { AddressCmdGroup } from './Address'
import { Page } from '../../../../CmdRoot/types'
import { AllowBlockCmdGroup } from './AllowBlock'
import { ServerFilterItem } from '@siafoundation/design-system'
import { ContractsCmdGroup } from './Contracts'

type Props = {
  currentPage: Page
  pushPage: (page: Page) => void
  select: (filter?: ServerFilterItem) => void
}

export function ContractFilterCmdGroups({ currentPage, select }: Props) {
  return (
    <>
      <ContractsCmdGroup currentPage={currentPage} select={select} />
      <AddressCmdGroup currentPage={currentPage} select={select} />
      <AllowBlockCmdGroup currentPage={currentPage} select={select} />
    </>
  )
}
