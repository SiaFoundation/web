'use client'

import { formatDistance } from 'date-fns'
import {
  EntityListItemLayout,
  EntityListItemLayoutProps,
  Text,
  Tooltip,
  Link,
} from '@siafoundation/design-system'
import {
  CloudDownload16,
  CloudUpload16,
  OpenPanelFilledBottom16,
  VmdkDisk16,
} from '@siafoundation/react-icons'
import {
  getDownloadCost,
  getStorageCost,
  getUploadCost,
  humanBytes,
} from '@siafoundation/units'
import { useMemo } from 'react'
import { routes } from '../../config/routes'
import { ExplorerHost } from '@siafoundation/explored-types'
import BigNumber from 'bignumber.js'
import { CurrencyOption, SWRError } from '@siafoundation/react-core'
import LoadingCurrency from '../LoadingCurrency'
import { getHostNetAddress } from '../../lib/hostType'

type Props = {
  host: ExplorerHost
  exchange: {
    rate: BigNumber | undefined
    error: SWRError | undefined
    isValidating: boolean
    isLoading: boolean
    currency: CurrencyOption | undefined
  }
  entity: EntityListItemLayoutProps
}

export function HostListItem({ host, exchange, entity }: Props) {
  const storageCost = useMemo(
    () =>
      exchange.currency && exchange.rate ? (
        getStorageCost({
          price: host.v2
            ? host.rhpV4Settings.prices.storagePrice
            : host.settings.storageprice,
          exchange: {
            currency: { prefix: exchange.currency.prefix },
            rate: exchange.rate.toString(),
          },
        })
      ) : (
        <LoadingCurrency type="perTB" />
      ),
    [exchange, host]
  )

  const downloadCost = useMemo(
    () =>
      exchange.currency && exchange.rate ? (
        getDownloadCost({
          price: host.v2
            ? host.rhpV4Settings.prices.egressPrice
            : host.settings.downloadbandwidthprice,
          exchange: {
            currency: { prefix: exchange.currency.prefix },
            rate: exchange.rate.toString(),
          },
        })
      ) : (
        <LoadingCurrency type="perTB" />
      ),
    [exchange, host]
  )

  const uploadCost = useMemo(
    () =>
      exchange.currency && exchange.rate ? (
        getUploadCost({
          price: host.v2
            ? host.rhpV4Settings.prices.ingressPrice
            : host.settings.uploadbandwidthprice,
          exchange: {
            currency: { prefix: exchange.currency.prefix },
            rate: exchange.rate.toString(),
          },
        })
      ) : (
        <LoadingCurrency type="perTB" />
      ),
    [exchange, host]
  )

  const remainingStorage = useMemo(
    () =>
      (host.v2 ? host.rhpV4Settings : host.settings)
        ? humanBytes(
            host.v2
              ? host.rhpV4Settings.remainingStorage
              : host.settings.remainingstorage
          )
        : '-',
    [host]
  )

  return (
    <EntityListItemLayout {...entity}>
      <div
        className="flex flex-col items-center gap-1 w-full"
        data-testid="explorer-topHosts-item"
      >
        <div className="flex gap-2 items-center w-full @container">
          <div className="flex gap-2 items-center">
            <Link
              href={routes.host.view.replace(':id', host.publicKey)}
              weight="medium"
              underline="none"
            >
              {getHostNetAddress(host)}
            </Link>
          </div>
          <div className="flex-1" />
          <Text color="subtle" className="hidden @sm:flex">
            {formatDistance(new Date(host.knownSince), new Date(), {
              addSuffix: false,
            })}{' '}
            old
          </Text>
        </div>
        <div className="flex gap-2 w-full pt-1 pb-1 @container">
          <div className="flex gap-1 items-center">
            <Text size="10" color="subtle" ellipsis className="scale-75">
              <VmdkDisk16 />
            </Text>
            <Tooltip content="Storage cost per month">
              <Text size="10" color="contrast" ellipsis>
                {storageCost}
              </Text>
            </Tooltip>
          </div>
          <div className="flex gap-1 items-center">
            <Text size="10" color="subtle" ellipsis className="scale-75">
              <CloudDownload16 />
            </Text>
            <Tooltip content="Download cost">
              <Text size="10" color="contrast" ellipsis>
                {downloadCost}
              </Text>
            </Tooltip>
          </div>
          <div className="flex gap-1 items-center">
            <Text size="10" color="subtle" ellipsis className="scale-75">
              <CloudUpload16 />
            </Text>
            <Tooltip content="Upload cost">
              <Text size="10" color="contrast" ellipsis>
                {uploadCost}
              </Text>
            </Tooltip>
          </div>
          <div className="hidden @xs:flex gap-1 items-center">
            <Text size="10" color="subtle" ellipsis className="scale-75">
              <OpenPanelFilledBottom16 />
            </Text>
            <Tooltip content="Remaining storage">
              <Text size="10" color="contrast" ellipsis>
                {remainingStorage}
              </Text>
            </Tooltip>
          </div>
        </div>
      </div>
    </EntityListItemLayout>
  )
}
