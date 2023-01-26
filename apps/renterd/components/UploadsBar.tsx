import {
  Button,
  LoadingDots,
  Panel,
  ProgressBar,
  ScrollArea,
  Subtract24,
  Text,
} from '@siafoundation/design-system'
import { useState } from 'react'
import { useUploads } from '../contexts/uploads'

function getProgress(upload: { loaded: number; total: number }) {
  return upload.loaded / upload.total
}

export function UploadsBar() {
  const { uploadsList } = useUploads()
  const [maximized, setMaximized] = useState<boolean>(true)

  const uploadCount = uploadsList.length

  if (uploadCount === 0) {
    return null
  }

  if (maximized) {
    return (
      <div className="z-30 fixed bottom-5 left-1/2 -translate-x-1/2 flex justify-center">
        <Panel className="w-[400px] flex flex-col max-h-[600px]">
          <div className="flex justify-between items-center px-3 py-2 border-b border-gray-200 dark:border-graydark-300">
            <Text size="16" weight="semibold">
              Active uploads ({uploadCount})
            </Text>
            <Button variant="ghost" onClick={() => setMaximized(false)}>
              <Subtract24 />
            </Button>
          </div>
          <ScrollArea>
            {uploadsList.map((upload) => {
              const progress = getProgress(upload)
              return (
                <div
                  key={upload.path}
                  className="flex flex-col gap-1 border-t first:border-t-0 border-gray-200 dark:border-graydark-300 px-3 py-2"
                >
                  <Text ellipsis size="14" className="">
                    {upload.path}
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
          </ScrollArea>
        </Panel>
      </div>
    )
  }
  return (
    <div className="z-30 fixed bottom-5 left-1/2 -translate-x-1/2 flex justify-center">
      <Button onClick={() => setMaximized(true)}>
        <LoadingDots /> {uploadCount} file{uploadCount === 1 ? '' : 's'}{' '}
        uploading
      </Button>
    </div>
  )
}
