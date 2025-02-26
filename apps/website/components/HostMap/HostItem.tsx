import { useMemo } from 'react'
import {
  Button,
  Text,
  Tooltip,
  countryCodeEmoji,
  LinkButton,
  webLinks,
} from '@siafoundation/design-system'
import { cx } from 'class-variance-authority'
import BigNumber from 'bignumber.js'
import { ExplorerPartialHost } from '../../content/geoHosts'
import { Launch16 } from '@siafoundation/react-icons'
import {
  monthsToBlocks,
  TBToBytes,
  humanBytes,
  humanSiacoin,
} from '@siafoundation/units'

type Props = {
  host: ExplorerPartialHost
  activeHost?: ExplorerPartialHost
  setRef?: (el: HTMLButtonElement) => void
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
        ? `$${new BigNumber(host.settings.storageprice)
            .times(TBToBytes(1))
            .times(monthsToBlocks(1))
            .div(1e24)
            .times(rates?.usd || 1)
            .toFixed(2)}/TB`
        : `${humanSiacoin(
            new BigNumber(host.settings.storageprice)
              .times(TBToBytes(1))
              .times(monthsToBlocks(1)),
            { fixed: 0 }
          )}/TB`,
    [rates, host]
  )

  const downloadCost = useMemo(
    () =>
      rates
        ? `$${new BigNumber(host.settings.downloadbandwidthprice)
            .times(TBToBytes(1))
            .div(1e24)
            .times(rates?.usd || 1)
            .toFixed(2)}/TB`
        : `${humanSiacoin(
            new BigNumber(host.settings.downloadbandwidthprice).times(
              TBToBytes(1)
            ),
            { fixed: 0 }
          )}/TB`,
    [rates, host]
  )

  const uploadCost = useMemo(
    () =>
      rates
        ? `$${new BigNumber(host.settings.uploadbandwidthprice)
            .times(TBToBytes(1))
            .div(1e24)
            .times(rates?.usd || 1)
            .toFixed(2)}/TB`
        : `${humanSiacoin(
            new BigNumber(host.settings.uploadbandwidthprice).times(
              TBToBytes(1)
            ),
            { fixed: 0 }
          )}/TB`,
    [rates, host]
  )

  return (
    <Tooltip
      content={
        <div className="flex flex-col gap-1">
          <div className="w-full flex justify-between items-center">
            <Text
              size="12"
              color="contrast"
              weight="bold"
              className="text-start"
            >
              {countryCodeEmoji(host.countryCode)} {host.countryCode}
            </Text>
            <LinkButton
              size="none"
              variant="ghost"
              target="_blank"
              tabIndex={-1}
              href={`${webLinks.explore.mainnet}/host/${host.publicKey}`}
            >
              <Launch16 />
            </LinkButton>
          </div>
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
          {countryCodeEmoji(host.countryCode)}
        </Text>
        <Text
          color="contrast"
          size="12"
          noWrap
          weight={
            host.publicKey === activeHost?.publicKey ? 'semibold' : 'regular'
          }
        >
          {humanBytes(host.settings.totalstorage)}
          {' · '}
          {storageCost}
        </Text>
      </Button>
    </Tooltip>
  )
}
