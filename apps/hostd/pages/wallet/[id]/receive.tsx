import {
  Button,
  EntityList,
  EntityListItemProps,
  Flex,
  Panel,
  stripPrefix,
  truncate,
} from '@siafoundation/design-system'
import { useRouter } from 'next/router'
import { useMemo } from 'react'
import { useWalletAddresses } from '@siafoundation/react-core'
import { AuthedLayout } from '../../../components/AuthedLayout'
import { Wallet } from '../../../components/User/Wallet'
import { useWallets } from '../../../contexts/wallets'
import { AddressCode } from '../../../components/AddressCode'
import { useDialog } from '../../../contexts/dialog'

export default function WalletView() {
  const router = useRouter()
  const { openDialog } = useDialog()
  const walletId = router.query.id as string

  const { wallets } = useWallets()
  const wallet = useMemo(
    () => wallets.data?.find((w) => w.id === walletId),
    [walletId, wallets]
  )
  const addresses = useWalletAddresses()

  const entities: EntityListItemProps[] = useMemo(
    () =>
      addresses.data?.map((a) => ({
        type: 'address',
        hash: stripPrefix(a),
        onClick: () => openDialog('addressDetails', stripPrefix(a)),
      })) || [],
    [addresses, openDialog]
  )

  const latestAddress = addresses.data?.[0]

  return (
    <AuthedLayout
      title={`Wallets / ${truncate(wallet?.name, 20)} / Receive`}
      actions={
        <>
          <Wallet />
          <Button variant="accent" size="2">
            Send
          </Button>
          <Button variant="accent" size="2">
            Receive
          </Button>
        </>
      }
    >
      <Flex direction="column" gap="3" align="center">
        {latestAddress && (
          <Panel css={{ p: '$3 $5' }}>
            <AddressCode title="Latest address" address={latestAddress} />
          </Panel>
        )}
        <Flex direction="column" gap="1" css={{ width: '100%' }}>
          <EntityList title="Addresses" entities={entities} />
        </Flex>
      </Flex>
    </AuthedLayout>
  )
}
