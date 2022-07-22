import { Box } from './Box'
import { Tooltip } from './Tooltip'
import { Information16 } from '../icons'

type Props = {
  children: React.ReactNode
}

export function InfoTip({ children }: Props) {
  return (
    <Tooltip content={children}>
      <Box
        css={{
          display: 'inline-block',
          mx: '$0-5',
          position: 'relative',
          transform: 'scale(0.75)',
        }}
      >
        <Information16 />
      </Box>
    </Tooltip>
  )
}
