import { useMemo } from 'react'
import {
  Button,
  Text,
  Tooltip,
  countryCodeEmoji,
} from '@siafoundation/design-system'
import { cx } from 'class-variance-authority'
import BigNumber from 'bignumber.js'
import { SiaCentralHost } from '@siafoundation/sia-central-types'
import {
  monthsToBlocks,
  TBToBytes,
  humanBytes,
  humanSiacoin,
  getDownloadSpeed,
  getUploadSpeed,
} from '@siafoundation/units'

type Host = SiaCentralHost

type Props = {
  host: Host
  activeHost: Host
  setRef?: (el: HTMLButtonElement | null) => void
  selectActiveHost: (public_key: string) => void
  rates: {
    usd: string
  }
}

export function HostItem({
  host,
  activeHost,
  selectActiveHost,
  setRef,
  rates,
}: Props) {
  const storageCost = useMemo(
    () =>
      rates
        ? `$${new BigNumber(host.settings?.storage_price || 0)
            .times(TBToBytes(1))
            .times(monthsToBlocks(1))
            .div(1e24)
            .times(rates?.usd || 1)
            .toFixed(2)}/TB`
        : `${humanSiacoin(
            new BigNumber(host.settings?.storage_price || 0)
              .times(TBToBytes(1))
              .times(monthsToBlocks(1)),
            { fixed: 0 }
          )}/TB`,
    [rates, host]
  )

  const downloadCost = useMemo(
    () =>
      rates
        ? `$${new BigNumber(host.settings?.download_price || 0)
            .times(TBToBytes(1))
            .div(1e24)
            .times(rates?.usd || 1)
            .toFixed(2)}/TB`
        : `${humanSiacoin(
            new BigNumber(host.settings?.download_price || 0).times(
              TBToBytes(1)
            ),
            { fixed: 0 }
          )}/TB`,
    [rates, host]
  )

  const uploadCost = useMemo(
    () =>
      rates
        ? `$${new BigNumber(host.settings?.upload_price || 0)
            .times(TBToBytes(1))
            .div(1e24)
            .times(rates?.usd || 1)
            .toFixed(2)}/TB`
        : `${humanSiacoin(
            new BigNumber(host.settings?.upload_price || 0).times(TBToBytes(1)),
            { fixed: 0 }
          )}/TB`,
    [rates, host]
  )

  return (
    <Tooltip
      content={
        <div className="flex flex-col gap-1">
          <Text color="contrast" weight="bold">
            {countryCodeEmoji(host.country_code)} {host.country_code}
          </Text>
          <div className="flex gap-2">
            <div className="flex flex-col gap-1">
              <Text color="subtle">storage</Text>
              <Text color="subtle">download</Text>
              <Text color="subtle">upload</Text>
            </div>
            <div className="flex flex-col gap-1">
              <Text color="contrast">
                {humanBytes(host.settings?.total_storage || 0)}
              </Text>
              <Text color="contrast">{getDownloadSpeed(host)}</Text>
              <Text color="contrast">{getUploadSpeed(host)}</Text>
            </div>
            <div className="flex flex-col gap-1">
              <Text color="contrast">{storageCost}</Text>
              <Text color="contrast">{downloadCost}</Text>
              <Text color="contrast">{uploadCost}</Text>
            </div>
          </div>
        </div>
      }
      key={host.public_key}
    >
      <Button
        variant="ghost"
        ref={(el) => {
          if (setRef) {
            setRef(el)
          }
        }}
        onClick={() => {
          selectActiveHost(host.public_key)
        }}
        className={cx(
          'flex gap-1',
          host.public_key === activeHost?.public_key
            ? 'opacity-100'
            : 'opacity-50',
          'hover:opacity-100'
        )}
      >
        <Text size="12" noWrap>
          {countryCodeEmoji(host.country_code)}
        </Text>
        <Text
          color="contrast"
          size="12"
          className="text-white"
          noWrap
          weight={
            host.public_key === activeHost?.public_key ? 'semibold' : 'regular'
          }
        >
          {humanBytes(host.settings?.total_storage || 0)}
          {host.benchmark && ` · ${getDownloadSpeed(host)}`}
          {' · '}
          {storageCost}
        </Text>
      </Button>
    </Tooltip>
  )
}
