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
import { SiaCentralExchangeRates } from '@siafoundation/sia-central-types'
import {
  getDownloadCost,
  getRemainingStorage,
  getStorageCost,
  getUploadCost,
} from '@siafoundation/units'
import { useMemo } from 'react'
import { routes } from '../../config/routes'
import { useExchangeRate } from '../../hooks/useExchangeRate'
import { SiaCentralHostScanned } from '../Host/types'

type Props = {
  host: SiaCentralHostScanned
  rates?: SiaCentralExchangeRates
  entity: EntityListItemLayoutProps
}

export function HostListItem({ host, rates, entity }: Props) {
  const exchange = useExchangeRate(rates)
  const storageCost = useMemo(
    () => getStorageCost({ price: host.settings.storage_price, exchange }),
    [exchange, host]
  )

  const downloadCost = useMemo(
    () => getDownloadCost({ price: host.settings.download_price, exchange }),
    [exchange, host]
  )

  const uploadCost = useMemo(
    () => getUploadCost({ price: host.settings.upload_price, exchange }),
    [exchange, host]
  )

  const remainingStorage = useMemo(() => getRemainingStorage(host), [host])

  return (
    <EntityListItemLayout {...entity}>
      <div
        className="flex flex-col items-center gap-1 w-full"
        data-testid="explorer-topHosts-item"
      >
        <div className="flex gap-2 items-center w-full @container">
          <div className="flex gap-2 items-center">
            <Link
              href={routes.host.view.replace(':id', host.public_key)}
              weight="medium"
              underline="none"
            >
              {host.net_address}
            </Link>
          </div>
          <div className="flex-1" />
          <Text color="subtle" className="hidden @sm:flex">
            {formatDistance(new Date(host.first_seen_timestamp), new Date(), {
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
