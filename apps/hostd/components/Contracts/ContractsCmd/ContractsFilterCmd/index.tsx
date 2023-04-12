import { ContractFilterCmdGroups } from './ContractFilterCmdGroups'
import { ContractFilterNav } from './ContractFilterNav'
import { Page } from '../../../CmdRoot/types'
import { ClientFilterItem } from '@siafoundation/design-system'
import { ContractData } from '../../../../contexts/contracts/types'
import { useContracts } from '../../../../contexts/contracts'
import { useCallback } from 'react'

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
  const { setFilter } = useContracts()

  const select = useCallback(
    (filter?: ClientFilterItem<ContractData>) => {
      if (beforeSelect) {
        beforeSelect()
      }
      if (filter) {
        setFilter(filter)
      }
      if (afterSelect) {
        afterSelect()
      }
    },
    [setFilter, beforeSelect, afterSelect]
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
