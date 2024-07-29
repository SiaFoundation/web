import { TipNumber } from './TipNumber'
import { toHastings } from '@siafoundation/units'
import { FieldValues, Path, PathValue } from 'react-hook-form'
import { FieldError } from '../components/Form'
import { FieldProps } from './configurationFields'
import BigNumber from 'bignumber.js'
import { FieldSiacoin } from './FieldSiacoin'
import { useFormSetField } from './useFormSetField'

export function ConfigurationSiacoin<
  Values extends FieldValues,
  Categories extends string
>({ name, form, fields }: FieldProps<Values, Categories>) {
  const field = fields[name]
  const {
    average,
    averageTip,
    suggestionLabel,
    suggestion,
    suggestionTip,
    before,
    after,
    tipsDecimalsLimitSc = 0,
  } = field
  const setField = useFormSetField({
    name,
    fields,
    form,
  })
  const Before = before || (() => null)
  const After = after || (() => null)
  return (
    <div className="flex flex-col gap-3 items-end">
      <div className="flex flex-col w-[260px]">
        <Before name={name} form={form} fields={fields} />
        <div className="flex flex-col gap-3 w-[260px]">
          <FieldSiacoin
            name={name}
            fields={fields}
            form={form}
            group={false}
            size="small"
          />
          {average && (
            <TipNumber
              type="siacoin"
              label="Network average"
              tip={averageTip || 'Averages provided by Sia Central.'}
              decimalsLimit={tipsDecimalsLimitSc}
              value={toHastings(average as BigNumber)}
              onClick={() => {
                setField(average as PathValue<Values, Path<Values>>, true)
              }}
            />
          )}
          {suggestion && suggestionTip && (
            <TipNumber
              type="siacoin"
              label={suggestionLabel || 'Suggestion'}
              tip={suggestionTip}
              decimalsLimit={tipsDecimalsLimitSc}
              value={toHastings(suggestion as BigNumber)}
              onClick={() => {
                setField(suggestion as PathValue<Values, Path<Values>>, true)
              }}
            />
          )}
          <After name={name} form={form} fields={fields} />
        </div>
      </div>
      <div className="h-[20px]">
        <FieldError form={form} name={name} />
      </div>
    </div>
  )
}
