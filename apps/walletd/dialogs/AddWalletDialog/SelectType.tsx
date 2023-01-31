import {
  Paragraph,
  RadioCardGroup,
  RadioCard,
  Heading,
  Dialog,
} from '@siafoundation/design-system'

type WalletType = 'create' | 'restore' | 'cold' | 'ledger'

type Props = {
  onSelect: (walletType: WalletType) => void
}

export function SelectType({ onSelect }: Props) {
  return (
    <Dialog
      title="Add Wallet"
      contentVariants={{
        className: 'max-w-[1200px]',
      }}
    >
      <div className="flex flex-col gap-4">
        <RadioCardGroup onValueChange={(val) => onSelect(val as WalletType)}>
          <div className="grid grid-cols-2 gap-2">
            <WalletRadio
              value="create"
              title="Create a wallet"
              description={
                <>
                  Generates a brand new seed. The hot wallet will automatically
                  sign transactions.
                </>
              }
            />
            <WalletRadio
              value="recover"
              title="Recover from seed"
              description={
                <>
                  Restores a wallet from seed. The hot wallet will automatically
                  sign transactions.
                </>
              }
            />
            <WalletRadio
              value="cold"
              title="Add a cold wallet"
              disabled
              description={
                <>
                  Creates a cold wallet from provided addresses. You will
                  manually sign transactions.
                </>
              }
            />
            <WalletRadio
              value="ledger"
              disabled
              title="Add a Ledger hardware wallet"
              description={
                <>
                  Adds a Ledger hardware wallet. You will manually sign
                  transactions with your hardware device.
                </>
              }
            />
          </div>
        </RadioCardGroup>
      </div>
    </Dialog>
  )
}

type WalletRadioProps = {
  value: string
  title: React.ReactNode
  description: React.ReactNode
  disabled?: boolean
}

function WalletRadio({
  value,
  title,
  description,
  disabled,
}: WalletRadioProps) {
  return (
    <RadioCard indicator={false} value={value} disabled={disabled}>
      <div className="flex flex-col gap-2">
        <Heading size="20">{title}</Heading>
        <Paragraph size="14" color="subtle">
          {description}
        </Paragraph>
      </div>
    </RadioCard>
  )
}
