import { useFormik } from 'formik'
import BigNumber from 'bignumber.js'
import { Flex } from '../../core'
import { FormSubmitButton } from '../../components'
import { WalletSendSiacoinReceipt } from './Receipt'
import {
  useWalletSign,
  Transaction,
  useWalletFund,
  useTxPoolBroadcast,
} from '@siafoundation/react-core'
import { toHastings } from '@siafoundation/sia-js'

type Props = {
  address: string
  siacoin: BigNumber
  fee: BigNumber
  includeFee: boolean
  onConfirm: (params: { transaction: Transaction }) => void
}

export function WalletSendSiacoinConfirm({
  address,
  siacoin,
  fee,
  includeFee,
  onConfirm,
}: Props) {
  const fund = useWalletFund()
  const sign = useWalletSign()
  const broadcast = useTxPoolBroadcast()
  const formik = useFormik({
    initialValues: {},
    onSubmit: async () => {
      const finalSiacoin = includeFee
        ? toHastings(siacoin).minus(fee)
        : toHastings(siacoin)

      const fundResponse = await fund.post({
        payload: {
          amount: finalSiacoin.toString(),
          transaction: {
            siacoinoutputs: [
              {
                unlockhash: address,
                value: finalSiacoin.toString(),
              },
            ],
          },
        },
      })
      if (!fundResponse.data) {
        formik.setStatus({
          error: fundResponse.error,
        })
        return
      }
      const signResponse = await sign.post({
        payload: {
          transaction: fundResponse.data.transaction,
          toSign: fundResponse.data.toSign,
          coveredFields: {
            wholetransaction: true,
          },
        },
      })
      if (!signResponse.data) {
        formik.setStatus({
          error: signResponse.error,
        })
        return
      }
      const broadcastResponse = await broadcast.post({
        payload: [signResponse.data],
      })
      if (broadcastResponse.error) {
        formik.setStatus({
          error: broadcastResponse.error,
        })
        return
      }

      onConfirm({
        transaction: signResponse.data,
      })
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
        <FormSubmitButton formik={formik}>
          Broadcast transaction
        </FormSubmitButton>
      </Flex>
    </form>
  )
}
