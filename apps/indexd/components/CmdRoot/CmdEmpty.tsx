import { Text } from '@siafoundation/design-system'
import { Query16 } from '@siafoundation/react-icons'

export type CmdEmptyProps = { search: string; debouncedSearch: string }

export function CmdEmptyDefault({ search }: CmdEmptyProps) {
  return (
    <Text
      color="verySubtle"
      className="flex flex-col gap-2 justify-center items-center mt-5 mb-3"
    >
      <Text
        color="verySubtle"
        className="flex gap-2 justify-center items-center"
      >
        <Query16 />
      </Text>
      <Text size="12" color="verySubtle" className="flex justify-center">
        {search ? 'No results matching query.' : 'Type a query to get started.'}
      </Text>
    </Text>
  )
}
