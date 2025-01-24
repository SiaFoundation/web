import {
  useConsensusNetwork,
  useConsensusTip,
} from '@siafoundation/walletd-react'
import { WalletSendSeedDialogV2 } from '../WalletSendSeedDialogV2'
import { WalletSendSeedDialogV1 } from '../WalletSendSeedDialogV1'

// mainnet: https://github.com/SiaFoundation/coreutils/blob/master/chain/network.go#L50-L51
// n.HardforkV2.AllowHeight = 526000   // June 6th, 2025 @ 6:00am UTC
// n.HardforkV2.RequireHeight = 530000 // July 4th, 2025 @ 2:00am UTC

// zen: https://github.com/SiaFoundation/coreutils/blob/master/chain/network.go#L144-L145
// n.HardforkV2.AllowHeight = 112000   // March 1, 2025 @ 7:00:00 UTC
// n.HardforkV2.RequireHeight = 114000 // ~ 2 weeks later

// anagami: https://github.com/SiaFoundation/coreutils/blob/master/chain/network.go#L172-L173
// n.HardforkV2.AllowHeight = 2016         // ~2 weeks in
// n.HardforkV2.RequireHeight = 2016 + 288 // ~2 days later

// test cluster: internal/cluster/cmd/clusterd/main.go#L131-L132
// n.HardforkV2.AllowHeight = 400
// n.HardforkV2.RequireHeight = 500

const hardforkV2AllowHeights = {
  mainnet: 526_000,
  zen: 112_000,
  anagami: 2_016,
  testCluster: 400,
}

export type WalletSendSeedDialogParams = {
  walletId: string
}

type Props = {
  params?: WalletSendSeedDialogParams
  trigger?: React.ReactNode
  open: boolean
  onOpenChange: (val: boolean) => void
}

export function WalletSendSeedDialog({
  params: dialogParams,
  trigger,
  open,
  onOpenChange,
}: Props) {
  const n = useConsensusNetwork()
  const ct = useConsensusTip()

  const hardforkV2AllowHeight = process.env.NEXT_PUBLIC_TEST_CLUSTER
    ? hardforkV2AllowHeights.testCluster
    : hardforkV2AllowHeights[n.data?.name || 'mainnet']

  if (ct.data?.height > hardforkV2AllowHeight) {
    return (
      <WalletSendSeedDialogV2
        trigger={trigger}
        open={open}
        onOpenChange={onOpenChange}
        params={dialogParams}
      />
    )
  }
  return (
    <WalletSendSeedDialogV1
      trigger={trigger}
      open={open}
      onOpenChange={onOpenChange}
      params={dialogParams}
    />
  )
}
