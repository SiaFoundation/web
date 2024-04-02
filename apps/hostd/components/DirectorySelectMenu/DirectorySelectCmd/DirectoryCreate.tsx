import {
  Text,
  TextField,
  triggerErrorToast,
} from '@siafoundation/design-system'
import { FolderAdd16 } from '@siafoundation/react-icons'
import { useSystemDirectoryCreate } from '@siafoundation/react-hostd'
import { useHostOSPathSeparator } from '../../../hooks/useHostOSPathSeparator'
import { getChildDirectoryPath } from '../../../lib/system'
import { useCallback, useState } from 'react'

export function DirectoryCreate({
  path,
  onCreate,
}: {
  path: string
  onCreate: (name: string) => void
}) {
  const separator = useHostOSPathSeparator()
  const dirCreate = useSystemDirectoryCreate()
  const [newDirName, setNewDirName] = useState('')
  const createDirectory = useCallback(async () => {
    const response = await dirCreate.put({
      payload: {
        path: getChildDirectoryPath({
          currentPath: path,
          childPath: newDirName,
          separator,
        }),
      },
    })
    if (response.error) {
      triggerErrorToast({
        title: 'Error creating directory',
        body: response.error,
      })
    } else {
      onCreate(newDirName)
      setNewDirName('')
    }
  }, [dirCreate, newDirName, onCreate, path, separator])

  return (
    <div className="flex items-center gap-2 overflow-hidden w-full">
      <Text
        color="verySubtle"
        className="group-data-[selected=true]:text-gray-1000 dark:group-data-[selected=true]:text-graydark-1000"
      >
        <FolderAdd16 />
      </Text>
      <div className="flex-1">
        <TextField
          focus="none"
          variant="ghost"
          placeholder="type new directory name"
          className="!pl-0 font-normal h-5"
          value={newDirName}
          onChange={(e) => {
            setNewDirName(e.currentTarget.value)
          }}
          onKeyUp={(e) => {
            e.stopPropagation()
            if (e.key === 'Enter') {
              createDirectory()
            }
          }}
          size="small"
        />
      </div>
    </div>
  )
}
