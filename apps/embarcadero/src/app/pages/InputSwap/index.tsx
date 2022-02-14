import { ArrowRightIcon } from '@radix-ui/react-icons'
import {
  Box,
  Button,
  Flex,
  Label,
  TextArea,
} from '@siafoundation/design-system'
import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Message } from '../../components/Message'
import { routes } from '../../routes'

export function InputSwap() {
  const [hash, setHash] = useState<string>()
  const history = useHistory()

  return (
    <Flex direction="column" align="center" gap="3">
      <Message
        message={`
          Retrieve a swap from your counterparty and enter it below to load details.
      `}
      />
      <TextArea
        size="3"
        rows={4}
        spellCheck={false}
        placeholder="AQAAAAAAAAAAJmt934HvmrpjrN/dw81A7uP/q3njxItauYOseNKhZgAAAAAAAAAAAQAAAAAAAABlZDI1NTE5AAAAAAAAAAAAIAAAAAAAAADr/DOGVqdslIuDnu1KgOFrPhGGWxnjD61/IumS4IYTsQEAAAAAAAAAAQAAAAAAAACochmiRPawAKmzcb"
        value={hash || ''}
        onChange={(e) => setHash(e.target.value)}
        css={{
          width: '100%',
          color: '$gray10',
        }}
      />
      <Button
        disabled={!hash}
        variant="green"
        size="3"
        css={{ width: '100%' }}
        onClick={() =>
          hash &&
          history.push(routes.step.replace(':hash', encodeURIComponent(hash)))
        }
      >
        View transaction
        <Box as="span" css={{ pl: '$1', lh: '1' }}>
          <ArrowRightIcon />
        </Box>
      </Button>
    </Flex>
  )
}
