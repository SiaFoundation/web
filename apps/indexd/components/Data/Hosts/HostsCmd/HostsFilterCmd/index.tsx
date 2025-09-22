import { HostFilterCmdGroups } from './HostFilterCmdGroups'
import { HostFilterNav } from './HostFilterNav'
import { Page } from '../../../../CmdRoot/types'
import { useHostsParams } from '../../useHostsParams'
import { useCallback } from 'react'
import { HostFilter } from '../../types'

export function HostsFilterCmd({
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
  const { addColumnFilter } = useHostsParams()

  const select = useCallback(
    (filter: HostFilter) => {
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
      <HostFilterNav
        parentPage={parentPage}
        currentPage={currentPage}
        pushPage={pushPage}
        select={select}
      />
      <HostFilterCmdGroups currentPage={currentPage} select={select} />
    </>
  )
}
