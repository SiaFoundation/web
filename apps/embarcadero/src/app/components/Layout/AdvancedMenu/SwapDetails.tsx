import { Codeblock } from '@siafoundation/design-system'
import { usePathParams } from '../../../hooks/useHashParam'
import { useSwap } from '../../../hooks/useSwap'

export function SwapDetails() {
  const { hash } = usePathParams()
  const { summary } = useSwap(hash)

  return (
    <pre>
      <Codeblock css={{ overflow: 'auto' }}>
        {JSON.stringify(summary, null, 2)}
      </Codeblock>
    </pre>
  )
}
