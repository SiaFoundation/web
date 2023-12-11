import { Tooltip } from './Tooltip'
import { Information16 } from '@siafoundation/react-icons'
import { Text } from './Text'

type Props = {
  children: React.ReactNode
}

export function InfoTip({ children }: Props) {
  return (
    <Tooltip content={children}>
      <div className="relative items-center inline mx-1">
        <Text color="subtle">
          <Information16 className="scale-75" />
        </Text>
      </div>
    </Tooltip>
  )
}
