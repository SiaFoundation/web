import { Button, ConfigField } from '@siafoundation/design-system'
import { View16, ViewOff16 } from '@siafoundation/react-icons'
import { FieldValues } from 'react-hook-form'
import { blake2bHex } from 'blakejs'
import { getSDK } from '@siafoundation/sdk'

export type MnemonicFieldType = 'text' | 'password'

export function getFieldMnemonic<
  Values extends FieldValues,
  Categories extends string
>({
  mnemonicHash,
  mnemonicFieldType: mnemonicType,
  setMnemonicFieldType: setMnemonicType,
}: {
  mnemonicHash?: string
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
          const { error } = getSDK().wallet.keyPairFromSeedPhrase(value, 0)
          return !error || 'seed should be 12 word BIP39 mnemonic'
        },
        match: (mnemonic: string) => {
          return (
            blake2bHex(mnemonic) === mnemonicHash ||
            'seed phrase does not match'
            // Maybe re-enabled this so that wallets added via daemon can pass
            // validation. Would need to add mnemonicHash to metadata afterwards.
            // Potential issues if wrong valid seed is entered.
            // !mnemonicHash || blake2bHex(seed) === mnemonicHash || 'seed does not match'
          )
        },
      },
    },
  }
}
