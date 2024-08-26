import { useFormik } from 'formik'
import * as Yup from 'yup'
import BigNumber from 'bignumber.js'
import { toHastings } from '@siafoundation/units'
import { Text } from '../../core/Text'
import { InfoTip } from '../../core/InfoTip'
import { Switch } from '../../core/Switch'
import { ValueSc } from '../../components/ValueSc'
import { FormFieldFormik } from '../../components/FormFormik'
import { SendSiacoinFormData } from './types'
import { getTotalTransactionCost } from './utils'

const exampleAddr =
  'e3b1050aef388438668b52983cf78f40925af8f0aa8b9de80c18eadcefce8388d168a313e3f2'

const initialValues = {
  address: '',
  siacoin: undefined,
  includeFee: false,
}

const validationSchema = Yup.object().shape({
  address: Yup.string().required('Required'),
  siacoin: Yup.string()
    .required('Required')
    .test(
      'greater than zero',
      'Must be greater than zero',
      (val) => !new BigNumber(val || 0).isZero()
    ),
})

type Props = {
  fee: BigNumber
  onComplete: (data: SendSiacoinFormData) => void
  balance?: BigNumber
}

export function useSendSiacoinGenerateForm({
  balance,
  fee,
  onComplete,
}: Props) {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      if (!fee) {
        return
      }

      if (!values.siacoin) {
        return
      }

      if (!balance) {
        return
      }

      if (balance.isLessThan(toHastings(values.siacoin).plus(fee))) {
        formik.setStatus({ error: 'Not enough funds in wallet.' })
        return
      }

      formik.setStatus({})
      onComplete({
        includeFee: values.includeFee,
        address: values.address,
        hastings: toHastings(values.siacoin),
      })
    },
  })

  const hastings = toHastings(formik.values.siacoin || 0)

  const form = (
    <div className="flex flex-col gap-4">
      <FormFieldFormik
        formik={formik}
        variants={{ size: 'medium' }}
        title="Address"
        name="address"
        placeholder={exampleAddr}
        autoComplete="off"
        type="text"
      />
      <FormFieldFormik
        formik={formik}
        title="Siacoin"
        name="siacoin"
        placeholder="100"
        type="siacoin"
      />
      <div className="flex items-center">
        <Switch
          aria-label="include fee"
          name="includeFee"
          checked={formik.values.includeFee}
          onCheckedChange={(val) => formik.setFieldValue('includeFee', val)}
        >
          Include fee
        </Switch>
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
                includeFee: formik.values.includeFee,
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
    formik,
    form,
  }
}
