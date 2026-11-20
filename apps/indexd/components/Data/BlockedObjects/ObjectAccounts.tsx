import {
  Button,
  Skeleton,
  Text,
  ValueCopyable,
} from '@siafoundation/design-system'
import { type useAdminObjectAccounts } from '@siafoundation/indexd-react'
import { CaretLeft16, CaretRight16 } from '@siafoundation/react-icons'
import { routes } from '../../../config/routes'
import { InfoRow } from '../PanelInfoRow'

export const objectAccountsLimit = 20

// The accounts that pinned the object. The panel owns the request, since it
// also uses the 404 to tell whether the object exists.
export function ObjectAccounts({
  accounts,
  offset,
  setOffset,
}: {
  accounts: ReturnType<typeof useAdminObjectAccounts>
  offset: number
  setOffset: (offset: number) => void
}) {
  if (accounts.error) {
    return <Text color="subtle">Error loading accounts.</Text>
  }
  if (!accounts.data) {
    return <Skeleton className="h-5 w-full" />
  }
  if (accounts.data.length === 0 && offset === 0) {
    return <Text color="subtle">No accounts have pinned this object.</Text>
  }
  return (
    <div className="flex flex-col gap-2">
      {accounts.data.map((account) => (
        <div
          key={account.accountKey}
          className="flex flex-col gap-1"
          data-testid="objectAccount"
        >
          <ValueCopyable
            value={account.accountKey}
            label="account"
            maxLength={30}
            href={`${routes.accounts.index}?${new URLSearchParams({
              accountsPanelId: account.accountKey,
            }).toString()}`}
          />
          <InfoRow
            label="Connect key"
            value={
              <ValueCopyable
                value={account.connectKey}
                label="connect key"
                maxLength={20}
              />
            }
          />
        </div>
      ))}
      {offset > 0 || accounts.data.length >= objectAccountsLimit ? (
        <div className="flex items-center justify-between">
          <Button
            aria-label="previous accounts"
            size="small"
            disabled={offset === 0}
            onClick={() => setOffset(Math.max(offset - objectAccountsLimit, 0))}
          >
            <CaretLeft16 />
          </Button>
          <Text size="12" color="subtle">
            {offset + 1} - {offset + accounts.data.length}
          </Text>
          <Button
            aria-label="next accounts"
            size="small"
            disabled={accounts.data.length < objectAccountsLimit}
            onClick={() => setOffset(offset + objectAccountsLimit)}
          >
            <CaretRight16 />
          </Button>
        </div>
      ) : null}
    </div>
  )
}
