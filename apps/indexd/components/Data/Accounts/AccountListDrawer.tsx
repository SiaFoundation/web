import { DatumCard, Heading } from '@siafoundation/design-system'
import { mock } from '../mockData'

export function AccountListDrawer() {
  return (
    <div className="flex flex-col overflow-hidden">
      <Heading size="24" className="mb-2">
        Accounts
      </Heading>
      <DatumCard label="Total Accounts" value={mock.accounts.length} />
    </div>
  )
}
