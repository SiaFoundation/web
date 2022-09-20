import {
  Button,
  Add16,
  Filter16,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
  Box,
  ComboPool,
} from '@siafoundation/design-system'
import { useContracts } from '../hooks/useContracts'

export function ContractsFilterDropdownMenu() {
  const { filters, setFilter } = useContracts()

  const statusValues = filters['status']?.values || []
  const expirationDateValue = filters['expirationDate']?.value
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="1">
          <Filter16 />
          Filter
          <Add16 />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" css={{ maxWidth: '300px' }}>
        <DropdownMenuGroup>
          <DropdownMenuLabel>Status</DropdownMenuLabel>
          <DropdownMenuItem css={{ height: 'inherit' }}>
            <Box
              css={{
                padding: '$1 0',
              }}
            >
              <ComboPool
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
            </Box>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuLabel>Expiration date</DropdownMenuLabel>
          <DropdownMenuItem css={{ height: 'inherit' }}>
            <Box
              css={{
                padding: '$1 0',
              }}
            >
              <ComboPool
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
            </Box>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
