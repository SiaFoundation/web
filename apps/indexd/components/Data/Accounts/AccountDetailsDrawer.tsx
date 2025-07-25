import { mock } from '../mockData'
import { Heading, Text } from '@siafoundation/design-system'
import { useTableParams } from '../useTableParams'
import { useMemo } from 'react'
import { DrawerContractsTable } from '../DrawerContractsTable'

export function AccountDetailsDrawer() {
  const { selectedId } = useTableParams('accountList')
  const account = useMemo(
    () => mock.accounts.find((a) => a.id === selectedId),
    [selectedId]
  )
  if (!account) {
    return (
      <div className="flex flex-col items-center justify-center overflow-hidden">
        <Text>Account not found</Text>
      </div>
    )
  }
  return (
    <div className="flex flex-col overflow-hidden">
      <Heading size="24" className="mb-2">
        Account: {account.id}
      </Heading>
      <Text size="16" weight="medium" className="mb-1">
        Contracts ({account.contractIds.length})
      </Text>
      <DrawerContractsTable scope="accountContracts" />
    </div>
  )
}
