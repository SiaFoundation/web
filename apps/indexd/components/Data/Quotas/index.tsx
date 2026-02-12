import {
  DataTable,
  StateNoneYet,
  StateError,
  StateNoneMatching,
  useDataTable,
  StateNoneOnPage,
} from '@siafoundation/design-system'
import { useCallback } from 'react'
import { quotasColumns } from './quotasColumns'
import { SidePanelQuotaList } from './SidePanelQuotaList'
import { SidePanelQuota } from './SidePanelQuota'
import { useQuotas } from './useQuotas'
import { Layout } from '../Layout'
import { useQuotasParams } from './useQuotasParams'
import { CreateQuotaButton } from './CreateQuotaButton'
import { QuotaData } from '../../../lib/quota'

export function Quotas() {
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
  } = useQuotasParams()
  const onRowClick = useCallback(
    (id: string) => {
      setPanelId(id)
    },
    [setPanelId],
  )

  const quotas = useQuotas()
  const table = useDataTable<QuotaData>({
    dataset: quotas,
    columns: quotasColumns,
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
          localStorage="indexd/quotas"
          actions={<CreateQuotaButton />}
          noneOnPage={
            <StateNoneOnPage message="No quotas on this page, reset pagination to continue." />
          }
          noneYet={<StateNoneYet message="There are no quotas yet." />}
          noneMatchingFilters={
            <StateNoneMatching message="No quotas matching filters." />
          }
          error={
            <StateError message="Error loading quotas. Please try again later." />
          }
        />
      }
      panel={
        panelId ? <SidePanelQuota /> : <SidePanelQuotaList table={table} />
      }
    />
  )
}
