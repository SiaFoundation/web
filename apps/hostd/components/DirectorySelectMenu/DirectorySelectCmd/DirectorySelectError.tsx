import { Text } from '@siafoundation/design-system'
import { Folder16 } from '@siafoundation/react-icons'

export function DirectorySelectError() {
  return (
    <Text
      color="verySubtle"
      className="flex flex-col gap-2 justify-center items-center mt-5 mb-3"
    >
      <Text
        color="verySubtle"
        className="flex gap-2 justify-center items-center"
      >
        <Folder16 />
      </Text>
      <Text size="12" color="verySubtle" className="flex justify-center">
        Error loading directory.
      </Text>
    </Text>
  )
}
