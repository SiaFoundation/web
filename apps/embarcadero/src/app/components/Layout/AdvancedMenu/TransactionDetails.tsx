import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Codeblock,
  Text,
} from '@siafoundation/design-system'
import { usePathParams } from '../../../hooks/useHashParam'
import { SwapTransaction, useSwap } from '../../../hooks/useSwap'

export function TransactionDetails() {
  const { hash } = usePathParams()
  const { transaction } = useSwap(hash)

  if (!transaction) {
    return null
  }

  const keys = Object.keys(transaction) as (keyof SwapTransaction)[]

  return (
    <Accordion type="multiple">
      {keys.map((key) => (
        <AccordionItem value={key}>
          <AccordionTrigger>
            <Text size="3" css={{ fontWeight: 500 }}>
              {key} ({transaction[key]?.length || 0})
            </Text>
          </AccordionTrigger>
          <AccordionContent>
            <pre>
              <Codeblock css={{ overflow: 'auto' }}>
                {JSON.stringify(transaction[key], null, 2)}
              </Codeblock>
            </pre>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}
