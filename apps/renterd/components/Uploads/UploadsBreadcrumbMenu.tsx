import { Text, ScrollArea } from '@siafoundation/design-system'
import { ChevronRight16 } from '@siafoundation/react-icons'
import { useFilesManager } from '../../contexts/filesManager'
import { FilesExplorerModeButton } from '../Files/FilesExplorerModeButton'

export function UploadsBreadcrumbMenu() {
  const { activeBucketName: activeBucket, setActiveDirectory } =
    useFilesManager()

  return (
    <div className="flex gap-2 items-center h-full">
      <FilesExplorerModeButton />
      <ScrollArea>
        <div className="flex gap-1 items-center h-full">
          <Text
            onClick={() => setActiveDirectory(() => [])}
            size="18"
            weight="semibold"
            className="flex items-center cursor-pointer"
            noWrap
          >
            Buckets
          </Text>
          <Text size="16" color="verySubtle" className="flex items-center">
            <ChevronRight16 />
          </Text>
          <Text
            onClick={() => {
              if (!activeBucket) {
                return
              }
              setActiveDirectory(() => [activeBucket])
            }}
            size="18"
            weight="semibold"
            className="flex items-center cursor-pointer"
            noWrap
          >
            {activeBucket}
          </Text>
          <Text size="16" color="verySubtle" className="flex items-center">
            <ChevronRight16 />
          </Text>
          <Text
            size="18"
            weight="semibold"
            className="flex items-center cursor-pointer"
            noWrap
          >
            Uploads
          </Text>
        </div>
      </ScrollArea>
    </div>
  )
}
