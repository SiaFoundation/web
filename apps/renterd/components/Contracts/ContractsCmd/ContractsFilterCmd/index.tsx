import { ContractFilterCmdGroups } from './ContractFilterCmdGroups'
import { ContractFilterNav } from './ContractFilterNav'
import { Page } from '../../../CmdRoot/types'

export function ContractsFilterCmd({
  currentPage,
  parentPage,
  pushPage,
  beforeSelect,
  afterSelect,
}: {
  currentPage: Page
  parentPage?: Page
  beforeSelect?: () => void
  afterSelect?: () => void
  pushPage: (page: Page) => void
}) {
  return (
    <>
      <ContractFilterNav
        parentPage={parentPage}
        currentPage={currentPage}
        pushPage={pushPage}
      />
      <ContractFilterCmdGroups
        currentPage={currentPage}
        beforeSelect={beforeSelect}
        afterSelect={afterSelect}
        pushPage={pushPage}
      />
    </>
  )
}
