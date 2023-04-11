import {
  Close16,
  Text,
  Button,
  ControlGroup,
  Table,
} from '@siafoundation/design-system'
import { ContractsViewDropdownMenu } from './ContractsViewDropdownMenu'
import { ContractsFilterDropdownMenu } from './ContractsFilterDropdownMenu'
import { useContracts } from '../../hooks/useContracts'
import { HostdAuthedLayout } from '../../components/HostdAuthedLayout'
import { HostdSidenav } from '../HostdSidenav'
import { useDialog } from '../../contexts/dialog'
import { routes } from '../../config/routes'

export function Contracts() {
  const { openDialog } = useDialog()
  const { columns, filters, removeFilter, contracts } = useContracts()

  return (
    <HostdAuthedLayout
      title="Contracts"
      routes={routes}
      sidenav={<HostdSidenav />}
      openSettings={() => openDialog('settings')}
      nav={
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
      size="4"
      actions={
        <div className="flex gap-2">
          <ContractsViewDropdownMenu />
        </div>
      }
    >
      <div className="min-w-fit p-7">
        <Table
          isLoading={false}
          pageSize={20}
          data={contracts}
          columns={columns}
          summary
        />
      </div>
    </HostdAuthedLayout>
  )
}
