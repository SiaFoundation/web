import { Tooltip } from './Tooltip'
import { Information16 } from '../icons/carbon'

type Props = {
  children: React.ReactNode
}

export function InfoTip({ children }: Props) {
  return (
    <Tooltip content={children}>
      <div className="inline mx-1 relative scale-75">
        <Information16 />
      </div>
    </Tooltip>
  )
}
