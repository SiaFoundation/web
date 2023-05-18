import { MisuseOutline32, Text } from '@siafoundation/design-system'
import { SWRError } from '@siafoundation/react-core'
import { StateNoneYet } from './StateNoneYet'

type Props = {
  error?: SWRError
}

export function StateError({ error }: Props) {
  const message = 'Error fetching contracts.'
  // Ideally this should not happen but for some reason get 404 sometimes
  // when a node has no contracts yet - send to none yet state.
  if (error?.message.startsWith('404')) {
    return <StateNoneYet />
  }
  return (
    <div className="flex flex-col gap-10 justify-center items-center h-[400px]">
      <Text>
        <MisuseOutline32 className="scale-[200%]" />
      </Text>
      <Text color="subtle" className="text-center max-w-[500px]">
        {message}
      </Text>
    </div>
  )
}
