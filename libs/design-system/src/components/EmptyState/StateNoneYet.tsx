import { Text } from '../../core/Text'
import { DataBase32 } from '@siafoundation/react-icons'

export function StateNoneYet({ message }: { message?: string }) {
  return (
    <div className="flex flex-col gap-10 justify-center items-center h-[400px]">
      <Text>
        <DataBase32 className="scale-[200%]" />
      </Text>
      <Text color="subtle" className="text-center max-w-[500px]">
        {message ?? 'There is no data yet.'}
      </Text>
    </div>
  )
}
