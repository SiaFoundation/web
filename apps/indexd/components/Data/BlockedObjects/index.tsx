import {
  DataTable,
  StateNoneYet,
  StateError,
  StateNoneMatching,
  useDataTable,
  StateNoneOnPage,
} from '@siafoundation/design-system'
import { useCallback } from 'react'
import { Layout } from '../Layout'
import { blockedObjectsColumns } from './blockedObjectsColumns'
import { SidePanelBlockedObjectList } from './SidePanelBlockedObjectList'
import { SidePanelObject } from './SidePanelObject'
import { useBlockedObjects } from './useBlockedObjects'
import { useBlockedObjectsParams } from './useBlockedObjectsParams'
import { BlockedObjectsActions } from './BlockedObjectsActions'
import { BlockedObjectData } from './types'

export function BlockedObjects() {
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
  } = useBlockedObjectsParams()
  const onRowClick = useCallback(
    (id: string) => {
      setPanelId(id)
    },
    [setPanelId],
  )

  const blockedObjects = useBlockedObjects()
  const table = useDataTable<BlockedObjectData>({
    dataset: blockedObjects,
    columns: blockedObjectsColumns,
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
          localStorage="indexd/blockedObjects"
          actions={<BlockedObjectsActions />}
          noneOnPage={
            <StateNoneOnPage message="No blocked objects on this page, reset pagination to continue." />
          }
          noneYet={<StateNoneYet message="There are no blocked objects." />}
          noneMatchingFilters={
            <StateNoneMatching message="No blocked objects matching filters." />
          }
          error={
            <StateError message="Error loading blocked objects. Please try again later." />
          }
        />
      }
      panel={
        panelId ? (
          <SidePanelObject />
        ) : (
          <SidePanelBlockedObjectList table={table} />
        )
      }
    />
  )
}
