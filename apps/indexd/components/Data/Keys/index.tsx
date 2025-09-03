import { DataTable, useDataTable } from '@siafoundation/design-system'
import { useCallback } from 'react'
import { keysColumns } from './keysColumns'
import { SidePanelKeyList } from './SidePanelKeyList'
import { SidePanelKey } from './SidePanelKey'
import { KeyData } from './types'
import { useKeys } from './useKeys'
import { Layout } from '../Layout'
import { useKeysParams } from './useKeysParams'
import { CreateKeyButton } from './CreateKeyButton'

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
    data: keys,
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
      table={<DataTable {...table} actions={<CreateKeyButton />} />}
      panel={panelId ? <SidePanelKey /> : <SidePanelKeyList table={table} />}
    />
  )
}
