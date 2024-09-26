import { Button, Code, LinkButton, Text } from '@siafoundation/design-system'
import { CloudUpload32 } from '@siafoundation/react-icons'
import { routes } from '../../../config/routes'
import { useFilesManager } from '../../../contexts/filesManager'

export function StateNoneYetFiles() {
  const {
    activeBucketName: activeBucket,
    activeDirectory,
    setActiveDirectory,
  } = useFilesManager()
  if (activeDirectory.length > 1) {
    return (
      <div className="flex flex-col gap-10 justify-center items-center h-[400px] cursor-pointer">
        <Text>
          <CloudUpload32 className="scale-[200%]" />
        </Text>
        <div className="flex flex-col gap-3 items-center">
          <Text color="subtle" className="text-center max-w-[500px]">
            The current directory does not contain any files yet, drag and drop
            files or click here to start uploading.
          </Text>
          <Button
            onClick={(e) => {
              e.stopPropagation()
              setActiveDirectory((prev) => prev.slice(0, -1))
            }}
          >
            Back
          </Button>
        </div>
      </div>
    )
  }
  return (
    <div className="flex flex-col gap-10 justify-center items-center h-[400px] cursor-pointer">
      <Text>
        <CloudUpload32 className="scale-[200%]" />
      </Text>
      <div className="flex flex-col gap-3 items-center">
        <Text color="subtle" className="text-center max-w-[500px]">
          The <Code>{activeBucket}</Code> bucket does not contain any files,
          drag and drop files or click here to start uploading.
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
