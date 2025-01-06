import { useEffect } from 'react'
import { ObjectUploadData } from './types'

export function useWarnActiveUploadsOnClose({
  uploadsList,
}: {
  uploadsList: ObjectUploadData[]
}) {
  useEffect(() => {
    const warnUserAboutActiveUploads = (event: BeforeUnloadEvent) => {
      if (uploadsList.length > 0) {
        const message = `Warning, closing the tab will abort all ${uploadsList.length} active uploads.`
        event.returnValue = message // Legacy method for cross browser support
        return message // Chrome requires returnValue to be set
      }
    }

    if (uploadsList.length > 0) {
      window.addEventListener('beforeunload', warnUserAboutActiveUploads)
    }

    return () => {
      window.removeEventListener('beforeunload', warnUserAboutActiveUploads)
    }
  }, [uploadsList])
}
