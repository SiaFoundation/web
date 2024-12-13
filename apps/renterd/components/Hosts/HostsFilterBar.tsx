import { PaginatorUnknownTotal } from '@siafoundation/design-system'
import { useHosts } from '../../contexts/hosts'
import { HostsFilterMenu } from './HostsFilterMenu'

export function HostsFilterBar() {
  const { offset, limit, datasetPageTotal, datasetState } = useHosts()
  return (
    <div className="flex gap-2 w-full">
      <HostsFilterMenu />
      <div className="flex-1" />
      <PaginatorUnknownTotal
        offset={offset}
        limit={limit}
        pageTotal={datasetPageTotal}
        isLoading={datasetState === 'loading'}
      />
    </div>
  )
}
