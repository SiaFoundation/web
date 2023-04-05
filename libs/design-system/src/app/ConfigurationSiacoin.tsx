import { SiacoinField } from '../core/SiacoinField'
import BigNumber from 'bignumber.js'
import { ConfigurationTipNumber } from './ConfigurationTipNumber'
import { toHastings } from '@siafoundation/sia-js'

type Props = {
  average?: BigNumber
  suggestion?: BigNumber
  suggestionTip?: React.ReactNode
  value: BigNumber
  onChange: (value: BigNumber) => void
  decimalsLimitSc?: number
  decimalsLimitFiat?: number
  tipsDecimalsLimitSc?: number
  changed?: boolean
}

export function ConfigurationSiacoin({
  average,
  suggestion,
  suggestionTip,
  decimalsLimitSc = 6,
  decimalsLimitFiat = 6,
  tipsDecimalsLimitSc = 0,
  value,
  onChange,
  changed,
}: Props) {
  return (
    <div className="flex flex-col gap-3 w-[220px]">
      <SiacoinField
        size="small"
        sc={value}
        decimalsLimitSc={decimalsLimitSc}
        decimalsLimitFiat={decimalsLimitFiat}
        changed={changed}
        placeholder={suggestion || average}
        onChange={(val) => onChange(val || new BigNumber(0))}
      />
      <div className="flex flex-col gap-2">
        {average && (
          <ConfigurationTipNumber
            type="siacoin"
            label="Network average"
            tip="Averages provided by Sia Central."
            decimalsLimit={tipsDecimalsLimitSc}
            value={toHastings(average)}
            onClick={() => onChange(average)}
          />
        )}
        {suggestion && suggestionTip && (
          <ConfigurationTipNumber
            type="siacoin"
            label="Suggestion"
            tip={suggestionTip}
            decimalsLimit={tipsDecimalsLimitSc}
            value={toHastings(suggestion)}
            onClick={() => onChange(suggestion)}
          />
        )}
      </div>
    </div>
  )
}
