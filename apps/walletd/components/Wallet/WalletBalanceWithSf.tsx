import { Warning16 } from '@siafoundation/react-icons'
import { Panel, Separator, Text, Tooltip } from '@siafoundation/design-system'
import { humanSiacoin, humanSiafund } from '@siafoundation/sia-js'
import BigNumber from 'bignumber.js'
import { cx } from 'class-variance-authority'

export function WalletBalanceWithSf({
  sc,
  sf,
  isSynced,
  syncingMessage,
}: {
  sc: BigNumber
  sf: number
  isSynced: boolean
  syncingMessage?: string
}) {
  const el = (
    <>
      <Tooltip
        side="bottom"
        content={humanSiacoin(sc, {
          dynamicUnits: false,
        })}
      >
        <Text size="12" weight="semibold" className="flex items-center h-full">
          {humanSiacoin(sc)}
        </Text>
      </Tooltip>
      {!!sf && (
        <>
          <Separator variant="vertical" className="h-full" />
          <Tooltip side="bottom" content={humanSiafund(sf)}>
            <Text
              size="12"
              weight="semibold"
              className="flex items-center h-full"
            >
              {humanSiafund(sf)}
            </Text>
          </Tooltip>
        </>
      )}
    </>
  )

  return (
    <Panel
      className={cx(
        'hidden sm:flex h-7 items-center gap-2',
        !isSynced ? 'pl-2 pr-3' : 'px-3'
      )}
    >
      {!isSynced && (
        <Tooltip
          side="bottom"
          content={
            syncingMessage || 'Blockchain is syncing, balance may be incorrect.'
          }
        >
          <Text color="amber" className="flex items-center h-full">
            <Warning16 />
          </Text>
        </Tooltip>
      )}
      {el}
    </Panel>
  )
}
