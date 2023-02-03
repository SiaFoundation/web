import { NumberField } from '../core/NumberField'
import { toFixedMax } from '../lib/numbers'
import BigNumber from 'bignumber.js'
import { ConfigurationTipNumber } from './ConfigurationTipNumber'

type Props = {
  average?: BigNumber
  suggestion?: BigNumber
  suggestionTip?: React.ReactNode
  units?: string
  value: BigNumber
  onChange: (value: BigNumber) => void
  decimalsLimit?: number
  changed?: boolean
}

export function ConfigurationNumber({
  average,
  suggestion,
  suggestionTip,
  decimalsLimit = 2,
  units,
  value,
  onChange,
  changed,
}: Props) {
  return (
    <div className="flex flex-col gap-3 w-[220px]">
      <NumberField
        value={value ? toFixedMax(value, decimalsLimit) : ''}
        units={units}
        decimalsLimit={decimalsLimit}
        state={changed ? 'valid' : 'default'}
        onValueChange={(val) => {
          onChange(new BigNumber(val || 0))
        }}
      />
      <div className="flex flex-col gap-2">
        {average && (
          <ConfigurationTipNumber
            type="number"
            label="Network average"
            tip="Averages provided by Sia Central."
            decimalsLimit={decimalsLimit}
            value={average}
            units={units}
            onChange={onChange}
          />
        )}
        {suggestion && suggestionTip && (
          <ConfigurationTipNumber
            type="number"
            label="Suggestion"
            tip={suggestionTip}
            decimalsLimit={decimalsLimit}
            value={suggestion}
            units={units}
            onChange={onChange}
          />
        )}
      </div>
    </div>
  )
}
