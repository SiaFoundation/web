import { Box, Flex, Text, TextField } from '@siafoundation/design-system'
import { useMemo } from 'react'
import { useSiaStats } from './useSiaStats'
import { useWallet } from './useWallet'

type Props = {
  disabled?: boolean
  isOffer?: boolean
  currency: 'SF' | 'SC'
  type: 'integer' | 'decimal'
  value: string | undefined
  onChange: (value: string | undefined) => void
}

export function Input({
  currency,
  isOffer,
  type,
  disabled = false,
  value,
  onChange,
}: Props) {
  const { data } = useSiaStats()
  const { data: wallet } = useWallet()
  const scPrice = data?.coin_price_USD

  const hasAvailableBalance = useMemo(() => {
    if (!isOffer || !value) {
      return true
    }
    if (currency === 'SC') {
      return Number(wallet?.confirmedsiacoinbalance) >= Number(value)
    }
    return Number(wallet?.siafundbalance) >= Number(value)
  }, [isOffer, currency, value, wallet])

  return (
    <Flex
      direction="column"
      gap="2"
      css={{
        backgroundColor: '$gray3',
        border: '2px solid',
        borderColor: !hasAvailableBalance ? '$red8' : 'transparent',
        borderRadius: '$2',
        padding: '$2',
      }}
    >
      <Box
        css={{
          position: 'relative',
        }}
      >
        <TextField
          disabled={disabled}
          size="3"
          variant="totalGhost"
          noSpin
          type="number"
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          placeholder={type === 'integer' ? '0' : '0.0'}
        />
        <Flex
          align="center"
          css={{
            position: 'absolute',
            top: 0,
            right: '5px',
            backgroundColor: '$gray4',
            borderRadius: '$2',
            border: '1px solid $gray5',
            height: '100%',
            padding: '$1 $2',
          }}
        >
          <Text css={{ fontWeight: 'bolder' }}>{currency}</Text>
        </Flex>
      </Box>
      {!hasAvailableBalance && <Text>Insufficient funds</Text>}
      {currency === 'SC' && value && scPrice && (
        <Text>${(scPrice * Number(value)).toLocaleString()} USD</Text>
      )}
    </Flex>
  )
}
