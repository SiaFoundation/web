import { Text } from '../../core/Text'
import { Filter32 } from '../../icons/carbon'

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
        {filtered ? 'No matching alerts.' : 'There are currently no alerts.'}
      </Text>
    </div>
  )
}
