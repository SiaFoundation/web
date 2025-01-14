import { Table, Dropzone } from '@siafoundation/design-system'
import { useFilesDirectory } from '../../contexts/filesDirectory'
import { EmptyState } from './EmptyState'
import { useCanUpload } from '../Files/useCanUpload'
import { useFilesManager } from '../../contexts/filesManager'
import { pluralize } from '@siafoundation/units'
import { useUploadsManager } from '../../contexts/uploadsManager'

export function FilesExplorer() {
  const { isViewingBuckets } = useFilesManager()
  const { uploadFiles } = useUploadsManager()
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
    tableState,
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
          columns={tableState.visibleColumns}
          sortableColumns={tableState.sortableColumns}
          sortField={tableState.sortField}
          sortDirection={tableState.sortDirection}
          toggleSort={tableState.toggleSort}
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
