'use client'

import { useMemo } from 'react'
import {
  Button,
  Text,
  LinkButton,
  webLinks,
  useActiveSiascanExchangeRate,
} from '@siafoundation/design-system'
import { cx } from 'class-variance-authority'
import BigNumber from 'bignumber.js'
import { ExplorerPartialHost } from './types'
import { Launch16 } from '@siafoundation/react-icons'
import {
  monthsToBlocks,
  TBToBytes,
  countryCodeEmoji,
} from '@siafoundation/units'

type Props = {
  host: ExplorerPartialHost
  activeHost: ExplorerPartialHost | undefined
  setRef?: (el: HTMLButtonElement) => void
  selectActiveHost: (public_key: string) => void
}

export function HostItem({
  host,
  activeHost,
  selectActiveHost,
  setRef,
}: Props) {
  const rate = useActiveSiascanExchangeRate()
  const storageCost = useMemo(
    () =>
      `${rate.currency?.prefix}${new BigNumber(host.storagePrice)
        .times(TBToBytes(1))
        .times(monthsToBlocks(1))
        .div(1e24)
        .times(rate.rate || 1)
        .toFixed(2)}/TB`,
    [rate, host],
  )

  const downloadCost = useMemo(
    () =>
      `${rate.currency?.prefix}${new BigNumber(host.downloadPrice)
        .times(TBToBytes(1))
        .div(1e24)
        .times(rate.rate || 1)
        .toFixed(2)}/TB`,
    [rate, host],
  )

  const uploadCost = useMemo(
    () =>
      `${rate.currency?.prefix}${new BigNumber(host.uploadPrice)
        .times(TBToBytes(1))
        .div(1e24)
        .times(rate.rate || 1)
        .toFixed(2)}/TB`,
    [rate, host],
  )

  return (
    <Button
      onClick={() => selectActiveHost(host.publicKey)}
      className={cx(
        'flex flex-col py-1 px-2 gap-1 h-[100px] cursor-pointer',
        activeHost?.publicKey === host.publicKey && 'ring !ring-green-600',
      )}
      key={host.publicKey}
      id={host.publicKey}
    >
      <div className="w-full flex justify-between items-center">
        <Text color="contrast" weight="bold" className="text-start">
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
