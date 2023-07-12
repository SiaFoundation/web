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
} from '@siafoundation/design-system'
import { useForm } from 'react-hook-form'
import { useCallback, useMemo } from 'react'

const exampleAddr =
  'e3b1050aef388438668b52983cf78f40925af8f0aa8b9de80c18eadcefce8388d168a313e3f2'

const defaultValues = {
  address: '',
  siacoin: undefined as BigNumber,
  includeFee: false,
}

function getFields({
  balance,
  fee,
}: {
  balance: BigNumber
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
    siacoin: {
      type: 'text',
      title: 'Siacoin',
      placeholder: '100',
      validation: {
        required: 'required',
        validate: {
          gtz: (value: BigNumber) =>
            !new BigNumber(value || 0).isZero() || 'must be greater than zero',
          balance: (value: BigNumber) =>
            balance.gte(toHastings(value || 0).plus(fee)) ||
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

type FormData = {
  address: string
  siacoin: BigNumber
  includeFee: boolean
}

type Props = {
  fee: BigNumber
  onComplete: (data: FormData) => void
  balance?: BigNumber
}

export function useSendSiacoinGenerateForm({
  balance,
  fee,
  onComplete,
}: Props) {
  const form = useForm({
    mode: 'all',
    defaultValues,
  })

  const fields = getFields({
    balance,
    fee,
  })

  const onValid = useCallback(
    async (values: typeof defaultValues) => {
      if (!values.siacoin) {
        return
      }
      const siacoin = values.includeFee
        ? toHastings(values.siacoin).minus(fee)
        : toHastings(values.siacoin)

      if (!balance) {
        return
      }

      onComplete({
        includeFee: values.includeFee,
        address: values.address,
        siacoin: siacoin,
      })
    },
    [onComplete, balance, fee]
  )

  const handleSubmit = useMemo(
    () => form.handleSubmit(onValid),
    [form, onValid]
  )

  const siacoin = form.watch('siacoin')
  const includeFee = form.watch('includeFee')
  const sc = toHastings(siacoin || 0)

  const el = (
    <div className="flex flex-col gap-4">
      <FieldText
        size="medium"
        form={form}
        fields={fields}
        name="address"
        autoComplete="off"
      />
      <FieldSiacoin size="medium" form={form} fields={fields} name="siacoin" />
      <div className="flex items-center">
        <FieldSwitch size="small" form={form} fields={fields} name="includeFee">
          <Text>Include fee</Text>
          <InfoTip>
            Include or exclude the network fee from the above transaction value.
          </InfoTip>
        </FieldSwitch>
        <div className="flex flex-1" />
      </div>
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
