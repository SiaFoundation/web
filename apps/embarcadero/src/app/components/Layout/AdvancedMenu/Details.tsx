import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Text,
} from '@siafoundation/design-system'
import { SwapDetails } from './SwapDetails'
import { TransactionDetails } from './TransactionDetails'

export function Details() {
  return (
    <Accordion type="single" css={{ width: '100%' }}>
      <AccordionItem value="swap">
        <AccordionTrigger>
          <Text size="3" css={{ fontWeight: 500 }}>
            Swap
          </Text>
        </AccordionTrigger>
        <AccordionContent>
          <SwapDetails />
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="transaction">
        <AccordionTrigger>
          <Text size="3" css={{ fontWeight: 500 }}>
            Transaction
          </Text>
        </AccordionTrigger>
        <AccordionContent css={{ pl: '$3' }}>
          <TransactionDetails />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
