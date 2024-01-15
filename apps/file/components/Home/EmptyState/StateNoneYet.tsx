import { Button, Text } from '@siafoundation/design-system'
import { CloudUpload32 } from '@siafoundation/react-icons'

export function StateNoneYet() {
  return (
    <div className="flex flex-col gap-10 justify-center items-center h-[400px] cursor-pointer">
      <Text>
        <CloudUpload32 className="scale-[200%]" />
      </Text>
      <div className="flex flex-col gap-3 items-center">
        <Text color="subtle" className="text-center max-w-[500px]">
          There are no files, drag and drop or click here to add files.
        </Text>
        <Button onClick={(e) => {}}>Add files</Button>
      </div>
    </div>
  )
}
