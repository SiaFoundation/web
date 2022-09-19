import { useFormik } from 'formik'
import * as Yup from 'yup'
import BigNumber from 'bignumber.js'
import { toHastings } from '@siafoundation/sia-js'
import { Flex, InfoTip, Switch, Text } from '../../core'
import { ValueSc, FormField } from '../../components'
import { useWalletBalance } from '@siafoundation/react-core'

const exampleAddr =
  'e3b1050aef388438668b52983cf78f40925af8f0aa8b9de80c18eadcefce8388d168a313e3f2'

const initialValues = {
  address: '',
  siacoin: 0,
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

type FormData = {
  address: string
  siacoin: BigNumber
  includeFee: boolean
}

type Props = {
  fee: BigNumber
  onComplete: (data: FormData) => void
}

export function useSendSiacoinGenerateForm({ fee, onComplete }: Props) {
  const balance = useWalletBalance()
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      const siacoin = values.includeFee
        ? toHastings(values.siacoin).minus(fee)
        : toHastings(values.siacoin)

      if (!balance.data) {
        return
      }

      if (
        new BigNumber(balance.data).isLessThan(
          toHastings(values.siacoin).plus(fee)
        )
      ) {
        formik.setStatus({ error: 'Not enough funds in wallet.' })
        return
      }

      formik.setStatus({})
      onComplete({
        includeFee: values.includeFee,
        address: values.address,
        siacoin: siacoin,
      })
    },
  })

  const sc = toHastings(formik.values.siacoin)

  const form = (
    <Flex direction="column" gap="2">
      <FormField
        formik={formik}
        title="Address"
        name="address"
        placeholder={exampleAddr}
        autoComplete="off"
        type="text"
      />
      <FormField
        formik={formik}
        title="Siacoin"
        name="siacoin"
        placeholder="100"
        type="siacoin"
      />
      <Flex align="center">
        <Switch
          name="includeFee"
          onCheckedChange={(val) => formik.setFieldValue('includeFee', val)}
        >
          Include fee
        </Switch>
        <InfoTip>
          Include or exclude the network fee from the above transaction value.
        </InfoTip>
        <Flex css={{ flex: 1 }} />
      </Flex>
      <Flex direction="column" gap="1" css={{ margin: '$0-5 0' }}>
        <Flex gap="1" justify="between" align="center">
          <Text color="verySubtle">Network fee</Text>
          <Flex css={{ position: 'relative', top: '-0.5px' }}>
            <ValueSc
              size="14"
              value={fee}
              variant="value"
              dynamicUnits={false}
            />
          </Flex>
        </Flex>
        <Flex justify="between" gap="1" align="center">
          <Text color="verySubtle">Total</Text>
          <Flex css={{ position: 'relative', top: '-0.5px' }}>
            <ValueSc
              size="14"
              value={formik.values.includeFee ? sc : sc.plus(fee)}
              variant="value"
              dynamicUnits={false}
            />
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  )
  return {
    formik,
    form,
  }
}
