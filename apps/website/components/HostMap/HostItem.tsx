import { useMemo } from 'react'
import {
  Button,
  Text,
  Tooltip,
  countryCodeEmoji,
  LinkButton,
  webLinks,
  useSiascanExchangeRate,
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
}

export function HostItem({
  host,
  activeHost,
  selectActiveHost,
  setRef,
}: Props) {
  const { rate: rateUsd } = useSiascanExchangeRate({
    currency: 'usd',
  })
  const storageCost = useMemo(() => {
    return rateUsd
      ? `$${new BigNumber(host.storagePrice)
          .times(TBToBytes(1))
          .times(monthsToBlocks(1))
          .div(1e24)
          .times(rateUsd)
          .toFixed(2)}/TB`
      : `${humanSiacoin(
          new BigNumber(host.storagePrice)
            .times(TBToBytes(1))
            .times(monthsToBlocks(1)),
          { fixed: 0 }
        )}/TB`
  }, [rateUsd, host])

  const downloadCost = useMemo(
    () =>
      rateUsd
        ? `$${new BigNumber(host.downloadPrice)
            .times(TBToBytes(1))
            .div(1e24)
            .times(rateUsd)
            .toFixed(2)}/TB`
        : `${humanSiacoin(
            new BigNumber(host.downloadPrice).times(TBToBytes(1)),
            { fixed: 0 }
          )}/TB`,
    [rateUsd, host]
  )

  const uploadCost = useMemo(
    () =>
      rateUsd
        ? `$${new BigNumber(host.uploadPrice)
            .times(TBToBytes(1))
            .div(1e24)
            .times(rateUsd)
            .toFixed(2)}/TB`
        : `${humanSiacoin(new BigNumber(host.uploadPrice).times(TBToBytes(1)), {
            fixed: 0,
          })}/TB`,
    [rateUsd, host]
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
              {countryCodeEmoji(host.location.countryCode)}{' '}
              {host.location.countryCode}
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
          {countryCodeEmoji(host.location.countryCode)}
        </Text>
        <Text
          color="contrast"
          size="12"
          noWrap
          weight={
            host.publicKey === activeHost?.publicKey ? 'semibold' : 'regular'
          }
        >
          {humanBytes(host.totalStorage)}
          {' · '}
          {storageCost}
        </Text>
      </Button>
    </Tooltip>
  )
}
