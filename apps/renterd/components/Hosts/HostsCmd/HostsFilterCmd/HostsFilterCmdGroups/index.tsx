import type { ServerFilterItem } from '@siafoundation/design-system'
import { useApp } from '../../../../../contexts/app'
import type { Page } from '../../../../CmdRoot/types'
import { AddressCmdGroup } from './Address'
import { AllowBlockCmdGroup } from './AllowBlock'
import { ContractsCmdGroup } from './Contracts'
import { PublicKeyCmdGroup } from './PublicKey'
import { UsableCmdGroup } from './Usable'

type Props = {
  currentPage?: Page
  pushPage: (page: Page) => void
  select: (filter?: ServerFilterItem) => void
}

export function ContractFilterCmdGroups({ currentPage, select }: Props) {
  const { autopilot } = useApp()
  return (
    <>
      {autopilot.status === 'on' && (
        <UsableCmdGroup currentPage={currentPage} select={select} />
      )}
      <ContractsCmdGroup currentPage={currentPage} select={select} />
      <AddressCmdGroup currentPage={currentPage} select={select} />
      <PublicKeyCmdGroup currentPage={currentPage} select={select} />
      <AllowBlockCmdGroup currentPage={currentPage} select={select} />
    </>
  )
}
