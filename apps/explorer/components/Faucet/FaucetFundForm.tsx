import {
  Paragraph,
  ReactHookFormField,
  ReactHookFormSubmitButton,
  triggerSuccessToast,
  triggerErrorToast,
} from '@siafoundation/design-system'
import { toHastings } from '@siafoundation/units'
import BigNumber from 'bignumber.js'
import { networkName } from '../../config'
import { useFaucetFund } from '../../hooks/useFaucetFund'
import { useForm } from 'react-hook-form'

type FaucetFundFormFields = {
  address: string
  siacoin: BigNumber
}

const faucetFundFormValidation = {
  address: {
    required: { value: true, message: 'An address is required' },
  },
  siacoin: {
    required: { value: true, message: 'An amount is required' },
    min: { value: 1, message: 'Amount must be at least 1' },
    max: { value: 50000, message: 'Amount cannot exceed 50,000' },
  },
}

type FaucetFundFormProps = {
  onDone: (id: string) => void
}

export function FaucetFundForm({ onDone }: FaucetFundFormProps) {
  const fund = useFaucetFund()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    setValue,
  } = useForm()
  const onSubmit = async (data: FaucetFundFormFields) => {
    const { address, siacoin } = data

    const response = await fund.post({
      payload: {
        unlockHash: address,
        amount: toHastings(siacoin || 0).toString(),
      },
    })

    if (response.error) {
      triggerErrorToast({
        title:
          response.status === 429
            ? 'You have reached your maximum requests for now. Try again later.'
            : 'Fund request failed. Check your connection or try again later.',
      })
    } else {
      triggerSuccessToast({ title: 'Address has been funded.' })
      if (response.data) onDone(response.data.id)
      setValue('address', '')
      setValue('siacoin', undefined)
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <Paragraph size="14">
        Fund a {networkName} wallet address with Siacoin.
      </Paragraph>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <ReactHookFormField
          name="address"
          title="Address"
          type="text"
          placeholder="020d48a57bc0..."
          variants={{
            size: 'medium',
          }}
          registerFunc={register('address', faucetFundFormValidation.address)}
          errors={errors}
          isSubmitting={isSubmitting}
          watch={watch}
          setValue={setValue}
        />
        <ReactHookFormField
          name="siacoin"
          title="Amount"
          type="siacoin"
          placeholder="100"
          showFiat={false}
          registerFunc={register('siacoin', faucetFundFormValidation.siacoin)}
          errors={errors}
          isSubmitting={isSubmitting}
          watch={watch}
          setValue={setValue}
        />
        <ReactHookFormSubmitButton
          isSubmitting={isSubmitting}
          errors={errors}
          size="medium"
        >
          Fund wallet
        </ReactHookFormSubmitButton>
      </form>
    </div>
  )
}
