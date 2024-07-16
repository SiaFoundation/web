import { Text } from '@siafoundation/design-system'
import { FolderIcon } from '@siafoundation/react-icons'
import { useHostOSPathSeparator } from '../../../hooks/useHostOSPathSeparator'
import { getParentDir } from '../../../lib/system'
import { CommandItemSearch } from '../../CmdRoot/Item'
import type { Page } from '../../CmdRoot/types'

export function DirectoryParentItem({
  path,
  setPath,
  commandPage,
  currentPage,
  beforeSelect,
  afterSelect,
}: {
  path: string
  setPath: (path: string) => void
  commandPage: Page
  currentPage?: Page
  beforeSelect?: () => void
  afterSelect?: () => void
}) {
  const separator = useHostOSPathSeparator()

  return (
    <CommandItemSearch
      commandPage={commandPage}
      currentPage={currentPage}
      key=".."
      onSelect={() => {
        if (!path) {
          return
        }
        if (beforeSelect) {
          beforeSelect()
        }
        setPath(getParentDir(path, separator))
        if (afterSelect) {
          afterSelect()
        }
      }}
      value=".."
    >
      <div className="flex items-center gap-2 overflow-hidden">
        <Text
          color="verySubtle"
          className="group-data-[selected=true]:text-gray-1000 dark:group-data-[selected=true]:text-graydark-1000"
        >
          <FolderIcon size={16} />
        </Text>
        <Text ellipsis>..</Text>
      </div>
    </CommandItemSearch>
  )
}
