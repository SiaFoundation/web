import { useForm, useWatch } from 'react-hook-form'
import BigNumber from 'bignumber.js'
import { isValidAddress, toHastings } from '@siafoundation/units'
import { Text } from '../../core/Text'
import { InfoTip } from '../../core/InfoTip'
import { ValueSc } from '../../components/ValueSc'
import { ConfigFields } from '../../form/configurationFields'
import { SendSiacoinParams } from './types'
import { FieldText } from '../../form/FieldText'
import { FieldSwitch } from '../../form/FieldSwitch'
import { FieldSiacoin } from '../../form/FieldSiacoin'

const exampleAddr =
  'e3b1050aef388438668b52983cf78f40925af8f0aa8b9de80c18eadcefce8388d168a313e3f2'

const defaultValues = {
  address: '',
  siacoin: undefined as BigNumber | undefined,
  includeFee: false,
}

type Values = typeof defaultValues

function getFields({
  balance,
  fee,
}: {
  balance?: BigNumber
  fee: BigNumber
}): ConfigFields<Values, never> {
  return {
    address: {
      title: 'Address',
      type: 'text',
      placeholder: exampleAddr,
      validation: {
        required: 'required',
        validate: {
          isValidAddress: (val) =>
            isValidAddress(val as string) || 'Invalid address',
        },
      },
    },
    siacoin: {
      title: 'Siacoin',
      type: 'siacoin',
      placeholder: '100',
      validation: {
        required: 'required',
        validate: {
          greaterThanZero: (val) =>
            !new BigNumber((val as BigNumber) || 0).isZero() ||
            'Must be greater than zero',
          lessThanBalance: (val, values) => {
            const hastings = toHastings((val as BigNumber) || 0)
            const total = getTotalTransactionCost({
              hastings,
              includeFee: values.includeFee,
              fee,
            })
            return (
              total.isLessThan(balance || 0) || 'Not enough funds in wallet'
            )
          },
        },
      },
    },
    includeFee: {
      type: 'boolean',
      title: 'Include fee',
      validation: {},
    },
  }
}

type Props = {
  fee: BigNumber
  onComplete: (data: SendSiacoinParams) => void
  balance?: BigNumber
}

export function useSendSiacoinGenerateForm({
  balance,
  fee,
  onComplete,
}: Props) {
  const form = useForm({
    defaultValues,
  })

  const onValid = async (values: Values) => {
    if (!values.siacoin) {
      return
    }

    if (!balance) {
      return
    }

    const hastings = values.includeFee
      ? toHastings(values.siacoin).minus(fee)
      : toHastings(values.siacoin)

    const total = getTotalTransactionCost({
      hastings,
      includeFee: values.includeFee,
      fee,
    })

    if (balance.isLessThan(total)) {
      return
    }

    onComplete({
      address: values.address,
      hastings,
    })
  }

  const fields = getFields({ balance, fee })

  const submit = form.handleSubmit(onValid)

  const includeFee = useWatch({ control: form.control, name: 'includeFee' })
  const siacoin = useWatch({ control: form.control, name: 'siacoin' })
  const hastings = toHastings(siacoin || 0)

  const el = (
    <div className="flex flex-col gap-4">
      <FieldText
        form={form}
        fields={fields}
        size="medium"
        name="address"
        autoComplete="off"
      />
      <FieldSiacoin form={form} fields={fields} name="siacoin" />
      <div className="flex items-center">
        <FieldSwitch
          name="includeFee"
          form={form}
          size="small"
          fields={fields}
          group={false}
        >
          <Text size="14" color="contrast">
            Include fee
          </Text>
        </FieldSwitch>
        <InfoTip>
          Include or exclude the network fee from the above transaction value.
        </InfoTip>
        <div className="flex flex-1" />
      </div>
      <div className="flex flex-col gap-2 my-1">
        <div className="flex gap-2 justify-between items-center">
          <Text color="verySubtle">Network fee</Text>
          <div className="flex relative top-[-0.5px]">
            <ValueSc
              testId="networkFee"
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
              testId="total"
              size="14"
              value={getTotalTransactionCost({
                hastings,
                includeFee,
                fee,
              })}
              variant="value"
              dynamicUnits={false}
            />
          </div>
        </div>
      </div>
    </div>
  )

  return {
    el,
    reset: form.reset,
    form,
    submit,
  }
}

function getTotalTransactionCost({
  hastings,
  includeFee,
  fee,
}: {
  hastings: BigNumber
  includeFee: boolean
  fee: BigNumber
}) {
  return includeFee ? hastings : hastings.plus(fee)
}
