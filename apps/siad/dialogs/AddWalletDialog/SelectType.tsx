import {
  Flex,
  Paragraph,
  Grid,
  RadioCardGroup,
  RadioCard,
  Heading,
  DialogContent,
} from '@siafoundation/design-system'

type WalletType = 'create' | 'restore' | 'cold' | 'ledger'

type Props = {
  onSelect: (walletType: WalletType) => void
}

export function SelectType({ onSelect }: Props) {
  return (
    <DialogContent
      title="Add Wallet"
      css={{
        width: 'inherit',
        maxWidth: '1200px',
        overflow: 'hidden',
      }}
    >
      <Flex direction="column" gap="2">
        <RadioCardGroup onValueChange={(val) => onSelect(val as WalletType)}>
          <Grid columns="2" gap="1">
            <WalletRadio
              value="create"
              title="Create a brand new hot wallet"
              description={
                <>
                  Generates a brand new seed. The hot wallet will automatically
                  sign transactions.
                </>
              }
            />
            <WalletRadio
              value="recover"
              title="Create a hot wallet from existing wallet seed"
              description={
                <>
                  Creates a hot wallet from the seed. The hot wallet will
                  automatically sign transactions.
                </>
              }
            />
            <WalletRadio
              value="cold"
              title="Create a cold wallet from existing wallet addresses"
              description={
                <>
                  Creates a cold wallet with the provided addresses. You will
                  manually sign transactions.
                </>
              }
            />
            <WalletRadio
              value="ledger"
              title="Add a Ledger hardware wallet"
              description={
                <>
                  Adds a Ledger hardware wallet. You will manually sign
                  transactions with your hardware device.
                </>
              }
            />
          </Grid>
        </RadioCardGroup>
      </Flex>
    </DialogContent>
  )
}

type WalletRadioProps = {
  value: string
  title: React.ReactNode
  description: React.ReactNode
}

function WalletRadio({ value, title, description }: WalletRadioProps) {
  return (
    <RadioCard indicator={false} value={value}>
      <Flex direction="column" gap="1">
        <Heading size="20">{title}</Heading>
        <Paragraph size="14" color="subtle">
          {description}
        </Paragraph>
      </Flex>
    </RadioCard>
  )
}
