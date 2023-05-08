import { SiacoinField } from '../core/SiacoinField'
import { ConfigurationTipNumber } from './ConfigurationTipNumber'
import { toHastings } from '@siafoundation/sia-js'
import { FieldValues, Path, PathValue, UseFormReturn } from 'react-hook-form'
import { FieldLabelAndError } from '../components/Form'
import { ConfigField } from './configurationFields'
import BigNumber from 'bignumber.js'
import { useCallback } from 'react'

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
    decimalsLimitSc = 6,
    decimalsLimitFiat = 6,
    tipsDecimalsLimitSc = 0,
  } = field
  const value = form.getValues(name)
  const error =
    form.formState.touchedFields[name] && !!form.formState.errors[name]
  const { onBlur } = form.register(name, field.validation)
  const onChange = useCallback(
    (val: PathValue<Values, Path<Values>>) => {
      form.setValue(name, val, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true,
      })
      field.trigger?.forEach((t) => form.trigger(t))
    },
    [name, form, field]
  )
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
            onChange(val as PathValue<Values, Path<Values>>)
          }}
          onBlur={(e) => {
            onBlur(e)
            onChange(value)
          }}
        />
        {average && (
          <ConfigurationTipNumber
            type="siacoin"
            label="Network average"
            tip="Averages provided by Sia Central."
            decimalsLimit={tipsDecimalsLimitSc}
            value={toHastings(average as BigNumber)}
            onClick={() => {
              onChange(average as PathValue<Values, Path<Values>>)
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
              onChange(suggestion as PathValue<Values, Path<Values>>)
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
