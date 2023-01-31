import { useState } from 'react'
import { SelectType } from './SelectType'
import { NewWallet } from './NewWallet'

// type WalletType = 'create' | 'restore' | 'cold' | 'ledger'

export function AddWalletDialog() {
  const [step, setStep] = useState<string>('start')

  return (
    <>
      {step === 'start' && <SelectType onSelect={() => setStep('create')} />}
      {step === 'create' && <NewWallet />}
    </>
  )
}
