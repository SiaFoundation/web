import { AddressCmdGroup } from './Address'
import { Page } from '../../../../CmdRoot/types'
import { AllowBlockCmdGroup } from './AllowBlock'
import { ServerFilterItem } from '@siafoundation/design-system'
import { ContractsCmdGroup } from './Contracts'
import { UsableCmdGroup } from './Usable'
import { useApp } from '../../../../../contexts/app'
import { PublicKeyCmdGroup } from './PublicKey'

type Props = {
  currentPage: Page
  pushPage: (page: Page) => void
  select: (filter?: ServerFilterItem) => void
}

export function ContractFilterCmdGroups({ currentPage, select }: Props) {
  const { autopilot } = useApp()
  return (
    <>
      {autopilot.state === 'on' && (
        <UsableCmdGroup currentPage={currentPage} select={select} />
      )}
      <ContractsCmdGroup currentPage={currentPage} select={select} />
      <AddressCmdGroup currentPage={currentPage} select={select} />
      <PublicKeyCmdGroup currentPage={currentPage} select={select} />
      <AllowBlockCmdGroup currentPage={currentPage} select={select} />
    </>
  )
}
