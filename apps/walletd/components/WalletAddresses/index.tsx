import { Link, Table, Text, truncate } from '@siafoundation/design-system'
import { routes } from '../../config/routes'
import { useDialog } from '../../contexts/dialog'
import { WalletdAuthedLayout } from '../WalletdAuthedLayout'
import { WalletdSidenav } from '../WalletdSidenav'
import { AddressesActionsMenu } from './AddressesActionsMenu'
import { useRouter } from 'next/router'
import { useAddresses } from '../../contexts/addresses'
import { StateNoneMatching } from './StateNoneMatching'
import { StateNoneYet } from './StateNoneYet'
import { StateError } from './StateError'
import { useWallets } from '../../contexts/wallets'
import { AddressesFiltersBar } from './AddressesFilterBar'

export function WalletAddresses() {
  const router = useRouter()
  const id = router.query.id as string
  const { openDialog } = useDialog()
  const { wallet } = useWallets()
  const {
    dataset,
    dataState,
    columns,
    cellContext,
    sortableColumns,
    sortDirection,
    sortField,
    toggleSort,
  } = useAddresses()

  return (
    <WalletdAuthedLayout
      routes={routes}
      sidenav={<WalletdSidenav />}
      openSettings={() => openDialog('settings')}
      title={wallet?.name}
      navTitle={
        <div className="flex gap-2 relative -top-px">
          <Link
            underline="hover"
            font="mono"
            size="18"
            weight="bold"
            href={{
              pathname: routes.wallet.view,
              query: {
                id,
              },
            }}
          >
            {truncate(wallet?.name, 20)}
          </Link>
          <Text font="mono" size="18" weight="normal" color="verySubtle">
            /
          </Text>
          <Text font="mono" size="18" weight="bold">
            Addresses
          </Text>
        </div>
      }
      actions={<AddressesActionsMenu />}
      stats={<AddressesFiltersBar />}
      size="3"
    >
      <div className="px-6 py-7 min-w-fit">
        <Table
          isLoading={dataState === 'loading'}
          emptyState={
            dataState === 'noneMatchingFilters' ? (
              <StateNoneMatching />
            ) : dataState === 'noneYet' ? (
              <StateNoneYet />
            ) : dataState === 'error' ? (
              <StateError />
            ) : null
          }
          pageSize={6}
          data={dataset}
          context={cellContext}
          columns={columns}
          sortableColumns={sortableColumns}
          sortDirection={sortDirection}
          sortField={sortField}
          toggleSort={toggleSort}
        />
      </div>
    </WalletdAuthedLayout>
  )
}
