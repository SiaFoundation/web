import {
  EntityList,
  EntityListItemProps,
  Flex,
  Panel,
  stripPrefix,
  AppAuthedLayout,
  WalletAddressCode,
  WalletLayoutActions,
} from '@siafoundation/design-system'
import { useMemo } from 'react'
import { useWalletAddresses } from '@siafoundation/react-core'
import { useDialog } from '../../contexts/dialog'
import { routes } from '../../config/routes'
import { RenterSidenav } from '../../components/RenterSidenav'

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
    <AppAuthedLayout
      routes={routes}
      sidenav={<RenterSidenav />}
      openSettings={() => openDialog('settings')}
      title={`Wallet / Addresses`}
      actions={
        <WalletLayoutActions
          routes={routes}
          sendSiacoin={() => openDialog('sendSiacoin')}
        />
      }
    >
      <Flex direction="column" gap="3" align="center">
        {latestAddress && (
          <Panel css={{ p: '$3 $5' }}>
            <WalletAddressCode title="Latest address" address={latestAddress} />
          </Panel>
        )}
        <Flex direction="column" gap="1" css={{ width: '100%' }}>
          <EntityList title="Addresses" entities={entities} />
        </Flex>
      </Flex>
    </AppAuthedLayout>
  )
}
