import { Separator, Text, Tooltip } from '@siafoundation/design-system'
import { Filter16, Wikis16 } from '@siafoundation/react-icons'
import { FilesStatsMenuSize } from './FilesStatsMenuSize'
import { FilesStatsMenuHealth } from './FilesStatsMenuHealth'
import { FilesStatsMenuWarnings } from './FilesStatsMenuWarnings'
import { FilesStatsMenuCount } from './FilesStatsMenuCount'

export function FilesStatsMenuShared() {
  return (
    <div className="flex gap-3 items-center">
      <FilesStatsMenuWarnings />
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
  )
}
