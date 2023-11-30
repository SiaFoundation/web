import { Code, LinkButton, Text } from '@siafoundation/design-system'
import { CloudUpload32 } from '@siafoundation/react-icons'
import { routes } from '../../../config/routes'
import { useFiles } from '../../../contexts/files'

export function StateNoneYet() {
  const { activeBucket } = useFiles()
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
          href={routes.files.index}
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
