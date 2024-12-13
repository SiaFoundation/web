import {
  Button,
  Panel,
  ScrollArea,
  Text,
  AppDockedControl,
} from '@siafoundation/design-system'
import { Download16, Subtract24, Upload16 } from '@siafoundation/react-icons'
import { useState } from 'react'
import { useFilesManager } from '../contexts/filesManager'
import { useAppSettings } from '@siafoundation/react-core'
import { TransfersBarItem } from './TransfersBarItem'
import { useUploads } from '../contexts/uploads'

export function TransfersBar() {
  const { isUnlockedAndAuthedRoute } = useAppSettings()
  const { downloadsList, downloadCancel, isViewingUploads, navigateToUploads } =
    useFilesManager()
  const { datasetPageTotal: uploadsPageTotal } = useUploads()
  const [maximized, setMaximized] = useState<boolean>(true)

  const isActiveUploads = !!uploadsPageTotal
  const downloadCount = downloadsList.length
  const isActiveDownloads = !!downloadCount

  if (!isUnlockedAndAuthedRoute) {
    return <AppDockedControl />
  }

  if (!isActiveUploads && !isActiveDownloads) {
    return <AppDockedControl />
  }

  const controls = (
    <div className="flex gap-2 justify-center">
      {isActiveUploads && !isViewingUploads ? (
        <Button
          tip="Uploads list"
          onClick={navigateToUploads}
          className="flex gap-1"
        >
          <Upload16 className="opacity-50 scale-75 relative top-px" />
          Active uploads
        </Button>
      ) : null}
      {isActiveDownloads ? (
        <Button
          tip="Downloads list"
          onClick={() => setMaximized((max) => !max)}
          className="flex gap-1"
        >
          <Download16 className="opacity-50 scale-75" />
          Active downloads
        </Button>
      ) : null}
    </div>
  )

  if (isActiveDownloads && maximized) {
    return (
      <AppDockedControl>
        <div className="flex flex-col items-center justify-center gap-2">
          <Panel className="w-[400px] flex flex-col max-h-[600px]">
            <ScrollArea>
              {isActiveDownloads ? (
                <>
                  <div className="flex justify-between items-center px-3 py-2 border-b border-gray-200 dark:border-graydark-300">
                    <Text size="16" weight="semibold">
                      Active downloads ({downloadCount})
                    </Text>
                    <Button variant="ghost" onClick={() => setMaximized(false)}>
                      <Subtract24 />
                    </Button>
                  </div>
                  {downloadsList.map((download) => (
                    <TransfersBarItem
                      key={download.id}
                      path={download.path}
                      loaded={download.loaded || 0}
                      size={download.size}
                      status={
                        download.loaded === download.size
                          ? 'processing'
                          : 'downloading'
                      }
                      abort={() => downloadCancel(download)}
                      abortTip="Cancel download"
                    />
                  ))}
                </>
              ) : null}
            </ScrollArea>
          </Panel>
          {controls}
        </div>
      </AppDockedControl>
    )
  }

  return <AppDockedControl>{controls}</AppDockedControl>
}
