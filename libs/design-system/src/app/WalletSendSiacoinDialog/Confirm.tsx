import { useFormik } from 'formik'
import BigNumber from 'bignumber.js'
import { WalletSendSiacoinReceipt } from './Receipt'
import { Transaction } from '@siafoundation/react-core'

type Props = {
  send: (params: {
    address: string
    sc: BigNumber
  }) => Promise<{ transaction?: Transaction; error?: string }>
  formData: {
    address: string
    siacoin: BigNumber
    includeFee: boolean
  }
  fee: BigNumber
  onConfirm: (params: { transaction: Transaction }) => void
}

export function useSendSiacoinConfirmForm({
  send,
  formData,
  fee,
  onConfirm,
}: Props) {
  const { address, siacoin, includeFee } = formData || {}
  const formik = useFormik({
    initialValues: {},
    onSubmit: async () => {
      const finalSiacoin = includeFee ? siacoin.minus(fee) : siacoin

      const { transaction, error } = await send({
        address,
        sc: finalSiacoin,
      })

      if (error) {
        formik.setStatus({
          error,
        })
        return
      }

      if (!transaction) {
        formik.setStatus({
          error: 'Transaction error.',
        })
        return
      }

      onConfirm({
        transaction,
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
