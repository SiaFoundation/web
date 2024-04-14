import {
  Paragraph,
  Button,
  Dialog,
  ConfigFields,
  FieldText,
  triggerErrorToast,
  FormSubmitButton,
  FieldTextArea,
  FieldLabel,
  FieldError,
} from '@siafoundation/design-system'
import { useCallback, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import {
  WalletAddressMetadata,
  WalletMetadata,
  useWalletAdd,
  useWalletAddressAdd,
} from '@siafoundation/walletd-react'
import { useDialog } from '../../contexts/dialog'
import { useWallets } from '../../contexts/wallets'
import { walletAddTypes } from '../../config/walletTypes'
import { DeviceConnectForm } from '../DeviceConnectForm'
import { useLedger } from '../../contexts/ledger'
import { UnlockConditions } from '@siafoundation/types'
import { getSDK } from '@siafoundation/sdk'

const defaultValues = {
  name: '',
  description: '',
  ledgerConnectedAndVerified: false,
}

type Values = typeof defaultValues

function getFields({
  walletNames,
}: {
  walletNames: string[]
}): ConfigFields<Values, never> {
  return {
    name: {
      type: 'text',
      title: 'Name',
      placeholder: 'name',
      validation: {
        validate: {
          unique: (value: string) =>
            !walletNames.includes(value) || 'name is already in use',
        },
        required: 'required',
        maxLength: 30,
      },
    },
    description: {
      type: 'text',
      title: 'Description',
      placeholder: 'Optional description or notes about the wallet.',
      validation: {
        maxLength: 200,
      },
    },
    ledgerConnectedAndVerified: {
      type: 'boolean',
      title: '',
      validation: {
        validate: {
          ledgerConnectedAndVerified: (value: boolean) =>
            value || 'Ledger must be connected, unlocked, and verified',
        },
      },
    },
  }
}

export type WalletAddLedgerDialogParams = void

type Props = {
  params?: WalletAddLedgerDialogParams
  trigger?: React.ReactNode
  open: boolean
  onOpenChange: (val: boolean) => void
}

export function WalletAddLedgerDialog({ trigger, open, onOpenChange }: Props) {
  const { openDialog } = useDialog()
  const walletAdd = useWalletAdd()
  const form = useForm({
    mode: 'all',
    defaultValues,
  })
  const { device, disconnect, error } = useLedger()

  // make sure the user explicitly connects to the correct device when
  // adding a new ledger wallet
  useEffect(() => {
    if (open) {
      disconnect()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  useEffect(() => {
    if (device && device.publicKey0) {
      form.setValue('ledgerConnectedAndVerified', true)
    } else {
      form.setValue('ledgerConnectedAndVerified', false)
    }
  }, [form, device])

  useEffect(() => {
    if (error) {
      form.setError('ledgerConnectedAndVerified', {
        message: error.message,
      })
    } else {
      form.clearErrors('ledgerConnectedAndVerified')
    }
  }, [form, error])

  const { dataset } = useWallets()
  const walletNames = dataset?.map((w) => w.name) || []

  const fields = getFields({
    walletNames,
  })

  const addressAdd = useWalletAddressAdd()

  const addAddress0 = useCallback(
    async (
      walletId: string,
      {
        unlockConditions,
        address,
      }: { unlockConditions: UnlockConditions; address: string }
    ) => {
      const metadata: WalletAddressMetadata = {
        index: 0,
        unlockConditions,
      }
      const response = await addressAdd.put({
        params: {
          id: walletId,
        },
        payload: {
          address,
          description: '',
          // TODO: add spendPolicy?
          metadata,
        },
      })
      if (response.error) {
        triggerErrorToast({ title: 'Error saving address' })
        return
      }
    },
    [addressAdd]
  )

  const onSubmit = useCallback(
    async (values: Values) => {
      if (!values.ledgerConnectedAndVerified) {
        return
      }
      if (!device.publicKey0 || !device.address0) {
        return
      }
      const metadata: WalletMetadata = {
        type: 'ledger',
        publicKey0: device.publicKey0,
        address0: device.address0,
      }
      const response = await walletAdd.post({
        payload: {
          name: values.name,
          description: values.description,
          metadata,
        },
      })
      if (response.error) {
        triggerErrorToast({
          title: 'Error saving wallet',
          body: response.error,
        })
      } else {
        const uc = getSDK().wallet.standardUnlockConditions(device.publicKey0)
        if (!uc.error) {
          addAddress0(response.data.id, {
            unlockConditions: uc.unlockConditions,
            address: device.address0,
          })
        }
        openDialog('walletLedgerAddressGenerate', {
          walletId: response.data.id,
          walletJustCreated: true,
        })
        form.reset(defaultValues)
      }
    },
    [form, openDialog, walletAdd, device, addAddress0]
  )

  form.register(
    'ledgerConnectedAndVerified',
    fields.ledgerConnectedAndVerified.validation
  )

  return (
    <Dialog
      title={walletAddTypes.walletAddLedger.title}
      trigger={trigger}
      open={open}
      onOpenChange={onOpenChange}
      contentVariants={{
        className: 'w-[400px]',
      }}
      onSubmit={form.handleSubmit(onSubmit)}
      controls={
        <div className="flex gap-2 pb-1">
          <Button
            size="medium"
            onClick={() => {
              openDialog('walletAddType')
            }}
          >
            back
          </Button>
          <div className="flex-1" />
          <FormSubmitButton size="medium" form={form}>
            Add wallet
          </FormSubmitButton>
        </div>
      }
    >
      <div className="flex flex-col gap-4 mb-2">
        <Paragraph size="14" color="subtle">
          {walletAddTypes.walletAddLedger.description}
        </Paragraph>
        <FieldText name="name" form={form} fields={fields} />
        <FieldTextArea name="description" form={form} fields={fields} />
        <div className="flex flex-col gap-1">
          <FieldLabel title="Device" name="ledgerConnectedAndVerified" />
          <FieldError name="ledgerConnectedAndVerified" form={form} />
          <DeviceConnectForm shouldVerify />
        </div>
      </div>
    </Dialog>
  )
}
