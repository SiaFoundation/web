import { useEffect } from 'react'
import type { UploadsMap } from './types'

export function useWarnActiveUploadsOnClose({
  uploadsMap,
}: {
  uploadsMap: UploadsMap
}) {
  useEffect(() => {
    const activeUploads = Object.values(uploadsMap).filter(
      (upload) => upload.uploadStatus === 'uploading',
    )

    const warnUserAboutActiveUploads = (event: BeforeUnloadEvent) => {
      if (activeUploads.length > 0) {
        const message = `Warning, closing the tab will abort all ${activeUploads.length} active uploads.`
        event.returnValue = message // Legacy method for cross browser support
        return message // Chrome requires returnValue to be set
      }
    }

    if (activeUploads.length > 0) {
      window.addEventListener('beforeunload', warnUserAboutActiveUploads)
    }

    return () => {
      window.removeEventListener('beforeunload', warnUserAboutActiveUploads)
    }
  }, [uploadsMap])
}
