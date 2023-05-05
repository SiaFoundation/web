import { MisuseOutline32, Text } from '@siafoundation/design-system'
import { SWRError } from '@siafoundation/react-core'

type Props = {
  autopilotMode: 'on' | 'off' | 'init'
  error?: SWRError
}

export function StateError({ autopilotMode, error }: Props) {
  let message = 'Error fetching hosts.'
  if (
    autopilotMode === 'on' &&
    error?.message.startsWith('failed to get host info: can not score')
  ) {
    message =
      'Error fetching hosts. Autopilot must be configured before using the hosts explorer.'
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
