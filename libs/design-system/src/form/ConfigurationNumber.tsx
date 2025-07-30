import BigNumber from 'bignumber.js'
import { TipNumber } from './TipNumber'
import { FieldValues, Path, PathValue, UseFormReturn } from 'react-hook-form'
import { ConfigFields } from './configurationFields'
import { FieldError } from '../components/Form'
import { FieldNumber } from './FieldNumber'
import { useFormSetField } from './useFormSetField'

type Props<Values extends FieldValues, Categories extends string> = {
  name: Path<Values>
  form: UseFormReturn<Values>
  fields: ConfigFields<Values, Categories>
}

export function ConfigurationNumber<
  Values extends FieldValues,
  Categories extends string,
>({ name, form, fields }: Props<Values, Categories>) {
  const field = fields[name]
  const {
    median,
    medianTip,
    suggestionLabel,
    suggestion,
    suggestionTip,
    decimalsLimit = 2,
    after,
    units,
  } = field
  const setField = useFormSetField({
    form,
    fields,
    name,
  })
  const After = after || (() => null)

  return (
    <div className="flex flex-col gap-3 items-end">
      <div className="flex flex-col gap-3 w-[260px]">
        <FieldNumber name={name} fields={fields} form={form} group={false} />
        {median && (
          <TipNumber
            type="number"
            label="Network median"
            tip={medianTip || 'Median value provided by Siascan.'}
            decimalsLimit={decimalsLimit}
            value={median as BigNumber}
            onClick={() => {
              setField(median as PathValue<Values, Path<Values>>, true)
            }}
          />
        )}
        {suggestion && suggestionTip && (
          <TipNumber
            type="number"
            label={suggestionLabel || 'Suggestion'}
            tip={suggestionTip}
            decimalsLimit={decimalsLimit}
            value={suggestion as BigNumber}
            units={units}
            onClick={() => {
              setField(suggestion as PathValue<Values, Path<Values>>, true)
            }}
          />
        )}
        <After name={name} form={form} fields={fields} />
      </div>
      <div className="h-[20px]">
        <FieldError form={form} name={name} />
      </div>
    </div>
  )
}
