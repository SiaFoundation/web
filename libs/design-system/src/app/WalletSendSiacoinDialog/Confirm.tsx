import { useFormik } from 'formik'
import BigNumber from 'bignumber.js'
import { WalletSendSiacoinReceipt } from './Receipt'
import {
  useWalletSign,
  Transaction,
  useWalletFund,
  useTxPoolBroadcast,
} from '@siafoundation/react-core'

type Props = {
  formData: {
    address: string
    siacoin: BigNumber
    includeFee: boolean
  }
  fee: BigNumber
  onConfirm: (params: { transaction: Transaction }) => void
}

export function useSendSiacoinConfirmForm({ formData, fee, onConfirm }: Props) {
  const { address, siacoin, includeFee } = formData || {}
  const fund = useWalletFund()
  const sign = useWalletSign()
  const broadcast = useTxPoolBroadcast()
  const formik = useFormik({
    initialValues: {},
    onSubmit: async () => {
      const finalSiacoin = includeFee ? siacoin.minus(fee) : siacoin

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

  const form = (
    <div className="flex flex-col gap-4">
      <WalletSendSiacoinReceipt
        address={address}
        siacoin={siacoin}
        fee={fee}
        includeFee={includeFee}
      />
    </div>
  )

  return {
    form,
    formik,
  }
}
