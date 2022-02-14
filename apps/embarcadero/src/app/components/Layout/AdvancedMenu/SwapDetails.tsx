import { Codeblock, Text } from '@siafoundation/design-system'
import { usePathParams } from '../../../hooks/useHashParam'
import { useSwap } from '../../../hooks/useSwap'

export function SwapDetails() {
  const { hash } = usePathParams()
  const { summary } = useSwap(hash)

  if (!summary) {
    return (
      <Text css={{ p: '$3 $2', color: '$slate9' }}>
        Load a swap to view details
      </Text>
    )
  }

  return (
    <pre>
      <Codeblock css={{ overflow: 'auto' }}>
        {JSON.stringify(summary, null, 2)}
      </Codeblock>
    </pre>
  )
}
