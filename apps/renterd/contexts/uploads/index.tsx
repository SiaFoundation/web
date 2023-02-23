import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react'
import { triggerErrorToast, triggerToast } from '@siafoundation/design-system'
import { useObjectUpload } from '@siafoundation/react-core'
import { UploadsBar } from '../../components/UploadsBar'
import { throttle } from 'lodash'

type Upload = {
  path: string
  loaded: number
  total: number
}

type UploadsMap = Record<string, Upload>

function useUploadsMain() {
  const upload = useObjectUpload()
  const [uploadsMap, setUploadsMap] = useState<UploadsMap>({})

  const updateProgress = useCallback(
    (path: string, { loaded, total }: { loaded: number; total: number }) => {
      setUploadsMap((uploads) => ({
        ...uploads,
        [path]: {
          path,
          total,
          loaded,
        },
      }))
    },
    [setUploadsMap]
  )

  const removeUpload = useCallback(
    (path: string) => {
      setUploadsMap((uploads) => {
        delete uploads[path]
        return {
          ...uploads,
        }
      })
    },
    [setUploadsMap]
  )

  const onDrop = async (droppedFiles: File[]) => {
    // handleUploads(ref, directoryPath, droppedFiles)
    droppedFiles.forEach(async (file) => {
      const onUploadProgress = throttle(
        (e) => updateProgress(file.name, e),
        2000
      )
      updateProgress(file.name, {
        loaded: 0,
        total: 1,
      })
      const response = await upload.put({
        params: {
          key: file.name,
        },
        payload: file,
        config: {
          axios: {
            onUploadProgress,
          },
        },
      })
      if (response.error) {
        triggerErrorToast(response.error)
        removeUpload(file.name)
      } else {
        removeUpload(file.name)
        triggerToast(`Upload complete: ${file.name}`)
      }
    })
  }

  const uploadsList = useMemo(
    () => Object.entries(uploadsMap).map((u) => u[1]),
    [uploadsMap]
  )

  return { uploadsMap, onDrop, uploadsList }
}

type State = ReturnType<typeof useUploadsMain>

const UploadsContext = createContext({} as State)
export const useUploads = () => useContext(UploadsContext)

type Props = {
  children: React.ReactNode
}

export function UploadsProvider({ children }: Props) {
  const state = useUploadsMain()
  return (
    <UploadsContext.Provider value={state}>
      {children}
      <UploadsBar />
    </UploadsContext.Provider>
  )
}
