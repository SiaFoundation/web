import {
  PaginatorUnknownTotal,
  Separator,
  Text,
  Tooltip,
} from '@siafoundation/design-system'
import { Filter16, Wikis16 } from '@siafoundation/react-icons'
import { FilesStatsMenuSize } from './FilesStatsMenuSize'
import { FilesStatsMenuHealth } from './FilesStatsMenuHealth'
import { FilesStatsMenuWarnings } from './FilesStatsMenuWarnings'
import { FilesStatsMenuCount } from './FilesStatsMenuCount'
import { useFiles } from '../../../contexts/files'

export function FilesStatsMenu() {
  const { limit, offset, pageCount, dataState, isViewingABucket } = useFiles()
  return (
    <div className="flex gap-4 w-full">
      <FilesStatsMenuWarnings />
      <div className="flex-1" />
      <div className="flex gap-3 items-center">
        <div className="flex gap-3">
          <Tooltip side="bottom" content="Filtered statistics">
            <Text size="12" color="verySubtle">
              <Filter16 />
            </Text>
          </Tooltip>
          <FilesStatsMenuCount />
        </div>
        <Separator variant="vertical" className="h-full" />
        <div className="flex gap-3">
          <Tooltip side="bottom" content="Global statistics">
            <Text size="12" color="verySubtle">
              <Wikis16 />
            </Text>
          </Tooltip>
          <FilesStatsMenuSize />
          <FilesStatsMenuHealth />
        </div>
      </div>
      {isViewingABucket && (
        <PaginatorUnknownTotal
          offset={offset}
          limit={limit}
          pageTotal={pageCount}
          isLoading={dataState === 'loading'}
        />
      )}
    </div>
  )
}
