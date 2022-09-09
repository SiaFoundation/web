import { Flex, NumberField } from '../core'
import { toFixedMax } from '../lib/numbers'
import BigNumber from 'bignumber.js'
import { ConfigurationTip } from './ConfigurationTip'

type Props = {
  average?: BigNumber
  suggestion?: BigNumber
  suggestionTip?: string
  units: string
  value: BigNumber
  onChange: (value: BigNumber) => void
  decimalsLimit?: number
}

export function ConfigurationNumber({
  average,
  suggestion,
  suggestionTip,
  decimalsLimit = 2,
  units,
  value,
  onChange,
}: Props) {
  return (
    <Flex gap="1-5" direction="column" css={{ width: '220px' }}>
      <NumberField
        value={value ? toFixedMax(value, decimalsLimit) : ''}
        units={units}
        decimalsLimit={decimalsLimit}
        onValueChange={(val) => {
          onChange(new BigNumber(val || 0))
        }}
      />
      <Flex gap="1" direction="column">
        {average && (
          <ConfigurationTip
            type="number"
            label="Network average"
            tip="Averages provided by SiaCentral."
            decimalsLimit={decimalsLimit}
            value={average}
            units={units}
            onChange={onChange}
          />
        )}
        {suggestion && suggestionTip && (
          <ConfigurationTip
            type="number"
            label="Suggestion"
            tip={suggestionTip}
            decimalsLimit={decimalsLimit}
            value={suggestion}
            units={units}
            onChange={onChange}
          />
        )}
      </Flex>
    </Flex>
  )
}
