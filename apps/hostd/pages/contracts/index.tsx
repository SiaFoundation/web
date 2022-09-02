import {
  Close16,
  Text,
  Flex,
  Box,
  Button,
  IconButton,
  ControlGroup,
} from '@siafoundation/design-system'
import { AuthedLayout } from '../../components/AuthedLayout'
import { Table } from '../../components/Table'
import { ContractsViewDropdownMenu } from '../../components/ContractsViewDropdownMenu'
import { ContractsFilterDropdownMenu } from '../../components/ContractsFilterDropdownMenu'
import { useContracts } from '../../hooks/useContracts'

export default function ContractsPage() {
  const { columns, filters, removeFilter, contracts } = useContracts()

  return (
    <AuthedLayout
      title="Contracts"
      filters={
        <Flex gap="1" css={{ flex: 1 }}>
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
              <IconButton
                variant="gray"
                size="1"
                onClick={() => removeFilter(key)}
              >
                <Close16 />
              </IconButton>
            </ControlGroup>
          ))}
          <ContractsFilterDropdownMenu />
        </Flex>
      }
      size="flush"
      actions={
        <Flex gap="1">
          <ContractsViewDropdownMenu />
        </Flex>
      }
    >
      <Box
        css={{
          minWidth: 'fit-content',
          padding: '$3-5',
        }}
      >
        <Table data={contracts} columns={columns} summary />
      </Box>
    </AuthedLayout>
  )
}
