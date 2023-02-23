import { Table, Dropzone } from '@siafoundation/design-system'
import { EmptyState } from './EmptyState'
import { useFiles } from '../../contexts/files'

export function FilesExplorer() {
  const {
    onDrop,
    emptyNoneMatchingFilters,
    emptyNoneYet,
    hasFetched,
    datasetPage,
    columns,
    isLoading,
  } = useFiles()
  return (
    <div className="relative">
      <Dropzone onDrop={onDrop} noClick={datasetPage.length > 0}>
        <Table
          isLoading={!emptyNoneYet && !emptyNoneMatchingFilters && isLoading}
          emptyState={
            hasFetched &&
            (emptyNoneMatchingFilters ? <EmptyState /> : <EmptyState />)
          }
          pageSize={10}
          data={datasetPage}
          columns={columns}
          rowSize="dense"
        />
      </Dropzone>
    </div>
  )
}
