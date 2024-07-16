import { Dropzone, Table } from '@siafoundation/design-system'
import { useFilesDirectory } from '../../contexts/filesDirectory'
import { columns } from '../../contexts/filesDirectory/columns'
import { useFilesManager } from '../../contexts/filesManager'
import { useCanUpload } from '../Files/useCanUpload'
import { EmptyState } from './EmptyState'

export function FilesExplorer() {
  const {
    uploadFiles,
    sortField,
    sortDirection,
    sortableColumns,
    toggleSort,
    isViewingBuckets,
  } = useFilesManager()
  const {
    datasetPage,
    pageCount,
    dataState,
    onDragEnd,
    onDragOver,
    onDragStart,
    onDragCancel,
    onDragMove,
    draggingObject,
  } = useFilesDirectory()
  const canUpload = useCanUpload()
  return (
    <div className="relative">
      <Dropzone
        testId="filesDropzone"
        onDrop={uploadFiles}
        noClick={!canUpload || pageCount > 0}
        noDrag={!canUpload}
      >
        <Table
          testId={isViewingBuckets ? 'bucketsTable' : 'filesTable'}
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
          onDragStart={onDragStart}
          onDragOver={onDragOver}
          onDragEnd={onDragEnd}
          onDragCancel={onDragCancel}
          onDragMove={onDragMove}
          draggingDatum={draggingObject}
        />
      </Dropzone>
    </div>
  )
}
