import {
  FolderAdd16,
  Text,
  TextField,
  triggerErrorToast,
} from '@siafoundation/design-system'
import { useSystemDirectoryCreate } from '@siafoundation/react-hostd'
import { useHostOSPathSeparator } from '../../../hooks/useHostOSPathSeparator'
import { getChildDirectoryPath } from '../../../lib/system'
import { useState } from 'react'

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
          className="!pl-0 font-normal"
          value={newDirName}
          onChange={(e) => setNewDirName(e.currentTarget.value)}
          onKeyUp={async (e) => {
            if (e.key === 'Enter') {
              e.stopPropagation()
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
                triggerErrorToast(`Error creating directory: ${response.error}`)
              } else {
                onCreate(newDirName)
                setNewDirName('')
              }
            }
          }}
          size="small"
        />
      </div>
    </div>
  )
}
