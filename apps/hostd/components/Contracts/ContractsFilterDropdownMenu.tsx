import {
  Button,
  Add16,
  Filter16,
  DropdownMenu,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
  PoolCombo,
} from '@siafoundation/design-system'
import { useContracts } from '../../hooks/useContracts'

export function ContractsFilterDropdownMenu() {
  const { filters, setFilter } = useContracts()

  const statusValues = filters['status']?.values || []
  const expirationDateValue = filters['expirationDate']?.value
  return (
    <DropdownMenu
      trigger={
        <Button size="small">
          <Filter16 />
          Filter
          <Add16 />
        </Button>
      }
      contentProps={{
        align: 'start',
        className: 'max-w-[300px]',
      }}
    >
      <DropdownMenuGroup>
        <DropdownMenuLabel>Status</DropdownMenuLabel>
        <DropdownMenuItem>
          <div className="py-2">
            <PoolCombo
              options={[
                {
                  value: 'active',
                  label: 'Active',
                },
                {
                  value: 'successful',
                  label: 'Successful',
                },
                {
                  value: 'failed',
                  label: 'Failed',
                },
              ]}
              values={statusValues}
              onChange={(value) => {
                if (statusValues.includes(value)) {
                  setFilter({
                    key: 'status',
                    values: statusValues.filter((v) => v !== value),
                  })
                } else {
                  setFilter({
                    key: 'status',
                    values: statusValues.concat(value),
                  })
                }
              }}
            />
          </div>
        </DropdownMenuItem>
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
      <DropdownMenuGroup>
        <DropdownMenuLabel>Expiration date</DropdownMenuLabel>
        <DropdownMenuItem>
          <div className="py-2">
            <PoolCombo
              options={[
                {
                  value: 'day',
                  label: 'Today',
                },
                {
                  value: 'week',
                  label: 'This week',
                },
                {
                  value: 'month',
                  label: 'This month',
                },
                {
                  value: 'year',
                  label: 'This year',
                },
                // {
                //   label: <Calendar16 />,
                //   value: 'Custom range',
                // },
              ]}
              values={[expirationDateValue]}
              onChange={(value) =>
                setFilter({
                  key: 'expirationDate',
                  value,
                })
              }
            />
          </div>
        </DropdownMenuItem>
      </DropdownMenuGroup>
    </DropdownMenu>
  )
}
