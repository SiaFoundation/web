import { useFormik } from 'formik'
import BigNumber from 'bignumber.js'
import { WalletSendSiacoinReceipt } from './Receipt'
import { SendSiacoinFormData } from './types'

type Props = {
  send: (
    params: SendSiacoinFormData
  ) => Promise<{ transactionId?: string; error?: string }>
  formData: SendSiacoinFormData
  fee: BigNumber
  onConfirm: (params: { transactionId?: string }) => void
}

export function useSendSiacoinConfirmForm({
  send,
  formData,
  fee,
  onConfirm,
}: Props) {
  const { address, hastings, includeFee } = formData || {}
  const formik = useFormik({
    initialValues: {},
    onSubmit: async () => {
      const { transactionId, error } = await send({
        address,
        hastings,
        includeFee,
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
        hastings={hastings}
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
