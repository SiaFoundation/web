import { useMemo } from 'react'
import {
  Button,
  Text,
  Tooltip,
  countryCodeEmoji,
  useActiveExchangeRate,
} from '@siafoundation/design-system'
import { cx } from 'class-variance-authority'
import BigNumber from 'bignumber.js'
import {
  monthsToBlocks,
  TBToBytes,
  humanBytes,
  humanSiacoin,
} from '@siafoundation/units'
import { ExplorerHost } from '@siafoundation/explored-types'

type Host = ExplorerHost

type Props = {
  host: Host
  activeHost: Host
  setRef?: (el: HTMLButtonElement | null) => void
  selectActiveHost: (public_key: string) => void
}

export function HostItem({
  host,
  activeHost,
  selectActiveHost,
  setRef,
}: Props) {
  const { rate, currency } = useActiveExchangeRate()
  const storageCost = useMemo(
    () =>
      rate && currency
        ? `${currency.prefix}${new BigNumber(host.settings?.storageprice || 0)
            .times(TBToBytes(1))
            .times(monthsToBlocks(1))
            .div(1e24)
            .times(rate)
            .toFixed(2)}/TB`
        : `${humanSiacoin(
            new BigNumber(host.settings?.storageprice || 0)
              .times(TBToBytes(1))
              .times(monthsToBlocks(1)),
            { fixed: 0 }
          )}/TB`,
    [rate, currency, host]
  )

  const downloadCost = useMemo(
    () =>
      rate && currency
        ? `${currency.prefix}${new BigNumber(
            host.settings?.downloadbandwidthprice || 0
          )
            .times(TBToBytes(1))
            .div(1e24)
            .times(rate)
            .toFixed(2)}/TB`
        : `${humanSiacoin(
            new BigNumber(host.settings?.downloadbandwidthprice || 0).times(
              TBToBytes(1)
            ),
            { fixed: 0 }
          )}/TB`,
    [rate, currency, host]
  )

  const uploadCost = useMemo(
    () =>
      rate && currency
        ? `${currency.prefix}${new BigNumber(
            host.settings?.uploadbandwidthprice || 0
          )
            .times(TBToBytes(1))
            .div(1e24)
            .times(rate)
            .toFixed(2)}/TB`
        : `${humanSiacoin(
            new BigNumber(host.settings?.uploadbandwidthprice || 0).times(
              TBToBytes(1)
            ),
            { fixed: 0 }
          )}/TB`,
    [rate, currency, host]
  )

  return (
    <Tooltip
      content={
        <div className="flex flex-col gap-1">
          <Text size="12" color="contrast" weight="bold">
            {countryCodeEmoji(host.location.countryCode)}{' '}
            {host.location.countryCode}
          </Text>
          <div className="flex gap-2">
            <div className="flex flex-col gap-1">
              <Text size="12" color="subtle">
                storage
              </Text>
              <Text size="12" color="subtle">
                download
              </Text>
              <Text size="12" color="subtle">
                upload
              </Text>
            </div>
            <div className="flex flex-col gap-1">
              <Text size="12" color="contrast">
                {storageCost}
              </Text>
              <Text size="12" color="contrast">
                {downloadCost}
              </Text>
              <Text size="12" color="contrast">
                {uploadCost}
              </Text>
            </div>
          </div>
        </div>
      }
      key={host.publicKey}
    >
      <Button
        variant="ghost"
        ref={(el) => {
          if (setRef) {
            setRef(el)
          }
        }}
        onClick={() => {
          selectActiveHost(host.publicKey)
        }}
        className={cx(
          'flex gap-1',
          host.publicKey === activeHost?.publicKey
            ? 'opacity-100'
            : 'opacity-50',
          'hover:opacity-100'
        )}
      >
        <Text size="12" noWrap>
          {countryCodeEmoji(host.location.countryCode)}
        </Text>
        <Text
          color="contrast"
          size="12"
          className="text-white"
          noWrap
          weight={
            host.publicKey === activeHost?.publicKey ? 'semibold' : 'regular'
          }
        >
          {humanBytes(host.settings?.totalstorage || 0)}
          {' · '}
          {storageCost}
        </Text>
      </Button>
    </Tooltip>
  )
}
