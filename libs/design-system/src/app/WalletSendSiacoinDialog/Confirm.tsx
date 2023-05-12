import { useFormik } from 'formik'
import BigNumber from 'bignumber.js'
import { WalletSendSiacoinReceipt } from './Receipt'

type Props = {
  send: (params: {
    address: string
    sc: BigNumber
  }) => Promise<{ transactionId?: string; error?: string }>
  formData: {
    address: string
    siacoin: BigNumber
    includeFee: boolean
  }
  fee: BigNumber
  onConfirm: (params: { transactionId?: string }) => void
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

      const { transactionId, error } = await send({
        address,
        sc: finalSiacoin,
      })

      if (error) {
        formik.setStatus({
          error,
        })
        return
      }

      onConfirm({
        transactionId,
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
