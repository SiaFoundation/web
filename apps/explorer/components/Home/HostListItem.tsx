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
  VmdkDisk16,
} from '@siafoundation/react-icons'
import { SiaCentralExchangeRates } from '@siafoundation/sia-central-types'
import {
  getDownloadCost,
  getDownloadSpeed,
  getRemainingStorage,
  getStorageCost,
  getUploadCost,
  getUploadSpeed,
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

  const downloadSpeed = useMemo(() => getDownloadSpeed(host), [host])

  const uploadSpeed = useMemo(() => getUploadSpeed(host), [host])

  const remainingStorage = useMemo(() => getRemainingStorage(host), [host])

  return (
    <EntityListItemLayout {...entity}>
      <div className="flex flex-col items-center gap-1 w-full">
        <div className="flex gap-2 items-center w-full">
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
          <Text color="subtle" className="hidden lg:flex">
            {formatDistance(new Date(host.first_seen_timestamp), new Date(), {
              addSuffix: false,
            })}{' '}
            old
          </Text>
        </div>
        <div className="flex gap-2 justify-between w-full pt-1 pb-1">
          <div className="flex gap-1 items-center">
            <Text size="10" color="subtle" ellipsis className="scale-75">
              <VmdkDisk16 />
            </Text>
            <Tooltip content="Storage cost per month">
              <Text size="10" color="contrast" ellipsis>
                {storageCost}
              </Text>
            </Tooltip>
            <Tooltip content="Remaining storage">
              <Text size="10" color="subtle" ellipsis>
                {remainingStorage}
              </Text>
            </Tooltip>
          </div>
          <div className="hidden lg:flex gap-1 items-center">
            <Text size="10" color="subtle" ellipsis className="scale-75">
              <CloudDownload16 />
            </Text>
            <Tooltip content="Download cost">
              <Text size="10" color="contrast" ellipsis>
                {downloadCost}
              </Text>
            </Tooltip>
            <Tooltip content="Download speed">
              <Text size="10" color="subtle" ellipsis>
                {downloadSpeed || '-'}
              </Text>
            </Tooltip>
          </div>
          <div className="hidden lg:flex gap-1 items-center">
            <Text size="10" color="subtle" ellipsis className="scale-75">
              <CloudUpload16 />
            </Text>
            <Tooltip content="Upload cost">
              <Text size="10" color="contrast" ellipsis>
                {uploadCost}
              </Text>
            </Tooltip>
            <Tooltip content="Upload speed">
              <Text size="10" color="subtle" ellipsis>
                {uploadSpeed || '-'}
              </Text>
            </Tooltip>
          </div>
        </div>
      </div>
    </EntityListItemLayout>
  )
}
