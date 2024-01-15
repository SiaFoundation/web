'use client'

import { Table, Text } from '@siafoundation/design-system'
import { EmptyState } from './EmptyState'
import { usePeers } from '../../contexts/peers'
import { formatRelative } from 'date-fns'
// import { useCanUpload } from './useCanUpload'

export function PeersList() {
  const {
    datasetPage,
    dataState,
    columns,
    sortField,
    sortDirection,
    sortableColumns,
    toggleSort,
    events,
  } = usePeers()
  // const canUpload = useCanUpload()
  return (
    <div className="relative flex gap-2">
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
      <div className="flex flex-col gap-1">
        {events.map((event, i) => (
          <Text
            key={i + event.detail.id.toString()}
            className="flex flex-row gap-1"
          >
            {event.type} {event.detail.id.toString()}{' '}
            {formatRelative(event.time, new Date())}
          </Text>
        ))}
      </div>
    </div>
  )
}
