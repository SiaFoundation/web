import {
  DataTable,
  StateNoneYet,
  StateError,
  StateNoneMatching,
  useDataTable,
  StateNoneOnPage,
} from '@siafoundation/design-system'
import { useCallback } from 'react'
import { keysColumns } from './keysColumns'
import { SidePanelKeyList } from './SidePanelKeyList'
import { SidePanelKey } from './SidePanelKey'
import { useKeys } from './useKeys'
import { Layout } from '../Layout'
import { useKeysParams } from './useKeysParams'
import { CreateKeyButton } from './CreateKeyButton'
import { KeyData } from '../../../lib/connectKey'

export function Keys() {
  const {
    offset,
    limit,
    setOffset,
    setLimit,
    panelId,
    setPanelId,
    columnFilters,
    setColumnFilters,
    columnSorts,
    setColumnSorts,
  } = useKeysParams()
  const onRowClick = useCallback(
    (id: string) => {
      setPanelId(id)
    },
    [setPanelId],
  )

  const keys = useKeys()
  const table = useDataTable<KeyData>({
    dataset: keys,
    columns: keysColumns,
    columnFilters,
    setColumnFilters,
    columnSorts,
    setColumnSorts,
    offset,
    limit,
    onRowClick,
    setOffset,
    setLimit,
  })
  return (
    <Layout
      table={
        <DataTable
          {...table}
          actions={<CreateKeyButton />}
          noneOnPage={
            <StateNoneOnPage message="No keys on this page, reset pagination to continue." />
          }
          noneYet={<StateNoneYet message="There are no keys yet." />}
          noneMatchingFilters={
            <StateNoneMatching message="No keys matching filters." />
          }
          error={
            <StateError message="Error loading keys. Please try again later." />
          }
        />
      }
      panel={panelId ? <SidePanelKey /> : <SidePanelKeyList table={table} />}
    />
  )
}
