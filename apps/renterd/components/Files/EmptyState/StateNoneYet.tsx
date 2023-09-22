import { Text } from '@siafoundation/design-system'
import { CloudUpload32 } from '@siafoundation/react-icons'

export function StateNoneYet() {
  return (
    <div className="flex flex-col gap-10 justify-center items-center h-[400px] cursor-pointer">
      <Text>
        <CloudUpload32 className="scale-[200%]" />
      </Text>
      <Text color="subtle" className="text-center max-w-[500px]">
        No files, drag and drop files or click here to start uploading.
      </Text>
    </div>
  )
}
