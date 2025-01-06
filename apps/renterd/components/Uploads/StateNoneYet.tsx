import { Code, LinkButton, Text } from '@siafoundation/design-system'
import { CloudUpload32 } from '@siafoundation/react-icons'
import { routes } from '../../config/routes'
import { useFilesManager } from '../../contexts/filesManager'
import { useUploads } from '../../contexts/uploads'

export function StateNoneYet() {
  const { activeView } = useUploads()
  const { activeBucketName: activeBucket } = useFilesManager()

  const href = activeBucket
    ? routes.buckets.files
        .replace('[bucket]', activeBucket)
        .replace('[path]', '')
    : routes.buckets.index

  return (
    <div className="flex flex-col gap-10 justify-center items-center h-[400px]">
      <Text>
        <CloudUpload32 className="scale-[200%]" />
      </Text>
      <div className="flex flex-col gap-3 items-center">
        <Text color="subtle" className="text-center max-w-[500px]">
          {activeView === 'localUploads' ? (
            <>
              The <Code>{activeBucket}</Code> bucket does not have any active
              uploads from this session.
            </>
          ) : (
            <>
              The <Code>{activeBucket}</Code> bucket does not have any active
              uploads.
            </>
          )}
        </Text>
        <LinkButton
          href={href}
          onClick={(e) => {
            e.stopPropagation()
          }}
        >
          {activeBucket ? 'View files' : 'View buckets list'}
        </LinkButton>
      </div>
    </div>
  )
}
