import { CommandGroup, CommandItemSearch } from '../../CmdRoot/Item'
import { Page } from '../../CmdRoot/types'
import { FolderIcon, Text } from '@siafoundation/design-system'
import { DirectorySelectEmpty } from './DirectorySelectEmpty'
import { useSystemDirectory } from '@siafoundation/react-hostd'
import { useHostOSPathSeparator } from '../../../hooks/useHostOSPathSeparator'
import { getChildDirectoryPath, getParentDir } from '../../../lib/system'
import { DirectorySelectError } from './DirectorySelectError'
import { DirectoryCreate } from './DirectoryCreate'

export const volumesDirectorySelectPage = {
  namespace: 'volumes/directorySelect',
  label: 'Directory select',
  empty: DirectorySelectEmpty,
}

export function DirectorySelectCmd({
  path,
  setPath,
  currentPage,
  beforeSelect,
  afterSelect,
}: {
  path: string
  setPath: (path: string) => void
  currentPage?: Page
  beforeSelect?: () => void
  afterSelect?: () => void
}) {
  const separator = useHostOSPathSeparator()
  const dir = useSystemDirectory({
    params: {
      path,
    },
    config: {
      swr: {
        revalidateOnFocus: false,
        keepPreviousData: true,
      },
    },
  })

  if (!dir.data) {
    return null
  }

  const isRootOnWindows = dir.data?.path === '\\'

  return (
    <CommandGroup
      currentPage={currentPage}
      commandPage={volumesDirectorySelectPage}
    >
      {dir.data.path !== separator ? (
        <CommandItemSearch
          commandPage={volumesDirectorySelectPage}
          currentPage={currentPage}
          key=".."
          onSelect={() => {
            if (!dir.data.path) {
              return
            }
            if (beforeSelect) {
              beforeSelect()
            }
            setPath(getParentDir(dir.data.path, separator))
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
      ) : null}
      {!!dir.error && <DirectorySelectError />}
      {!dir.error &&
        dir.data.directories?.map((childDirectoryPath) => {
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
        })}
      {!isRootOnWindows && (
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
                directories: data.directories?.concat(name) || [name],
              }))
            }}
          />
        </CommandItemSearch>
      )}
    </CommandGroup>
  )
}
