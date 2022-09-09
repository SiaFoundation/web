import { SiacoinField, Flex } from '../core'
import { toHastings, toSiacoins } from '@siafoundation/sia-js'
import BigNumber from 'bignumber.js'
import { ConfigurationTip } from './ConfigurationTip'

type Props = {
  average?: BigNumber
  suggestion?: BigNumber
  suggestionTip?: string
  value: BigNumber
  onChange: (value: BigNumber) => void
  decimalsLimitSc?: number
  decimalsLimitFiat?: number
}

export function ConfigurationSiacoin({
  average,
  suggestion,
  suggestionTip,
  decimalsLimitSc = 3,
  decimalsLimitFiat = 3,
  value,
  onChange,
}: Props) {
  return (
    <Flex gap="1-5" direction="column" css={{ width: '220px' }}>
      <SiacoinField
        size="1"
        sc={toSiacoins(value)}
        decimalsLimitSc={decimalsLimitSc}
        decimalsLimitFiat={decimalsLimitFiat}
        placeholder={
          suggestion
            ? toSiacoins(suggestion)
            : average
            ? toSiacoins(average)
            : undefined
        }
        onChange={(val) => onChange(toHastings(val || 0))}
      />
      <Flex gap="1" direction="column">
        {average && (
          <ConfigurationTip
            type="siacoin"
            label="Network average"
            tip="Averages provided by SiaCentral."
            decimalsLimit={decimalsLimitSc}
            value={average}
            onChange={onChange}
          />
        )}
        {suggestion && suggestionTip && (
          <ConfigurationTip
            type="siacoin"
            label="Suggestion"
            tip={suggestionTip}
            decimalsLimit={decimalsLimitSc}
            value={suggestion}
            onChange={onChange}
          />
        )}
      </Flex>
    </Flex>
  )
}
