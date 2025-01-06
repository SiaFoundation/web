import { Button, AppDockedControl } from '@siafoundation/design-system'
import { Upload16 } from '@siafoundation/react-icons'
import { useFilesManager } from '../contexts/filesManager'
import { useAppSettings } from '@siafoundation/react-core'
import { useUploads } from '../contexts/uploads'

export function TransfersBar() {
  const { isUnlockedAndAuthedRoute } = useAppSettings()
  const { isViewingUploads, navigateToUploads } = useFilesManager()

  const {
    localUploads: { datasetTotal: uploadsTotal },
  } = useUploads()

  const isActiveUploads = !!uploadsTotal

  if (!isUnlockedAndAuthedRoute) {
    return <AppDockedControl />
  }

  if (!isActiveUploads) {
    return <AppDockedControl />
  }

  if (isViewingUploads) {
    return <AppDockedControl />
  }

  return (
    <AppDockedControl>
      <div className="flex gap-2 justify-center">
        <Button
          tip="Uploads list"
          onClick={navigateToUploads}
          className="flex gap-1"
        >
          <Upload16 className="opacity-50 scale-75 relative top-px" />
          Active uploads ({uploadsTotal.toLocaleString()})
        </Button>
      </div>
    </AppDockedControl>
  )
}
