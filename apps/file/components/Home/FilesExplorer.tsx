import { Table, Dropzone } from '@siafoundation/design-system'
import { useFiles } from '../../contexts/files'
import { EmptyState } from './EmptyState'
// import { useCanUpload } from './useCanUpload'

export function FilesExplorer() {
  const {
    uploadFiles,
    datasetPage,
    pageCount,
    dataState,
    columns,
    sortField,
    sortDirection,
    sortableColumns,
    toggleSort,
  } = useFiles()
  // const canUpload = useCanUpload()
  return (
    <div className="relative">
      <Dropzone
        onDrop={uploadFiles}
        // noClick={!canUpload || pageCount > 0}
        // noDrag={!canUpload}
      >
        <Table
          isLoading={dataState === 'loading'}
          emptyState={<EmptyState />}
          pageSize={10}
          data={datasetPage}
          columns={columns}
          sortableColumns={sortableColumns}
          sortField={sortField}
          sortDirection={sortDirection}
          toggleSort={toggleSort}
          rowSize="dense"
        />
      </Dropzone>
    </div>
  )
}
