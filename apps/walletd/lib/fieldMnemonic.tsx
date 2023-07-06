import {
  Button,
  ConfigField,
  View16,
  ViewOff16,
} from '@siafoundation/design-system'
import { FieldValues } from 'react-hook-form'
import { blake2bHex } from 'blakejs'
import { getWalletWasm } from './wasm'

export type MnemonicFieldType = 'text' | 'password'

export function getFieldMnemonic<
  Values extends FieldValues,
  Categories extends string
>({
  seedHash,
  mnemonicFieldType: mnemonicType,
  setMnemonicFieldType: setMnemonicType,
}: {
  seedHash?: string
  mnemonicFieldType: MnemonicFieldType
  setMnemonicFieldType: (type: MnemonicFieldType) => void
}): ConfigField<Values, Categories> {
  return {
    type: mnemonicType,
    title: 'Seed',
    actions: (
      <div className="flex gap-1">
        <Button
          tip={mnemonicType === 'password' ? 'Show seed' : 'Hide seed'}
          tabIndex={-1}
          variant="ghost"
          icon="hover"
          onClick={() =>
            setMnemonicType(mnemonicType === 'password' ? 'text' : 'password')
          }
        >
          {mnemonicType === 'password' ? <ViewOff16 /> : <View16 />}
        </Button>
      </div>
    ),
    placeholder:
      'island submit vague scrub exhibit cherry front spoon crop debate filter virus',
    validation: {
      required: 'required',
      validate: {
        valid: (value: string) => {
          const { error } = getWalletWasm().seedFromPhrase(value)
          return !error || 'seed should be 12 word BIP39 mnemonic'
        },
        match: (mnemonic: string) => {
          const { seed } = getWalletWasm().seedFromPhrase(mnemonic)
          return (
            blake2bHex(seed) === seedHash || 'seed does not match'
            // Maybe re-enabled this so that wallets added via daemon can pass
            // validation. Would need to add seedHash to metadata afterwards.
            // Potential issues if wrong valid seed is entered.
            // !seedHash || blake2bHex(seed) === seedHash || 'seed does not match'
          )
        },
      },
    },
  }
}
