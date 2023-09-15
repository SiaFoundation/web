import {
  CloudDownload16,
  CloudUpload16,
  Text,
  Tooltip,
  VmdkDisk16,
} from '@siafoundation/design-system'
import {
  SiaCentralExchangeRates,
  SiaCentralHost,
} from '@siafoundation/sia-central'
import { useMemo } from 'react'
import {
  getDownloadCost,
  getDownloadSpeed,
  getRemainingOverTotalStorage,
  getRemainingStorage,
  getStorageCost,
  getUploadCost,
  getUploadSpeed,
} from '../../lib/host'

type Props = {
  host: SiaCentralHost
  rates: SiaCentralExchangeRates
}

export function HostPricing({ host, rates }: Props) {
  const storageCost = useMemo(
    () => getStorageCost({ price: host.settings.storage_price, rates }),
    [rates, host]
  )

  const downloadCost = useMemo(
    () => getDownloadCost({ price: host.settings.download_price, rates }),
    [rates, host]
  )

  const uploadCost = useMemo(
    () => getUploadCost({ price: host.settings.upload_price, rates }),
    [rates, host]
  )

  const downloadSpeed = useMemo(() => getDownloadSpeed(host), [host])

  const uploadSpeed = useMemo(() => getUploadSpeed(host), [host])

  const remainingOverTotalStorage = useMemo(
    () => getRemainingOverTotalStorage(host),
    [host]
  )

  const remainingStorage = useMemo(() => getRemainingStorage(host), [host])

  return (
    <div className="flex flex-col">
      <div className="grid grid-cols-3 gap-4">
        <Tooltip content={`Storage cost ${storageCost}/month`}>
          <div className="flex gap-2 items-center">
            <Text color="verySubtle" className="hidden sm:block">
              <VmdkDisk16 />
            </Text>
            <Text weight="semibold" font="mono" size="20" noWrap>
              {storageCost}
            </Text>
          </div>
        </Tooltip>
        <Tooltip content={`Download cost ${downloadCost}/month`}>
          <div className="flex gap-2 items-center">
            <Text color="verySubtle" className="hidden sm:block">
              <CloudDownload16 />
            </Text>
            <Text weight="semibold" font="mono" size="20" noWrap>
              {downloadCost}
            </Text>
          </div>
        </Tooltip>
        <Tooltip content={`Upload cost ${uploadCost}/month`}>
          <div className="flex gap-2 items-center">
            <Text color="verySubtle" className="hidden sm:block">
              <CloudUpload16 />
            </Text>
            <Text weight="semibold" font="mono" size="20" noWrap>
              {uploadCost}
            </Text>
          </div>
        </Tooltip>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <Tooltip content={remainingOverTotalStorage}>
          <div className="flex justify-end">
            <Text color="subtle">{remainingStorage}</Text>
          </div>
        </Tooltip>
        <Tooltip content={`Download speed benchmarked at ${downloadSpeed}`}>
          <div className="flex justify-end">
            <Text color="subtle">{downloadSpeed}</Text>
          </div>
        </Tooltip>
        <Tooltip content={`Upload speed benchmarked at ${uploadSpeed}`}>
          <div className="flex justify-end">
            <Text color="subtle">{uploadSpeed}</Text>
          </div>
        </Tooltip>
      </div>
    </div>
  )
}
