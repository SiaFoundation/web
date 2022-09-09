import { useFormik } from 'formik'
import BigNumber from 'bignumber.js'
import { Flex, Text } from '../../core'
import { FormSubmitButton } from '../../components'
import { WalletSendSiacoinReceipt } from './Receipt'

type Props = {
  address: string
  siacoin: BigNumber
  fee: BigNumber
  includeFee: boolean
  onConfirm: () => void
}

export function WalletSendSiacoinConfirm({
  address,
  siacoin,
  fee,
  includeFee,
  onConfirm,
}: Props) {
  const formik = useFormik({
    initialValues: {},
    onSubmit: (values) => {
      onConfirm()
    },
  })

  return (
    <form onSubmit={formik.handleSubmit}>
      <Flex direction="column" gap="2">
        <WalletSendSiacoinReceipt
          address={address}
          siacoin={siacoin}
          fee={fee}
          includeFee={includeFee}
        />
        {formik.status?.error && (
          <Text css={{ color: '$red11' }}>{formik.status.error}</Text>
        )}
        <FormSubmitButton formik={formik}>
          Broadcast transaction
        </FormSubmitButton>
      </Flex>
    </form>
  )
}
