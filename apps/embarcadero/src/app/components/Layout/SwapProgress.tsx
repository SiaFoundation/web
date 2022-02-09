import { Flex, ProgressBar, Status, Text } from '@siafoundation/design-system'
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
    <Flex gap="1" css={{ width: '100%' }}>
      <Text>{status}</Text>
      <Flex>
        {step}
        <Status variant="green" />
      </Flex>
      <ProgressBar value={step * 25} />
    </Flex>
  )
}
