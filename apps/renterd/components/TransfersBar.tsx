import {
  AppDockedControl,
  Panel,
  Text,
  Separator,
} from '@siafoundation/design-system'
import { BucketIcon } from '@siafoundation/react-icons'
import { useFilesManager } from '../contexts/filesManager'
import { useAppSettings } from '@siafoundation/react-core'
import { routes } from '../config/routes'
import Link from 'next/link'
import { useUploadsManager } from '../contexts/uploadsManager'

export function TransfersBar() {
  const { isUnlockedAndAuthedRoute } = useAppSettings()
  const { isViewingUploads, activeBucketName } = useFilesManager()
  const { bucketsWithUploads, uploadsList } = useUploadsManager()

  const activeAndQueuedUploadsCount = uploadsList.length

  if (!isUnlockedAndAuthedRoute) {
    return <AppDockedControl />
  }

  if (!activeAndQueuedUploadsCount) {
    return <AppDockedControl />
  }

  const bucketWithUploadsIsActiveBucket =
    bucketsWithUploads.length === 1 &&
    bucketsWithUploads[0].name === activeBucketName

  if (isViewingUploads && bucketWithUploadsIsActiveBucket) {
    return <AppDockedControl />
  }

  return (
    <AppDockedControl>
      <Panel className="py-2 px-3">
        <Text weight="medium" className="flex gap-1 items-center">
          Active uploads ({activeAndQueuedUploadsCount.toLocaleString()})
        </Text>
        <Separator className="my-2" />
        <div className="flex flex-col gap-1">
          {bucketsWithUploads.map((bucket) => (
            <Text key={bucket.name} size="14">
              <Link
                key={bucket.name}
                href={routes.buckets.uploads.replace('[bucket]', bucket.name)}
                className="flex gap-1 items-center"
              >
                <BucketIcon size={14} />
                {bucket.name}
              </Link>
            </Text>
          ))}
        </div>
      </Panel>
    </AppDockedControl>
  )
}
