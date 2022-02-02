import { Box, Flex, Text, TextField } from '@siafoundation/design-system'
import { useState } from 'react'
import useSWR from 'swr'
import { useSiaStats } from './useSiaStats'

type Props = {
  currency: 'SF' | 'SC'
  type: 'integer' | 'decimal'
  value: string | undefined
  onChange: (value: string | undefined) => void
}

export function Input({ currency, type, value, onChange }: Props) {
  const { data } = useSiaStats()
  const scPrice = data?.coin_price_USD
  return (
    <Flex
      direction="column"
      gap="2"
      css={{
        backgroundColor: '$gray3',
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
      {currency === 'SC' && value && scPrice && (
        <Text>${(scPrice * Number(value)).toLocaleString()} USD</Text>
      )}
    </Flex>
  )
}
