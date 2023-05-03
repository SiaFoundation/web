import { CommandGroup, CommandItemSearch } from '../../CmdRoot/Item'
import { Page } from '../../CmdRoot/types'
import { FolderIcon, Text } from '@siafoundation/design-system'
import { DirectorySelectEmpty } from './DirectorySelectEmpty'
import { useSystemDirectory } from '@siafoundation/react-hostd'

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
  const dir = useSystemDirectory({
    params: {
      path: path || '/',
    },
    config: {
      swr: {
        keepPreviousData: true,
      },
    },
  })

  if (!dir.data) {
    return null
  }

  return (
    <CommandGroup
      currentPage={currentPage}
      commandPage={volumesDirectorySelectPage}
    >
      {dir.data.path !== '/' ? (
        <CommandItemSearch
          commandPage={volumesDirectorySelectPage}
          currentPage={currentPage}
          key=".."
          onSelect={() => {
            if (beforeSelect) {
              beforeSelect()
            }
            const pd = `${dir.data.path.split('/').slice(0, -1).join('/')}`
            setPath(pd)
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
      {dir.data.directories?.map((path) => {
        return (
          <CommandItemSearch
            commandPage={volumesDirectorySelectPage}
            currentPage={currentPage}
            key={path}
            onSelect={() => {
              if (beforeSelect) {
                beforeSelect()
              }
              const cwd = dir.data.path === '/' ? '/' : `${dir.data.path}/`
              setPath(`${cwd}${path}`)
              if (afterSelect) {
                afterSelect()
              }
            }}
            value={path}
          >
            <div className="flex items-center gap-2 overflow-hidden">
              <Text
                color="verySubtle"
                className="group-data-[selected=true]:text-gray-1000 dark:group-data-[selected=true]:text-graydark-1000"
              >
                <FolderIcon size={16} />
              </Text>
              <Text ellipsis>{path}</Text>
            </div>
          </CommandItemSearch>
        )
      })}
    </CommandGroup>
  )
}
