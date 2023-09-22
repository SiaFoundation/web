import { Filter32, Text } from '@siafoundation/design-system'

type Props = {
  filtered: boolean
}

export function StateEmpty({ filtered }: Props) {
  return (
    <div className="flex flex-col gap-8 justify-center items-center h-[300px]">
      <Text>
        <Filter32 className="scale-[200%]" />
      </Text>
      <Text color="subtle" className="text-center max-w-[500px]">
        {filtered ? 'No matching alerts.' : 'No alerts.'}
      </Text>
    </div>
  )
}
