import { EmptyState, Table } from '@siafoundation/design-system'
import { useVolumes } from '../../contexts/volumes'
import { StateNoneYet } from './StateNoneYet'

export function Volumes() {
  const { dataset, datasetState, isLoading, visibleColumns } = useVolumes()
  return (
    <div className="p-6 min-w-fit">
      <Table
        testId="volumesTable"
        isLoading={isLoading}
        pageSize={20}
        data={dataset}
        columns={visibleColumns}
        emptyState={
          <EmptyState datasetState={datasetState} noneYet={<StateNoneYet />} />
        }
      />
    </div>
  )
}
