import {
  FormFieldFormik,
  FormSubmitButtonFormik,
  Paragraph,
  triggerSuccessToast,
} from '@siafoundation/design-system'
import { toHastings } from '@siafoundation/units'
import BigNumber from 'bignumber.js'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { networkName } from '../../config'
import { useFaucetFund } from '../../hooks/useFaucetFund'

const initialValues = {
  address: '',
  amount: undefined as BigNumber | undefined,
}

const validationSchema = Yup.object().shape({
  address: Yup.string().required('Required'),
  amount: Yup.string()
    .required('Required')
    .test(
      'greater than zero',
      'Must be greater than 0 SC',
      (val) => !new BigNumber(val || 0).isZero(),
    )
    .test('less than 1000', 'Must be 50,000 SC or less', (val) =>
      new BigNumber(val || 0).lte(50_000),
    ),
})

type Props = {
  onDone: (id: string) => void
}

export function FaucetFundForm({ onDone }: Props) {
  const fund = useFaucetFund()

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, actions) => {
      const response = await fund.post({
        payload: {
          unlockHash: values.address,
          amount: toHastings(values.amount || 0).toString(),
        },
      })
      if (response.error) {
        actions.setStatus({ error: response.error })
      } else {
        triggerSuccessToast({ title: 'Address has been funded' })
        if (response.data) {
          onDone(response.data.id)
        }
        actions.resetForm()
      }
    },
  })

  return (
    <div className="flex flex-col gap-4">
      <Paragraph size="14">
        Fund a {networkName} wallet address with Siacoin.
      </Paragraph>
      <form onSubmit={formik.handleSubmit}>
        <div className="flex flex-col gap-4">
          <FormFieldFormik
            formik={formik}
            title="Address"
            name="address"
            placeholder="020d48a57bc0..."
            autoComplete="off"
            type="text"
            variants={{
              size: 'medium',
            }}
          />
          <FormFieldFormik
            formik={formik}
            title="Amount"
            name="amount"
            placeholder="100"
            type="siacoin"
            showFiat={false}
          />
          <FormSubmitButtonFormik formik={formik} size="medium">
            Fund wallet
          </FormSubmitButtonFormik>
        </div>
      </form>
    </div>
  )
}
