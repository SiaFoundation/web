import type BigNumber from 'bignumber.js'
import type {
  FieldValues,
  Path,
  PathValue,
  UseFormReturn,
} from 'react-hook-form'
import { FieldError } from '../components/Form'
import { FieldNumber } from './FieldNumber'
import { TipNumber } from './TipNumber'
import type { ConfigFields } from './configurationFields'
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
    average,
    averageTip,
    suggestion,
    suggestionTip,
    decimalsLimit = 2,
    after,
    units,
  } = field
  const setField = useFormSetField({
    form,
    field,
    name,
  })
  const After = after || (() => null)

  return (
    <div className="flex flex-col gap-3 items-end">
      <div className="flex flex-col gap-3 w-[250px]">
        <FieldNumber name={name} fields={fields} form={form} group={false} />
        {average && (
          <TipNumber
            type="number"
            label="Network average"
            tip={averageTip || 'Averages provided by Sia Central.'}
            decimalsLimit={decimalsLimit}
            value={average as BigNumber}
            onClick={() => {
              setField(average as PathValue<Values, Path<Values>>, true)
            }}
          />
        )}
        {suggestion && suggestionTip && (
          <TipNumber
            type="number"
            label="Suggestion"
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
