import {
  Button,
  Add16,
  Filter16,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  Box,
  ComboPool,
} from '@siafoundation/design-system'
import { useHosts } from '../hooks/useHosts'

export function HostsFilterDropdownMenu() {
  const { filters, setFilter } = useHosts()

  const statusValues = filters['status']?.values || []
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
                    value: 'blocked',
                    label: 'Blocked',
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
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
