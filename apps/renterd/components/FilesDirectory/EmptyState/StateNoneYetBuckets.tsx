import { Button, Text } from '@siafoundation/design-system'
import { Add16, BucketIcon } from '@siafoundation/react-icons'
import { useDialog } from '../../../contexts/dialog'

export function StateNoneYetBuckets() {
  const { openDialog } = useDialog()
  return (
    <div className="flex flex-col gap-10 justify-center items-center h-[400px] cursor-pointer">
      <Text>
        <BucketIcon className="scale-[200%]" />
      </Text>
      <div className="flex flex-col gap-3 items-center">
        <Text color="subtle" className="text-center max-w-[500px]">
          Create a bucket to get started. Buckets are distinct storage areas
          that you can use to organize your files.
        </Text>
        <Button
          onClick={() => openDialog('filesCreateBucket')}
          tip="Create bucket"
        >
          <Add16 />
          Create bucket
        </Button>
      </div>
    </div>
  )
}
