import { SiacoinField } from '../core/SiacoinField'
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
  changed?: boolean
}

export function ConfigurationSiacoin({
  average,
  suggestion,
  suggestionTip,
  decimalsLimitSc = 3,
  decimalsLimitFiat = 3,
  value,
  onChange,
  changed,
}: Props) {
  return (
    <div className="flex flex-col gap-3 w-[220px]">
      <SiacoinField
        size="small"
        sc={toSiacoins(value)}
        decimalsLimitSc={decimalsLimitSc}
        decimalsLimitFiat={decimalsLimitFiat}
        changed={changed}
        placeholder={
          suggestion
            ? toSiacoins(suggestion)
            : average
            ? toSiacoins(average)
            : undefined
        }
        onChange={(val) => onChange(toHastings(val || 0))}
      />
      <div className="flex flex-col gap-2">
        {average && (
          <ConfigurationTip
            type="siacoin"
            label="Network average"
            tip="Averages provided by Sia Central."
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
      </div>
    </div>
  )
}
