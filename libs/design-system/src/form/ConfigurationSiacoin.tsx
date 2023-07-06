import { SiacoinField } from '../core/SiacoinField'
import { ConfigurationTipNumber } from './ConfigurationTipNumber'
import { toHastings } from '@siafoundation/sia-js'
import { FieldValues, Path, PathValue, UseFormReturn } from 'react-hook-form'
import { FieldLabelAndError } from '../components/Form'
import { ConfigField, useRegisterForm } from './configurationFields'
import BigNumber from 'bignumber.js'

type Props<Values extends FieldValues, Categories extends string> = {
  name: Path<Values>
  form: UseFormReturn<Values>
  field: ConfigField<Values, Categories>
}

export function ConfigurationSiacoin<
  Values extends FieldValues,
  Categories extends string
>({ name, form, field }: Props<Values, Categories>) {
  const {
    average,
    suggestion,
    units,
    suggestionTip,
    averageTip,
    decimalsLimitSc = 6,
    decimalsLimitFiat = 6,
    tipsDecimalsLimitSc = 0,
  } = field
  const { setValue, value, error } = useRegisterForm({
    name,
    field,
    form,
  })
  return (
    <div className="flex flex-col gap-3 items-end">
      <div className="flex flex-col gap-3 w-[220px]">
        <SiacoinField
          name={name}
          size="small"
          sc={value}
          units={units}
          decimalsLimitSc={decimalsLimitSc}
          decimalsLimitFiat={decimalsLimitFiat}
          error={error}
          changed={form.formState.dirtyFields[name]}
          placeholder={(suggestion as BigNumber) || (average as BigNumber)}
          onChange={(val) => {
            setValue(val as PathValue<Values, Path<Values>>, true)
          }}
          onBlur={() => {
            setValue(value, true)
          }}
        />
        {average && (
          <ConfigurationTipNumber
            type="siacoin"
            label="Network average"
            tip={averageTip || 'Averages provided by Sia Central.'}
            decimalsLimit={tipsDecimalsLimitSc}
            value={toHastings(average as BigNumber)}
            onClick={() => {
              setValue(average as PathValue<Values, Path<Values>>, true)
            }}
          />
        )}
        {suggestion && suggestionTip && (
          <ConfigurationTipNumber
            type="siacoin"
            label="Suggestion"
            tip={suggestionTip}
            decimalsLimit={tipsDecimalsLimitSc}
            value={toHastings(suggestion as BigNumber)}
            onClick={() => {
              setValue(suggestion as PathValue<Values, Path<Values>>, true)
            }}
          />
        )}
      </div>
      <div className="h-[20px]">
        <FieldLabelAndError form={form} name={name} />
      </div>
    </div>
  )
}
