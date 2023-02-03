import { Button, ControlGroup, Close16 } from '@siafoundation/design-system'
import { RenterSidenav } from '../RenterSidenav'
import { routes } from '../../config/routes'
import { Text, Table } from '@siafoundation/design-system'
import { useDialog } from '../../contexts/dialog'
import { useHosts } from '../../hooks/useHosts'
import { HostsFilterDropdownMenu } from './HostsFilterDropdownMenu'
import { HostsViewDropdownMenu } from './HostsViewDropdownMenu'
import { HostsPaginator } from './HostsPaginator'
import { RenterdAuthedLayout } from '../RenterdAuthedLayout'

export function Hosts() {
  const { openDialog } = useDialog()
  const { hosts, columns, filters, removeFilter } = useHosts()

  return (
    <RenterdAuthedLayout
      title="Hosts"
      routes={routes}
      sidenav={<RenterSidenav />}
      openSettings={() => openDialog('settings')}
      filters={
        <div className="flex gap-2 flex-1">
          {Object.entries(filters).map(([key, filter]) => {
            if (filter.type === 'contains') {
              return (
                <ControlGroup key={key}>
                  <Button disabled>
                    <Text size="12">{key}</Text>
                  </Button>
                  <Button disabled>
                    <Text size="12" color="subtle">
                      is
                    </Text>
                  </Button>
                  <Button disabled>
                    {filter.value && <Text size="12">{filter.value}</Text>}
                  </Button>
                  <Button onClick={() => removeFilter(key)}>
                    <Close16 />
                  </Button>
                </ControlGroup>
              )
            }
            if (filter.type === 'bool') {
              return (
                <ControlGroup key={key}>
                  <Button disabled>
                    <Text size="12" color="subtle">
                      {filter.value ? 'on' : 'not on'}
                    </Text>
                  </Button>
                  <Button disabled>
                    <Text size="12">{key}</Text>
                  </Button>
                  <Button onClick={() => removeFilter(key)}>
                    <Close16 />
                  </Button>
                </ControlGroup>
              )
            }
          })}
          <HostsFilterDropdownMenu />
        </div>
      }
      actions={
        <div className="flex gap-2">
          <HostsPaginator />
          <HostsViewDropdownMenu />
        </div>
      }
    >
      <div className="p-5 min-w-fit">
        <Table data={hosts} columns={columns} rowSize="default" />
      </div>
    </RenterdAuthedLayout>
  )
}
