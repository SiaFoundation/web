import { ControlGroup, Button, Close16 } from '@siafoundation/design-system'
import { RenterSidenav } from '../../components/RenterSidenav'
import { routes } from '../../config/routes'
import { Text, Table } from '@siafoundation/design-system'
import { useDialog } from '../../contexts/dialog'
import { useContracts } from '../../hooks/useContracts'
import { ContractsFilterDropdownMenu } from '../../components/ContractsFilterDropdownMenu'
import { ContractsViewDropdownMenu } from '../../components/ContractsViewDropdownMenu'
import { RenterdAuthedLayout } from '../../components/RenterdAuthedLayout'

export default function ContractsPage() {
  const { openDialog } = useDialog()
  const { columns, filters, removeFilter, contracts } = useContracts()

  return (
    <RenterdAuthedLayout
      title="Contracts"
      routes={routes}
      sidenav={<RenterSidenav />}
      openSettings={() => openDialog('settings')}
      filters={
        <div className="flex gap-2 flex-1">
          {Object.entries(filters).map(([key, filter]) => (
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
                {filter.values && (
                  <Text size="12">
                    {filter.values.reduce((acc, val) =>
                      acc.concat(` or ${val}`)
                    )}
                  </Text>
                )}
              </Button>
              <Button
                variant="gray"
                size="small"
                onClick={() => removeFilter(key)}
              >
                <Close16 />
              </Button>
            </ControlGroup>
          ))}
          <ContractsFilterDropdownMenu />
        </div>
      }
      size="full"
      actions={
        <div className="flex gap-2">
          <ContractsViewDropdownMenu />
        </div>
      }
    >
      <div className="p-7 min-w-fit">
        <Table data={contracts} columns={columns} summary />
      </div>
    </RenterdAuthedLayout>
  )
}
