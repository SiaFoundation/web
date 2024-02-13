import { Table, Dropzone } from '@siafoundation/design-system'
import { useFilesDirectory } from '../../contexts/filesDirectory'
import { EmptyState } from './EmptyState'
import { useCanUpload } from '../Files/useCanUpload'
import { useFilesManager } from '../../contexts/filesManager'
import { columns } from '../../contexts/filesDirectory/columns'

export function FilesExplorer() {
  const { uploadFiles, sortField, sortDirection, sortableColumns, toggleSort } =
    useFilesManager()
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
        onDrop={uploadFiles}
        noClick={!canUpload || pageCount > 0}
        noDrag={!canUpload}
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
