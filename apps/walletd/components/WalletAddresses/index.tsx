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

export function WalletAddresses() {
  const router = useRouter()
  const name = router.query.name as string
  const { openDialog } = useDialog()
  const {
    dataset,
    dataState,
    columns,
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
      title={name}
      navTitle={
        <div className="flex gap-2 relative -top-px">
          <Link
            underline="hover"
            font="mono"
            size="18"
            weight="bold"
            href={routes.wallet.view.replace(':name', name)}
          >
            {truncate(name, 20)}
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
      size="3"
    >
      <div className="px-6 py-7">
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
