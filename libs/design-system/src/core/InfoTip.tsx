import { Tooltip } from './Tooltip'
import { Information16 } from '../icons/carbon'
import { Text } from './Text'

type Props = {
  children: React.ReactNode
}

export function InfoTip({ children }: Props) {
  return (
    <Tooltip content={children}>
      <Text className="inline mx-1 relative scale-75" color="subtle">
        <Information16 />
      </Text>
    </Tooltip>
  )
}
