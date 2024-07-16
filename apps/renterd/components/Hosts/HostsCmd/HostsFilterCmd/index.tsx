import type { ServerFilterItem } from '@siafoundation/design-system'
import { useCallback } from 'react'
import { useHosts } from '../../../../contexts/hosts'
import type { Page } from '../../../CmdRoot/types'
import { ContractFilterCmdGroups } from './HostsFilterCmdGroups'
import { HostsFilterNav } from './HostsFilterNav'

export function HostsFilterCmd({
  currentPage,
  parentPage,
  pushPage,
  beforeSelect,
  afterSelect,
}: {
  currentPage?: Page
  parentPage?: Page
  beforeSelect?: () => void
  afterSelect?: () => void
  pushPage: (page: Page) => void
}) {
  const { setFilter } = useHosts()

  const select = useCallback(
    (filter?: ServerFilterItem) => {
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
    [setFilter, beforeSelect, afterSelect],
  )

  return (
    <>
      <HostsFilterNav
        parentPage={parentPage}
        currentPage={currentPage}
        pushPage={pushPage}
        select={select}
      />
      <ContractFilterCmdGroups
        currentPage={currentPage}
        pushPage={pushPage}
        select={select}
      />
    </>
  )
}
