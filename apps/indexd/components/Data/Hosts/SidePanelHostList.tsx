import {
  Button,
  DataTableState,
  HostMap,
  Text,
  useDataTableParams,
} from '@siafoundation/design-system'
import { HostData } from './types'
import { useMapHosts } from '../useMapHosts'
import { BulkHostBlocklistAdd } from './bulkActions/BulkHostBlocklistAdd'
import { BulkHostBlocklistRemove } from './bulkActions/BulkHostBlocklistRemove'
import { SidePanel } from '../SidePanel'
import { useMemo } from 'react'

export function SidePanelHostList({
  table,
}: {
  table: DataTableState<HostData>
}) {
  const { setSelectedId } = useDataTableParams('hostList')
  const hosts = useMemo(() => {
    return table.isSelection ? table.selectedRows : table.rows
  }, [table.isSelection, table.selectedRows, table.rows])
  const mapHosts = useMapHosts({
    hosts: hosts.map((host) => host.original),
  })
  return (
    <SidePanel
      customCloseAction={
        table.isSelection ? (
          <Button onClick={() => table.setRowSelection({})}>
            Clear selection
          </Button>
        ) : null
      }
      actions={
        table.isSelection ? (
          <>
            <BulkHostBlocklistAdd hosts={hosts} />
            <BulkHostBlocklistRemove hosts={hosts} />
          </>
        ) : null
      }
      heading={
        <Text size="18" weight="medium">
          {table.isSelection
            ? `Selected hosts (${hosts.length})`
            : table.isFiltered
              ? `Filtered hosts (${hosts.length})`
              : 'All hosts'}
        </Text>
      }
    >
      <HostMap
        hosts={mapHosts}
        activeHost={null}
        onHostMapClick={(id) => setSelectedId(id)}
        scale={180}
        mapClassName="-mt-[20px]"
      />
    </SidePanel>
  )
}
