import { Text } from '@siafoundation/design-system'
import { Document16, Image16, Video16 } from '@siafoundation/react-icons'

export function FileSearchEmpty({
  debouncedSearch,
}: {
  search: string
  debouncedSearch: string
}) {
  return (
    <Text
      color="verySubtle"
      className="flex flex-col gap-2 justify-center items-center mt-5 mb-3"
    >
      <Text
        color="verySubtle"
        className="flex gap-2 justify-center items-center"
      >
        <Image16 />
        <Video16 />
        <Document16 />
      </Text>
      <Text size="12" color="verySubtle" className="flex justify-center">
        {debouncedSearch
          ? 'No files match the query.'
          : 'Type a query to get started.'}
      </Text>
    </Text>
  )
}
