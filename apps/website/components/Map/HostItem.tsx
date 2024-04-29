import { useMemo } from 'react'
import {
  Button,
  Text,
  countryCodeEmoji,
  LinkButton,
  webLinks,
} from '@siafoundation/design-system'
import { cx } from 'class-variance-authority'
import BigNumber from 'bignumber.js'
import { SiaCentralPartialHost } from '../../content/geoHosts'
import { Launch16 } from '@siafoundation/react-icons'
import {
  monthsToBlocks,
  TBToBytes,
  humanBytes,
  humanSiacoin,
  getDownloadSpeed,
  getUploadSpeed,
} from '@siafoundation/units'

type Props = {
  host: SiaCentralPartialHost
  activeHost: SiaCentralPartialHost
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
        ? `$${new BigNumber(host.settings.storage_price)
            .times(TBToBytes(1))
            .times(monthsToBlocks(1))
            .div(1e24)
            .times(rates?.usd || 1)
            .toFixed(2)}/TB`
        : `${humanSiacoin(
            new BigNumber(host.settings.storage_price)
              .times(TBToBytes(1))
              .times(monthsToBlocks(1)),
            { fixed: 0 }
          )}/TB`,
    [rates, host]
  )

  const downloadCost = useMemo(
    () =>
      rates
        ? `$${new BigNumber(host.settings.download_price)
            .times(TBToBytes(1))
            .div(1e24)
            .times(rates?.usd || 1)
            .toFixed(2)}/TB`
        : `${humanSiacoin(
            new BigNumber(host.settings.download_price).times(TBToBytes(1)),
            { fixed: 0 }
          )}/TB`,
    [rates, host]
  )

  const uploadCost = useMemo(
    () =>
      rates
        ? `$${new BigNumber(host.settings.upload_price)
            .times(TBToBytes(1))
            .div(1e24)
            .times(rates?.usd || 1)
            .toFixed(2)}/TB`
        : `${humanSiacoin(
            new BigNumber(host.settings.upload_price).times(TBToBytes(1)),
            { fixed: 0 }
          )}/TB`,
    [rates, host]
  )

  return (
    <Button
      onClick={() => selectActiveHost(host.public_key)}
      className={cx(
        'flex flex-col py-1 px-2 gap-1 h-[100px] cursor-pointer',
        activeHost?.public_key === host.public_key && 'ring !ring-green-600'
      )}
      key={host.public_key}
      id={host.public_key}
    >
      <div className="w-full flex justify-between items-center">
        <Text color="contrast" weight="bold" className="text-start">
          {countryCodeEmoji(host.country_code)} {host.country_code}
        </Text>
        <LinkButton
          size="none"
          variant="ghost"
          target="_blank"
          tabIndex={-1}
          href={`${webLinks.explore.mainnet}/host/${host.public_key}`}
        >
          <Launch16 />
        </LinkButton>
      </div>
      <div className="flex gap-2 justify-between">
        <div className="flex flex-col gap-1 items-start">
          <Text color="subtle" noWrap>
            storage
          </Text>
          <Text color="subtle" noWrap>
            download
          </Text>
          <Text color="subtle" noWrap>
            upload
          </Text>
        </div>
        <div className="flex flex-col gap-1 items-end">
          <Text color="contrast" ellipsis>
            {humanBytes(host.settings.total_storage)}
          </Text>
          <Text color="contrast" ellipsis>
            {getDownloadSpeed(host)}
          </Text>
          <Text color="contrast" ellipsis>
            {getUploadSpeed(host)}
          </Text>
        </div>
        <div className="flex flex-col gap-1 items-end">
          <Text color="contrast" ellipsis>
            {storageCost}
          </Text>
          <Text color="contrast" ellipsis>
            {downloadCost}
          </Text>
          <Text color="contrast" ellipsis>
            {uploadCost}
          </Text>
        </div>
      </div>
    </Button>
  )
}
