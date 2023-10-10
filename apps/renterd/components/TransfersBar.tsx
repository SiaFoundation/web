import {
  Button,
  LoadingDots,
  Panel,
  ProgressBar,
  ScrollArea,
  Text,
} from '@siafoundation/design-system'
import {
  Close16,
  Download16,
  Subtract24,
  Upload16,
} from '@siafoundation/react-icons'
import { useState } from 'react'
import { useFiles } from '../contexts/files'
import { useAppSettings } from '@siafoundation/react-core'

function getProgress(transfer: { loaded?: number; size?: number }) {
  return transfer.loaded !== undefined ? transfer.loaded / transfer.size : 1
}

export function TransfersBar() {
  const { isUnlocked } = useAppSettings()
  const { uploadsList, uploadCancel, downloadsList, downloadCancel } =
    useFiles()
  const [maximized, setMaximized] = useState<boolean>(true)

  const uploadCount = uploadsList.length
  const downloadCount = downloadsList.length

  if (!isUnlocked) {
    return null
  }

  if (uploadCount === 0 && downloadCount === 0) {
    return null
  }

  if (maximized) {
    return (
      <div className="z-30 fixed bottom-5 left-1/2 -translate-x-1/2 flex justify-center">
        <Panel className="w-[400px] flex flex-col max-h-[600px]">
          <ScrollArea>
            {uploadCount > 0 ? (
              <>
                <div className="flex justify-between items-center px-3 py-2 border-b border-gray-200 dark:border-graydark-300">
                  <Text size="16" weight="semibold">
                    Active uploads ({uploadCount})
                  </Text>
                  <Button variant="ghost" onClick={() => setMaximized(false)}>
                    <Subtract24 />
                  </Button>
                </div>
                {uploadsList.map((upload) => {
                  const progress = getProgress(upload)
                  return (
                    <div
                      key={upload.path}
                      className="flex flex-col gap-1 border-t first:border-t-0 border-gray-200 dark:border-graydark-300 px-3 py-2"
                    >
                      <div className="flex gap-1">
                        <Text ellipsis size="14" className="flex-1">
                          {upload.path}
                        </Text>
                        <Button
                          tip="Cancel file upload"
                          variant="ghost"
                          size="none"
                          onClick={() => uploadCancel(upload)}
                        >
                          <Close16 />
                        </Button>
                      </div>
                      <ProgressBar
                        variant="accent"
                        value={upload.loaded}
                        max={upload.size}
                        className={progress === 1 ? 'animate-pulse' : ''}
                      />
                      <div className="flex justify-between mt-1">
                        <Text size="12" color="subtle">
                          {progress === 1 ? 'Processing' : 'Uploading'}
                        </Text>
                        <Text size="12" color="subtle">
                          {(progress * 100).toFixed(0)}%
                        </Text>
                      </div>
                    </div>
                  )
                })}
              </>
            ) : null}
            {downloadCount > 0 ? (
              <>
                <div className="flex justify-between items-center px-3 py-2 border-b border-gray-200 dark:border-graydark-300">
                  <Text size="16" weight="semibold">
                    Active downloads ({downloadCount})
                  </Text>
                  {uploadCount === 0 ? (
                    <Button variant="ghost" onClick={() => setMaximized(false)}>
                      <Subtract24 />
                    </Button>
                  ) : null}
                </div>
                {downloadsList.map((download) => {
                  const progress = getProgress(download)
                  return (
                    <div
                      key={download.path}
                      className="flex flex-col gap-1 border-t first:border-t-0 border-gray-200 dark:border-graydark-300 px-3 py-2"
                    >
                      <div className="flex gap-1">
                        <Text ellipsis size="14" className="flex-1">
                          {download.path}
                        </Text>
                        <Button
                          tip="Cancel file download"
                          variant="ghost"
                          size="none"
                          onClick={() => downloadCancel(download)}
                        >
                          <Close16 />
                        </Button>
                      </div>
                      <ProgressBar
                        variant="accent"
                        value={download.loaded}
                        max={download.size}
                        className={progress === 1 ? 'animate-pulse' : ''}
                      />
                      <div className="flex justify-between mt-1">
                        <Text size="12" color="subtle">
                          {progress === 1 ? 'Processing' : 'Downloading'}
                        </Text>
                        <Text size="12" color="subtle">
                          {(progress * 100).toFixed(0)}%
                        </Text>
                      </div>
                    </div>
                  )
                })}
              </>
            ) : null}
          </ScrollArea>
        </Panel>
      </div>
    )
  }
  return (
    <div className="z-30 fixed bottom-5 left-1/2 -translate-x-1/2 flex justify-center">
      <Button onClick={() => setMaximized(true)} className="flex gap-3">
        <LoadingDots />
        {uploadCount ? (
          <Text className="flex gap-1">
            {uploadCount}
            <Upload16 className="opacity-50 scale-75 relative top-px" />
          </Text>
        ) : null}
        {downloadCount ? (
          <Text className="flex gap-1">
            {downloadCount && downloadCount}
            <Download16 className="opacity-50 scale-75" />
          </Text>
        ) : null}
      </Button>
    </div>
  )
}
