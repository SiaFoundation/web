import { AccountFilterCmdGroups } from './AccountFilterCmdGroups'
import { AccountFilterNav } from './AccountFilterNav'
import { Page } from '../../../../CmdRoot/types'
import { useAccountsParams } from '../../useAccountsParams'
import { useCallback } from 'react'
import { AccountFilter } from '../../types'

export function AccountsFilterCmd({
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
  const { addColumnFilter } = useAccountsParams()

  const select = useCallback(
    (filter?: AccountFilter) => {
      if (beforeSelect) {
        beforeSelect()
      }
      if (filter) {
        addColumnFilter(filter)
      }
      if (afterSelect) {
        afterSelect()
      }
    },
    [addColumnFilter, beforeSelect, afterSelect],
  )

  return (
    <>
      <AccountFilterNav
        parentPage={parentPage}
        currentPage={currentPage}
        pushPage={pushPage}
        select={select}
      />
      <AccountFilterCmdGroups currentPage={currentPage} select={select} />
    </>
  )
}
