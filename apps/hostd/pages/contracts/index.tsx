import { Flex, Box } from '@siafoundation/design-system'
import { AuthedLayout } from '../../components/AuthedLayout'
import { Table } from '../../components/Table'
import { ContractsDropdownView } from '../../components/ContractsDropdownView'
import { ContractsDropdownFilter } from '../../components/ContractsDropdownFilter'
import { useContracts } from '../../hooks/useContracts'

export default function ContractsPage() {
  const { columns, sortedContracts } = useContracts()

  return (
    <AuthedLayout
      title="Contracts"
      filters={
        <Flex gap="1">
          <ContractsDropdownFilter />
        </Flex>
      }
      size="flush"
      actions={
        <Flex gap="1">
          <ContractsDropdownView />
        </Flex>
      }
    >
      <Box
        css={{
          minWidth: 'fit-content',
          padding: '$3-5',
        }}
      >
        <Table data={sortedContracts} columns={columns} summary />
      </Box>
    </AuthedLayout>
  )
}
