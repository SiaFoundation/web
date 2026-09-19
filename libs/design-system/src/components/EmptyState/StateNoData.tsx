import { Text } from '../../core/Text'
import { ChartArea32 } from '@siafoundation/react-icons'
import { cn } from '../../lib/ui'

export function StateNoData({
  message,
  className,
}: {
  message?: string
  className?: string
}) {
  return (
    <div
      className={cn(
        'flex flex-col gap-10 justify-center items-center h-[400px]',
        className,
      )}
    >
      <Text>
        <ChartArea32 className="scale-[200%]" />
      </Text>
      <Text color="subtle" className="text-center max-w-[500px]">
        {message ?? 'No data available.'}
      </Text>
    </div>
  )
}
