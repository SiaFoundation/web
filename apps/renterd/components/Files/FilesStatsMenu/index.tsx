import {
  Filter16,
  Separator,
  Text,
  Tooltip,
  Wikis16,
} from '@siafoundation/design-system'
import { FilesStatsMenuSize } from './FilesStatsMenuSize'
import { FilesStatsMenuHealth } from './FilesStatsMenuHealth'
import { FilesStatsMenuWarnings } from './FilesStatsMenuWarnings'
import { FilesStatsMenuCount } from './FilesStatsMenuCount'

export function FilesStatsMenu() {
  return (
    <div className="flex gap-2 w-full">
      <FilesStatsMenuWarnings />
      <div className="flex-1" />
      <div className="flex gap-4">
        <div className="flex gap-2">
          <Tooltip side="bottom" content="Filtered statistics">
            <Text size="12" color="verySubtle">
              <Filter16 />
            </Text>
          </Tooltip>
          <FilesStatsMenuCount />
        </div>
        <Separator variant="vertical" className="h-full" />
        <div className="flex gap-4">
          <Tooltip side="bottom" content="Global statistics">
            <Text size="12" color="verySubtle">
              <Wikis16 />
            </Text>
          </Tooltip>
          <FilesStatsMenuSize />
          <FilesStatsMenuHealth />
        </div>
      </div>
    </div>
  )
}
