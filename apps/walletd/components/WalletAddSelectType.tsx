import { Heading, Paragraph, SelectCard } from '@siafoundation/design-system'
import { walletAddTypes } from '../config/walletTypes'
import { useDialog } from '../contexts/dialog'

export function WalletAddSelectType() {
  const { openDialog } = useDialog()
  return (
    <div className="grid grid-cols-2 gap-2">
      <WalletSelectCard
        title={walletAddTypes.walletAddNew.title}
        description={walletAddTypes.walletAddNew.description}
        onSelect={() => openDialog('walletAddNew')}
      />
      <WalletSelectCard
        title={walletAddTypes.walletAddRecover.title}
        description={walletAddTypes.walletAddRecover.description}
        onSelect={() => openDialog('walletAddRecover')}
      />
      <WalletSelectCard
        title={walletAddTypes.walletAddWatch.title}
        description={walletAddTypes.walletAddWatch.description}
        onSelect={() => openDialog('walletAddWatch')}
      />
      <WalletSelectCard
        title={walletAddTypes.walletAddLedger.title}
        description={walletAddTypes.walletAddLedger.description}
        onSelect={() => openDialog('walletAddLedger')}
      />
    </div>
  )
}

type WalletSelectCardProps = {
  title: React.ReactNode
  description: React.ReactNode
  disabled?: boolean
  onSelect: () => void
}

function WalletSelectCard({
  title,
  description,
  disabled,
  onSelect,
}: WalletSelectCardProps) {
  return (
    <SelectCard onClick={onSelect} disabled={disabled}>
      <div className="flex flex-col gap-2 text-start">
        <Heading size="20">{title}</Heading>
        <Paragraph size="14" color="subtle">
          {description}
        </Paragraph>
      </div>
    </SelectCard>
  )
}
