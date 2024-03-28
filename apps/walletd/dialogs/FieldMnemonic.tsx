import { ConfigFields, FieldText } from '@siafoundation/design-system'
import { useWallets } from '../contexts/wallets'
import { humanTimeAndUnits } from '../lib/time'
import { SeedLayout } from './SeedLayout'
import { VerifyIcon } from '@siafoundation/react-icons'
import { FieldValues, Path, UseFormReturn } from 'react-hook-form'

type Props<Values extends FieldValues, Categories extends string> = {
  name: Path<Values>
  form: UseFormReturn<Values>
  fields: ConfigFields<Values, Categories>
  walletId: string
  actionText?: string
}

export function FieldMnemonic<
  Values extends FieldValues,
  Categories extends string
>({ walletId, name, form, fields, actionText }: Props<Values, Categories>) {
  const { dataset, walletAutoLockEnabled, walletAutoLockTimeout } = useWallets()
  const wallet = dataset?.find((w) => w.id === walletId)
  const cachedSeed = wallet?.state.mnemonic
  const isSeedCached = !!cachedSeed
  const cacheTime = humanTimeAndUnits(walletAutoLockTimeout)
  const fullActionText = actionText ? ` and ${actionText}` : ''
  return isSeedCached ? (
    <SeedLayout
      icon={<VerifyIcon />}
      description={
        walletAutoLockEnabled ? (
          <>
            The wallet is currently unlocked. The wallet will stay unlocked
            until it is inactive for {cacheTime.amount} {cacheTime.units},
            manually locked, or the app is closed.
          </>
        ) : (
          <>
            The wallet is currently unlocked. The wallet will stay unlocked
            until it is manually locked or the app is closed.
          </>
        )
      }
    />
  ) : (
    <SeedLayout
      icon={<VerifyIcon />}
      description={
        walletAutoLockEnabled ? (
          <>
            Enter your seed mnemonic to unlock the wallet{fullActionText}. The
            wallet will stay unlocked until it is inactive for{' '}
            {cacheTime.amount} {cacheTime.units}, manually locked, or the app is
            closed.
          </>
        ) : (
          <>
            Enter your seed mnemonic to unlock the wallet and{fullActionText}.
            The wallet will stay unlocked until it is manually locked or the app
            is closed.
          </>
        )
      }
    >
      <FieldText form={form} fields={fields} name={name} />
    </SeedLayout>
  )
}
