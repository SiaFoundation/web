import {
  Box,
  Flex,
  Heading,
  ProgressBar,
  Text,
} from '@siafoundation/design-system'
import { capitalize, kebabCase } from 'lodash'
import { usePathParams } from '../../hooks/useHashParam'
import { SwapStatus, useSwap } from '../../hooks/useSwap'

const stepMap = {
  waitingForYouToAccept: 1,
  waitingForCounterpartyToAccept: 2,
  waitingForCounterpartyToFinish: 3,
  waitingForYouToFinish: 4,
} as Record<SwapStatus, number>

export function SwapProgress() {
  const { hash } = usePathParams()
  const { status } = useSwap(hash)

  const step = status ? stepMap[status] : 0

  return (
    <Flex direction="column" gap="3" css={{ width: '100%' }}>
      <Heading>{capitalize(kebabCase(status).split('-').join(' '))}</Heading>
      <Box>
        <ProgressBar value={step * 25} variant="gradient" />
      </Box>
      <ProgressBar variant="gradient" />
    </Flex>
  )
}
