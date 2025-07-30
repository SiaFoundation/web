import { useForm } from 'react-hook-form'
import { useCallback, useMemo, useState } from 'react'
import {
  ConfigFields,
  triggerErrorToast,
  useOnInvalid,
} from '@siafoundation/design-system'
import { getFieldMnemonic, MnemonicFieldType } from '../../../lib/fieldMnemonic'
import { FieldMnemonic } from '../../FieldMnemonic'
import { useWalletCachedSeed } from '../../../hooks/useWalletCachedSeed'
import { useSignAndBroadcastV2 } from './useSignAndBroadcastV2'
import { useWallets } from '../../../contexts/wallets'
import { SendParamsV2 } from '../../_sharedWalletSendV2/typesV2'
import { SendReceiptV2 } from '../../_sharedWalletSendV2/SendReceiptV2'

type Props = {
  walletId: string
  params: SendParamsV2
  onConfirm: (params: { transactionId?: string }) => void
}

const defaultValues = {
  mnemonic: '',
}

type Values = typeof defaultValues

function getFields({
  mnemonicHash,
  mnemonicFieldType,
  setMnemonicFieldType,
  isSeedCached,
}: {
  mnemonicHash?: string
  mnemonicFieldType: MnemonicFieldType
  setMnemonicFieldType: (type: MnemonicFieldType) => void
  isSeedCached: boolean
}): ConfigFields<Values, never> {
  return {
    mnemonic: isSeedCached
      ? {
          title: 'Seed',
          type: 'text',
          validation: {},
        }
      : getFieldMnemonic({
          mnemonicHash,
          setMnemonicFieldType,
          mnemonicFieldType,
        }),
  }
}

export function useSendFormV2({ walletId, params, onConfirm }: Props) {
  const signAndBroadcastV2 = useSignAndBroadcastV2()
  const { isSeedCached } = useWalletCachedSeed(walletId)
  const { dataset } = useWallets()
  const wallet = dataset?.find((w) => w.id === walletId)
  const mnemonicHash = wallet?.metadata.mnemonicHash

  const form = useForm({
    mode: 'all',
    defaultValues,
  })

  const [mnemonicFieldType, setMnemonicFieldType] =
    useState<MnemonicFieldType>('password')
  const fields = useMemo(
    () =>
      getFields({
        mnemonicFieldType,
        setMnemonicFieldType,
        mnemonicHash,
        isSeedCached,
      }),
    [mnemonicFieldType, setMnemonicFieldType, mnemonicHash, isSeedCached],
  )

  const onValid = useCallback(
    async (values: Values) => {
      const result = await signAndBroadcastV2({
        mnemonic: wallet.state.mnemonic || values.mnemonic,
        params,
      })

      if ('error' in result) {
        triggerErrorToast({ title: result.error })
        return
      }

      onConfirm({ transactionId: result.id })
    },
    [signAndBroadcastV2, params, onConfirm, wallet],
  )

  const onInvalid = useOnInvalid(fields)

  const handleSubmit = useMemo(
    () => form.handleSubmit(onValid, onInvalid),
    [form, onValid, onInvalid],
  )

  const el = (
    <div className="flex flex-col gap-4">
      <FieldMnemonic
        walletId={walletId}
        name="mnemonic"
        form={form}
        fields={fields}
        actionText="complete the transaction"
      />
      <SendReceiptV2 params={params} />
    </div>
  )

  return {
    form,
    el,
    handleSubmit,
    reset: () => form.reset(defaultValues),
  }
}
