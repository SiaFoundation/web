import {
  Button,
  Download16,
  LoadingDots,
  Panel,
  ProgressBar,
  ScrollArea,
  Subtract24,
  Text,
  Upload16,
} from '@siafoundation/design-system'
import { useState } from 'react'
import { useFiles } from '../contexts/files'

function getProgress(upload: { loaded?: number; total?: number }) {
  return upload.loaded ? upload.loaded / upload.total : 1
}

export function TransfersBar() {
  const { uploadsList, downloadsList } = useFiles()
  const [maximized, setMaximized] = useState<boolean>(true)

  const uploadCount = uploadsList.length
  const downloadCount = downloadsList.length

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
                      <Text ellipsis size="14" className="">
                        {upload.path.slice(1)}
                      </Text>
                      <ProgressBar
                        variant="accent"
                        value={upload.loaded}
                        max={upload.total}
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
                      <Text ellipsis size="14" className="">
                        {download.path.slice(1)}
                      </Text>
                      <ProgressBar
                        variant="accent"
                        value={download.loaded}
                        max={download.total}
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
