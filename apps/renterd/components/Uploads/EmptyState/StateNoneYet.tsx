import { Code, LinkButton, Text } from '@siafoundation/design-system'
import { CloudUpload32 } from '@siafoundation/react-icons'
import { routes } from '../../../config/routes'
import { useFilesManager } from '../../../contexts/filesManager'

export function StateNoneYet() {
  const { activeBucketName: activeBucket } = useFilesManager()
  return (
    <div className="flex flex-col gap-10 justify-center items-center h-[400px]">
      <Text>
        <CloudUpload32 className="scale-[200%]" />
      </Text>
      <div className="flex flex-col gap-3 items-center">
        <Text color="subtle" className="text-center max-w-[500px]">
          The <Code>{activeBucket}</Code> bucket does not have any active
          uploads.
        </Text>
        <LinkButton
          href={routes.buckets.index}
          onClick={(e) => {
            e.stopPropagation()
          }}
        >
          View buckets list
        </LinkButton>
      </div>
    </div>
  )
}
