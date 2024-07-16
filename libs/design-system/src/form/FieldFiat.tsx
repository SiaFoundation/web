import { currencyOptions, useAppSettings } from '@siafoundation/react-core'
import { ChartArea16 } from '@siafoundation/react-icons'
import { useSiaCentralExchangeRates } from '@siafoundation/sia-central-react'
import type { SiaCentralCurrency } from '@siafoundation/sia-central-types'
import { toHastings } from '@siafoundation/units'
import BigNumber from 'bignumber.js'
import { useMemo } from 'react'
import type { FieldValues, Path, PathValue } from 'react-hook-form'
import { FieldGroup } from '../components/Form'
import { ValueSc } from '../components/ValueSc'
import { NumberField } from '../core/NumberField'
import { Panel } from '../core/Panel'
import { Text } from '../core/Text'
import { Tooltip } from '../core/Tooltip'
import { type FieldProps, useRegisterForm } from './configurationFields'

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
  currency: SiaCentralCurrency | ''
  group?: boolean
}) {
  const { settings } = useAppSettings()
  const rates = useSiaCentralExchangeRates({
    disabled: !settings.siaCentral,
    config: {
      swr: {
        revalidateOnFocus: false,
      },
    },
  })
  const rate = useMemo(() => {
    if (!settings.siaCentral || !rates.data) {
      return new BigNumber(0)
    }
    return new BigNumber((currency && rates.data?.rates.sc[currency]) || 0)
  }, [rates.data, settings, currency])
  const field = fields[name]
  const { placeholder, decimalsLimit = 2, units } = field
  const { setValue, error, value } = useRegisterForm({
    form,
    field,
    name,
  })
  const currencyOption = useMemo(
    () => currencyOptions.find((c) => c.id === currency),
    [currency],
  )

  const el = (
    <div className="flex flex-col gap-1">
      <NumberField
        name={name}
        value={value}
        units={`${currencyOption?.label || '?'}${units || ''}`}
        prefix={currencyOption?.prefix}
        size={size}
        decimalsLimit={currencyOption?.fixed || decimalsLimit}
        placeholder={placeholder ? new BigNumber(placeholder) : undefined}
        state={
          error
            ? 'invalid'
            : (form.formState.dirtyFields as Record<string, boolean>)[name]
              ? 'valid'
              : 'default'
        }
        onChange={(val) => {
          const v = val !== undefined ? new BigNumber(val) : undefined
          setValue(v as PathValue<Values, Path<Values>>, true)
        }}
        onBlur={() => {
          setValue(value, true)
        }}
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
  currency: SiaCentralCurrency | ''
  rate: BigNumber
}) {
  const available = value && !value.isZero() && rate && !rate.isZero()
  const sc = available ? value.times(toHastings(1)).div(rate) : new BigNumber(0)
  return (
    <Panel className="flex gap-1 items-center justify-between relative overflow-hidden px-2 py-2">
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
