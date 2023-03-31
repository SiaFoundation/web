import { Table, Dropzone } from '@siafoundation/design-system'
import { useFiles } from '../../contexts/files'
import { StateError } from './StateError'
import { StateNoneMatching } from './StateNoneMatching'
import { StateNoneYet } from './StateNoneYet'

export function FilesExplorer() {
  const {
    uploadFiles,
    datasetPage,
    pageCount,
    dataState,
    columns,
    sortColumn,
    sortDirection,
    toggleSort,
  } = useFiles()
  return (
    <div className="relative">
      <Dropzone onDrop={uploadFiles} noClick={pageCount > 0}>
        <Table
          isLoading={dataState === 'loading'}
          emptyState={
            dataState === 'noneMatchingFilters' ? (
              <StateNoneMatching />
            ) : dataState === 'noneYet' ? (
              <StateNoneYet />
            ) : dataState === 'error' ? (
              <StateError />
            ) : null
          }
          pageSize={10}
          data={datasetPage}
          columns={columns}
          sortColumn={sortColumn}
          sortDirection={sortDirection}
          toggleSort={toggleSort}
          rowSize="dense"
        />
      </Dropzone>
    </div>
  )
}
