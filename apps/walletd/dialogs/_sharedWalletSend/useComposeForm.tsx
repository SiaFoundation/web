import BigNumber from 'bignumber.js'
import { isValidAddress, toHastings } from '@siafoundation/sia-js'
import {
  Text,
  InfoTip,
  ValueSc,
  FieldSwitch,
  ConfigFields,
  FieldSiacoin,
  FieldText,
  FieldNumber,
  FieldSelect,
} from '@siafoundation/design-system'
import { useForm } from 'react-hook-form'
import { useCallback, useMemo } from 'react'
import { SendParams } from './types'

const exampleAddr =
  'e3b1050aef388438668b52983cf78f40925af8f0aa8b9de80c18eadcefce8388d168a313e3f2'

const fee = toHastings(0.00393)

const defaultValues = {
  address: '',
  mode: 'siacoin' as 'siacoin' | 'siafund',
  siacoin: undefined as BigNumber,
  siafund: undefined as BigNumber,
  includeFee: false,
}

function getFields({
  balanceSc,
  balanceSf,
  fee,
}: {
  balanceSc: BigNumber
  balanceSf: BigNumber
  fee: BigNumber
}): ConfigFields<typeof defaultValues, never> {
  return {
    address: {
      type: 'text',
      title: 'Address',
      placeholder: exampleAddr,
      validation: {
        required: 'required',
        validate: {
          valid: (value: string) => isValidAddress(value) || 'invalid address',
        },
      },
    },
    mode: {
      type: 'select',
      title: 'Mode',
      options: [
        { value: 'siacoin', label: 'Siacoin' },
        { value: 'siafund', label: 'Siafund' },
      ],
      validation: {
        required: 'required',
      },
    },
    siacoin: {
      type: 'siacoin',
      title: 'Siacoin',
      placeholder: '100',
      validation: {
        validate: {
          required: (value: BigNumber, values) =>
            values.mode !== 'siacoin' || !!value || 'required',
          gtz: (value: BigNumber, values) =>
            values.mode !== 'siacoin' ||
            !new BigNumber(value || 0).isZero() ||
            'must be greater than zero',
          balance: (value: BigNumber, values) =>
            values.mode !== 'siacoin' ||
            balanceSc.gte(toHastings(value || 0).plus(fee)) ||
            'not enough funds in wallet',
        },
      },
    },
    siafund: {
      type: 'number',
      title: 'Siafunds',
      decimalsLimit: 0,
      placeholder: '100',
      validation: {
        validate: {
          required: (value, values) =>
            values.mode !== 'siafund' || !!value || 'required',
          gtz: (value: BigNumber, values) =>
            values.mode !== 'siafund' ||
            value?.gt(0) ||
            'must be greater than zero',
          balance: (value: BigNumber, values) =>
            values.mode !== 'siafund' ||
            (balanceSc?.gte(fee) && balanceSf?.gte(value)) ||
            'not enough funds in wallet',
        },
      },
    },
    includeFee: {
      type: 'boolean',
      title: '',
      validation: {},
    },
  }
}

type Props = {
  onComplete: (data: SendParams) => void
  balanceSc?: BigNumber
  balanceSf?: BigNumber
}

export function useComposeForm({ balanceSc, balanceSf, onComplete }: Props) {
  const form = useForm({
    mode: 'all',
    defaultValues,
  })

  const fields = getFields({
    balanceSc,
    balanceSf,
    fee,
  })

  const onValid = useCallback(
    async (values: typeof defaultValues) => {
      const sc = new BigNumber(values.siacoin || 0)
      const sf = new BigNumber(values.siafund || 0)

      const siacoin = values.includeFee
        ? toHastings(sc).minus(fee)
        : toHastings(sc)

      const siafund = sf.toNumber()

      onComplete({
        address: values.address,
        fee,
        mode: values.mode,
        siacoin,
        siafund,
      })
    },
    [onComplete]
  )

  const handleSubmit = useMemo(
    () => form.handleSubmit(onValid),
    [form, onValid]
  )

  const siacoin = form.watch('siacoin')
  const mode = form.watch('mode')
  const includeFee = form.watch('includeFee')
  const sc = toHastings(siacoin || 0)

  const el = (
    <div className="flex flex-col gap-4">
      {balanceSf.gt(0) && (
        <FieldSelect size="medium" form={form} fields={fields} name="mode" />
      )}
      <FieldText
        size="medium"
        form={form}
        fields={fields}
        name="address"
        autoComplete="off"
      />
      {mode === 'siacoin' ? (
        <>
          <FieldSiacoin
            size="medium"
            form={form}
            fields={fields}
            name="siacoin"
          />
          <div className="flex items-center">
            <FieldSwitch
              size="small"
              form={form}
              fields={fields}
              name="includeFee"
            >
              <Text>Include fee</Text>
              <InfoTip>
                Include or exclude the network fee from the above transaction
                value.
              </InfoTip>
            </FieldSwitch>
            <div className="flex flex-1" />
          </div>
        </>
      ) : (
        <FieldNumber size="medium" form={form} fields={fields} name="siafund" />
      )}
      <div className="flex flex-col gap-2 my-1">
        <div className="flex gap-2 justify-between items-center">
          <Text color="verySubtle">Network fee</Text>
          <div className="flex relative top-[-0.5px]">
            <ValueSc
              size="14"
              value={fee}
              variant="value"
              dynamicUnits={false}
            />
          </div>
        </div>
        {mode === 'siacoin' && (
          <div className="flex justify-between gap-2 items-center">
            <Text color="verySubtle">Total</Text>
            <div className="flex relative top-[-0.5px]">
              <ValueSc
                size="14"
                value={includeFee ? sc : sc.plus(fee)}
                variant="value"
                dynamicUnits={false}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )

  return {
    form,
    el,
    handleSubmit,
    reset: () => form.reset(defaultValues),
  }
}
