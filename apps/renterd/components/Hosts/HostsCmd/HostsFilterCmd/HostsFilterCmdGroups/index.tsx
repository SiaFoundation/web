import { AddressCmdGroup } from './Address'
import { Page } from '../../../../CmdRoot/types'
import { AllowBlockCmdGroup } from './AllowBlock'
import { ServerFilterItem } from '@siafoundation/design-system'

type Props = {
  currentPage: Page
  pushPage: (page: Page) => void
  select: (filter?: ServerFilterItem) => void
}

export function ContractFilterCmdGroups({ currentPage, select }: Props) {
  return (
    <>
      <AddressCmdGroup currentPage={currentPage} select={select} />
      <AllowBlockCmdGroup currentPage={currentPage} select={select} />
    </>
  )
}
