import { Table, Dropzone } from '@siafoundation/design-system'
import { EmptyState } from './EmptyState'
import { useFilesFlat } from '../../contexts/filesFlat'
import { useCanUpload } from '../Files/useCanUpload'
import { useUploadsManager } from '../../contexts/uploadsManager'

export function FilesExplorer() {
  const {
    datasetPage,
    datasetState,
    cellContext,
    tableState,
    datasetPageTotal,
  } = useFilesFlat()
  const { uploadFiles } = useUploadsManager()
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
          testId="filesTable"
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
        />
      </Dropzone>
    </div>
  )
}
