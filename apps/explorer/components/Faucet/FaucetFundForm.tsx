import {
  Button,
  ConfigFields,
  FieldSiacoin,
  FieldText,
  Paragraph,
  triggerErrorToast,
  triggerSuccessToast,
} from '@siafoundation/design-system'
import { isValidAddress, toHastings } from '@siafoundation/units'
import BigNumber from 'bignumber.js'
import { networkName } from '../../config'
import { useFaucetFund } from '../../hooks/useFaucetFund'
import { useForm } from 'react-hook-form'
import { Maybe } from '@siafoundation/types'

const defaultValues = {
  address: '',
  amount: undefined as Maybe<BigNumber> | undefined,
}

const fields: ConfigFields<typeof defaultValues, never> = {
  address: {
    type: 'text',
    title: 'Address',
    placeholder: '020d48a57bc0...',
    validation: {
      required: 'An address is required',
      validate: {
        valid: (value: string) => {
          return isValidAddress(value) || 'Invalid address'
        },
      },
    },
  },
  amount: {
    type: 'siacoin',
    title: 'Amount',
    showFiat: false,
    validation: {
      required: 'An amount is required',
      validate: {
        min: (value: Maybe<BigNumber>) =>
          value?.gte(1) || 'Amount must be greater than 0',
        max: (value: Maybe<BigNumber>) =>
          value?.lte(50000) || 'Amount must be less than 50,000',
      },
    },
  },
}

type Values = typeof defaultValues

type Props = {
  onDone: (id: string) => void
}

export function FaucetFundForm({ onDone }: Props) {
  const fund = useFaucetFund()
  const form = useForm({
    mode: 'all',
    defaultValues,
  })

  const onSubmit = async (values: Values) => {
    const response = await fund.post({
      payload: {
        unlockHash: values.address,
        amount: toHastings(values.amount || 0).toString(),
      },
    })
    if (response.error) {
      const title =
        'Fund request failed. ' +
        (response.status === 400
          ? 'Check the address or try again later.'
          : response.status === 429
            ? 'You have reached your request limits. Try again later.'
            : 'Check your connection or try again later.')

      triggerErrorToast({ title })
    } else {
      triggerSuccessToast({ title: 'Address has been funded.' })
      if (response.data) onDone(response.data.id)
      form.reset()
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <Paragraph size="14">
        Fund a {networkName} wallet address with Siacoin.
      </Paragraph>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        <FieldText size="medium" name="address" form={form} fields={fields} />
        <FieldSiacoin size="medium" name="amount" form={form} fields={fields} />
        <Paragraph size="12" className="text-center">
          Requests are limited to 5 per 5 minutes and 50,000 siacoins per day.
        </Paragraph>
        <Button size="medium" variant="accent" type="submit">
          Fund wallet
        </Button>
      </form>
    </div>
  )
}
