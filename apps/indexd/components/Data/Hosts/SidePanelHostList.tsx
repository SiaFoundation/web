import {
  Heading,
  HostMap,
  useDataTableParams,
} from '@siafoundation/design-system'
import { HostData } from './types'
import { Row } from '@tanstack/react-table'
import { useMapHosts } from '../useMapHosts'

export function SidePanelHostList({ hosts }: { hosts: Row<HostData>[] }) {
  const { setSelectedId } = useDataTableParams('hostList')
  const mapHosts = useMapHosts({
    hosts: hosts.map((host) => host.original),
  })
  return (
    <div className="flex flex-col overflow-hidden">
      <Heading size="24" className="mb-2">
        Hosts ({hosts.length})
      </Heading>
      <HostMap
        hosts={mapHosts}
        activeHost={null}
        onHostMapClick={(id) => setSelectedId(id)}
        scale={180}
        showLegend={false}
      />
    </div>
  )
}
