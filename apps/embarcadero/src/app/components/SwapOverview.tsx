import { ArrowDownIcon } from '@radix-ui/react-icons'
import { Box, Flex } from '@siafoundation/design-system'
import { Input } from './Input'
import { useSwap } from '../hooks/useSwap'

type Props = {
  hash: string
}

export function SwapOverview({ hash }: Props) {
  const { offerSc, sc, sf } = useSwap(hash)

  return (
    <Flex direction="column" align="center" css={{ width: '100%' }}>
      <Box css={{ width: '100%', order: offerSc ? 1 : 3 }}>
        <Input
          currency="SC"
          type="decimal"
          disabled
          value={sc?.toString()}
          isOffer={offerSc}
        />
      </Box>
      <Box css={{ width: '100%', order: offerSc ? 3 : 1 }}>
        <Input
          currency="SF"
          type="integer"
          disabled
          value={sf?.toString()}
          isOffer={!offerSc}
        />
      </Box>
      <Box css={{ height: '$2', zIndex: '$1', order: 2 }}>
        <Box
          css={{
            position: 'relative',
            top: '-15px',
            height: '40px',
            width: '40px',
            backgroundColor: '$loContrast',
            borderRadius: '15px',
          }}
        >
          <Flex
            align="center"
            justify="center"
            css={{
              backgroundColor: '$gray4',
              borderRadius: '$4',
              position: 'absolute',
              transform: 'translate(-50%, -50%)',
              left: '50%',
              top: '50%',
              height: '30px',
              width: '30px',
            }}
          >
            <ArrowDownIcon />
          </Flex>
        </Box>
      </Box>
    </Flex>
  )
}
