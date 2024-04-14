import { CommandGroup, CommandItemSearch } from '../../CmdRoot/Item'
import { Page } from '../../CmdRoot/types'
import { Text } from '@siafoundation/design-system'
import { FolderIcon } from '@siafoundation/react-icons'
import { DirectorySelectEmpty } from './DirectorySelectEmpty'
import { SystemDirectoryResponse } from '@siafoundation/hostd-types'
import { useHostOSPathSeparator } from '../../../hooks/useHostOSPathSeparator'
import { getChildDirectoryPath } from '../../../lib/system'
import { DirectorySelectError } from './DirectorySelectError'
import { DirectoryCreate } from './DirectoryCreate'
import { Command } from 'cmdk'
import { DirectoryParentItem } from './DirectoryParentItem'
import { SWRResponse } from 'swr'
import { SWRError } from '@siafoundation/react-core'

export const volumesDirectorySelectPage = {
  namespace: 'volumes/directorySelect',
  label: 'Directory select',
}

export function DirectorySelectCmd({
  path,
  dir,
  setPath,
  currentPage,
  beforeSelect,
  afterSelect,
}: {
  path: string
  dir: SWRResponse<SystemDirectoryResponse, SWRError>
  setPath: (path: string) => void
  currentPage?: Page
  beforeSelect?: () => void
  afterSelect?: () => void
}) {
  const separator = useHostOSPathSeparator()
  const isRoot = dir.data?.path === separator
  const isRootOnWindows = dir.data?.path === '\\'

  return (
    <CommandGroup
      currentPage={currentPage}
      commandPage={volumesDirectorySelectPage}
    >
      {!dir.isValidating && dir.data && !dir.error ? (
        !isRoot ? (
          <DirectoryParentItem
            path={dir.data.path}
            setPath={setPath}
            currentPage={currentPage}
            commandPage={volumesDirectorySelectPage}
            afterSelect={afterSelect}
            beforeSelect={beforeSelect}
          />
        ) : null
      ) : null}
      <Command.Empty>
        {!dir.isValidating && dir.error ? <DirectorySelectError /> : null}
        {!dir.isValidating && !dir.error && !dir.data?.directories?.length ? (
          <DirectorySelectEmpty search={path} />
        ) : null}
      </Command.Empty>
      {!dir.isValidating && !dir.error && dir.data?.directories?.length
        ? dir.data.directories.map((childDirectoryPath) => {
            return (
              <CommandItemSearch
                commandPage={volumesDirectorySelectPage}
                currentPage={currentPage}
                key={childDirectoryPath}
                onSelect={() => {
                  if (beforeSelect) {
                    beforeSelect()
                  }
                  const path = getChildDirectoryPath({
                    currentPath: dir.data.path,
                    childPath: childDirectoryPath,
                    separator,
                  })
                  setPath(path)
                  if (afterSelect) {
                    afterSelect()
                  }
                }}
                value={childDirectoryPath}
              >
                <div className="flex items-center gap-2 overflow-hidden">
                  <Text
                    color="verySubtle"
                    className="group-data-[selected=true]:text-gray-1000 dark:group-data-[selected=true]:text-graydark-1000"
                  >
                    <FolderIcon size={16} />
                  </Text>
                  <Text ellipsis>{childDirectoryPath}</Text>
                </div>
              </CommandItemSearch>
            )
          })
        : null}
      {!isRootOnWindows && !dir.isValidating && !dir.error && (
        <CommandItemSearch
          commandPage={volumesDirectorySelectPage}
          currentPage={currentPage}
          value="create new directory"
        >
          <DirectoryCreate
            path={dir.data?.path}
            onCreate={(name) => {
              dir.mutate((data) => ({
                ...data,
                directories: data?.directories?.concat(name) || [name],
              }))
            }}
          />
        </CommandItemSearch>
      )}
    </CommandGroup>
  )
}
