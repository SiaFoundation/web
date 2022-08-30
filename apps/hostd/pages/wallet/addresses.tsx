import {
  EntityList,
  EntityListItemProps,
  Flex,
  Panel,
  stripPrefix,
} from '@siafoundation/design-system'
import { useMemo } from 'react'
import { useWalletAddresses } from '@siafoundation/react-core'
import { AuthedLayout } from '../../components/AuthedLayout'
import { AddressCode } from '../../components/AddressCode'
import { useDialog } from '../../contexts/dialog'
import { WalletLayoutActions } from '../../components/WalletLayoutActions'

export default function WalletView() {
  const { openDialog } = useDialog()

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
      title={`Wallet / Addresses`}
      actions={<WalletLayoutActions />}
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
