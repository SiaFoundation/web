import { ContractFilterCmdGroups } from './ContractFilterCmdGroups'
import { ContractFilterNav } from './ContractFilterNav'
import { Page } from '../../../../CmdRoot/types'
import { useContractsParams } from '../../useContractsParams'
import { useCallback } from 'react'
import { ContractFilter } from '../../types'

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
  const { addColumnFilter } = useContractsParams()

  const select = useCallback(
    (filter: ContractFilter) => {
      if (beforeSelect) {
        beforeSelect()
      }
      addColumnFilter(filter)
      if (afterSelect) {
        afterSelect()
      }
    },
    [addColumnFilter, beforeSelect, afterSelect],
  )

  return (
    <>
      <ContractFilterNav
        parentPage={parentPage}
        currentPage={currentPage}
        pushPage={pushPage}
        select={select}
      />
      <ContractFilterCmdGroups currentPage={currentPage} select={select} />
    </>
  )
}
