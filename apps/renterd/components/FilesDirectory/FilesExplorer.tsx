import { Table, Dropzone } from '@siafoundation/design-system'
import { useFilesDirectory } from '../../contexts/filesDirectory'
import { EmptyState } from './EmptyState'
import { useCanUpload } from '../Files/useCanUpload'
import { useFilesManager } from '../../contexts/filesManager'
import { columns } from '../../contexts/filesDirectory/columns'
import { pluralize } from '@siafoundation/units'

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
    datasetPageTotal,
    datasetState,
    cellContext,
    onDragEnd,
    onDragOver,
    onDragStart,
    onDragCancel,
    onDragMove,
    draggingObjects,
  } = useFilesDirectory()
  const canUpload = useCanUpload()
  return (
    <div className="relative">
      <Dropzone
        testId="filesDropzone"
        onDrop={uploadFiles}
        noClick={!canUpload || datasetPageTotal > 0}
        noDrag={!canUpload}
      >
        <Table
          testId={isViewingBuckets ? 'bucketsTable' : 'filesTable'}
          isLoading={datasetState === 'loading'}
          emptyState={<EmptyState />}
          pageSize={10}
          data={datasetPage}
          context={cellContext}
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
          draggingDatums={draggingObjects}
          draggingMultipleLabel={(count) => `move ${pluralize(count, 'file')}`}
        />
      </Dropzone>
    </div>
  )
}
