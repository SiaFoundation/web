import { NumberField } from '../core/NumberField'
import BigNumber from 'bignumber.js'
import { FieldValues, Path, PathValue } from 'react-hook-form'
import { FieldGroup } from '../components/Form'
import {
  FieldProps,
  getFormStateFieldBoolean,
  useRegisterForm,
} from './configurationFields'
import { ChartArea16 } from '@siafoundation/react-icons'
import { Panel } from '../core/Panel'
import { Text } from '../core/Text'
import { toHastings } from '@siafoundation/units'
import { CurrencyId, currencyOptions } from '@siafoundation/react-core'
import { useExternalExchangeRate } from '../hooks/useExternalExchangeRate'
import { useMemo } from 'react'
import { Tooltip } from '../core/Tooltip'
import { ValueSc } from '../components/ValueSc'
import { cx } from 'class-variance-authority'

export function FieldFiat<
  Values extends FieldValues,
  Categories extends string,
>({
  name,
  form,
  fields,
  size = 'small',
  currency,
  group = true,
}: FieldProps<Values, Categories> & {
  size?: React.ComponentProps<typeof NumberField>['size']
  currency: CurrencyId | ''
  group?: boolean
}) {
  const exchangeRate = useExternalExchangeRate({
    currency: currency || undefined,
  })
  const rate = exchangeRate.rate
  const field = fields[name]
  const { placeholder, decimalsLimit = 2, units } = field
  const { setValue, onBlur, error, value } = useRegisterForm({
    form,
    field,
    name,
  })
  const currencyOption = useMemo(
    () => currencyOptions.find((c) => c.id === currency),
    [currency],
  )
  const changed = getFormStateFieldBoolean(form.formState.dirtyFields, name)
  const el = (
    <div
      className={cx(
        'flex flex-col',
        'focus-within:ring ring-blue-500 dark:ring-blue-200',
        'border',
        field.readOnly
          ? 'bg-gray-200 dark:bg-graydark-300'
          : 'bg-white dark:bg-graydark-50',
        field.readOnly ? 'pointer-events-none' : '',
        field.readOnly
          ? 'border-blue-400 dark:border-blue-400'
          : error
            ? 'border-red-500 dark:border-red-400'
            : changed
              ? 'border-green-500 dark:border-green-400'
              : 'border-gray-200 dark:border-graydark-200',
        'rounded',
      )}
    >
      <NumberField
        name={name}
        value={value}
        units={`${currencyOption?.label || '?'}${units || ''}`}
        prefix={currencyOption?.prefix}
        size={size}
        variant="ghost"
        focus="none"
        readOnly={field.readOnly}
        decimalsLimit={currencyOption?.fixed || decimalsLimit}
        placeholder={placeholder ? new BigNumber(placeholder) : undefined}
        state={error ? 'invalid' : changed ? 'valid' : 'default'}
        onChange={(val) => {
          const v = val !== undefined ? new BigNumber(val) : undefined
          setValue(v as PathValue<Values, Path<Values>>, true)
        }}
        onBlur={onBlur}
      />
      {rate && (
        <SiacoinPinnedValue value={value} currency={currency} rate={rate} />
      )}
    </div>
  )

  if (group) {
    return (
      <FieldGroup title={field.title} name={name} form={form} wrap>
        {el}
      </FieldGroup>
    )
  }

  return el
}

function SiacoinPinnedValue({
  value,
  rate,
}: {
  value: BigNumber
  currency: CurrencyId | ''
  rate: BigNumber
}) {
  const available = value && !value.isZero() && rate && !rate.isZero()
  const sc = available ? toHastings(value).div(rate) : new BigNumber(0)
  return (
    <Panel className="flex gap-1 items-center justify-between relative overflow-hidden px-2 py-1.5 rounded-t-none">
      <Tooltip side="bottom" content="The pinned value's current siacoin value">
        <Text className="flex gap-1 relative" size="12">
          <ChartArea16 />
          Current value
        </Text>
      </Tooltip>
      {available ? (
        <ValueSc
          value={sc}
          size="12"
          variant="value"
          fixed={0}
          dynamicUnits={true}
          hastingUnits={false}
          tipSide="bottom"
        />
      ) : (
        <Text size="12" ellipsis color={available ? 'contrast' : 'verySubtle'}>
          -
        </Text>
      )}
    </Panel>
  )
}
