import { Text } from '../../core/Text'
import { MisuseOutline32 } from '@siafoundation/react-icons'
import { SWRError } from '@siafoundation/react-core'

type Props = {
  error?: SWRError
}

export function StateError({ error }: Props) {
  return (
    <div className="flex flex-col gap-10 justify-center items-center h-[400px]">
      <Text>
        <MisuseOutline32 className="scale-[200%]" />
      </Text>
      <Text color="subtle" className="text-center max-w-[500px]">
        Error loading data. Please try again later.
      </Text>
    </div>
  )
}
