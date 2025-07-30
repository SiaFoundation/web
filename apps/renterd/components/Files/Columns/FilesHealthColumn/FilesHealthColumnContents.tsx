import {
  LoadingDots,
  ScrollArea,
  Separator,
  Text,
  truncate,
} from '@siafoundation/design-system'
import { useObject } from '@siafoundation/renterd-react'
import { cx } from 'class-variance-authority'
import { sortBy } from '@technically/lodash'
import { computeSlabContractSetShards } from '../../../../lib/health'
import { ObjectData } from '../../../../contexts/filesManager/types'
import { getFileHealth } from '../../../../lib/fileHealth'
import { bucketAndKeyParamsFromPath } from '../../../../lib/paths'

export function FilesHealthColumnContents({
  path,
  isUploading,
  type,
  health,
  size,
}: ObjectData) {
  const isDirectory = type === 'directory'
  const obj = useObject({
    disabled: isUploading || isDirectory,
    params: bucketAndKeyParamsFromPath(path),
    config: {
      swr: {
        dedupingInterval: 5000,
      },
    },
  })

  const { displayHealth, label } = getFileHealth({
    health,
    size,
    isDirectory,
  })

  if (obj.isValidating) {
    return (
      <Layout displayHealth={displayHealth} label={label}>
        <div className="flex justify-center my-2">
          <LoadingDots />
        </div>
      </Layout>
    )
  }

  if (!obj.data) {
    return (
      <Layout displayHealth={displayHealth} label={label}>
        <Text size="12">Error fetching slab metadata.</Text>
      </Layout>
    )
  }

  const slabs = sortBy(
    obj.data.slabs?.map((s) => ({
      ...s.slab,
      // id is for use as a unique React key.
      // slab key is not necessarily unique. e.g. an object uploaded with tiny
      // multipart uploads might reference the same slab over and over but at
      // different offsets and lengths. So we should not assume that they are
      // always unique.
      id: `${s.offset}${s.length}${s.slab.encryptionKey}`,
      isPartialSlab: !!s.slab.shards,
      contractSetShards: s.slab.shards?.length
        ? computeSlabContractSetShards({
            totalShards: s.slab.shards.length,
            minShards: s.slab.minShards,
            health: s.slab.health,
          })
        : 0,
    })) || [],
    'contractSetShards',
  )

  return (
    <Layout
      className={slabs.length > 15 ? 'h-[300px]' : ''}
      displayHealth={displayHealth}
      label={label}
      minShards={slabs.find((s) => s.minShards)?.minShards}
      totalShards={slabs.find((s) => s.shards)?.shards?.length}
    >
      {slabs.map((slab) => (
        <div key={slab.id} className="flex justify-between gap-2">
          <Text
            size="12"
            color="subtle"
            className="flex items-center"
            font="mono"
          >
            Slab {truncate(slab.encryptionKey, 4, false)}:
          </Text>
          <Text size="12" className="flex items-center">
            {slab.isPartialSlab
              ? `${slab.contractSetShards}/${slab.shards?.length}`
              : 'partial slab'}
          </Text>
        </div>
      ))}
    </Layout>
  )
}

function Layout({
  className,
  displayHealth,
  label,
  children,
  minShards,
  totalShards,
}: {
  className?: string
  children: React.ReactNode
  displayHealth: number
  label: string
  minShards?: number
  totalShards?: number
}) {
  return (
    <div
      className={cx('z-10 flex flex-col pb-1 -mx-1 overflow-hidden', className)}
    >
      <div className="flex justify-between gap-2 pt-0.5 pb-px px-2">
        <Text size="12">{label}</Text>
        <Text size="12">{(displayHealth * 100).toFixed(0)}%</Text>
      </div>
      {minShards && totalShards ? (
        <div className="flex justify-between gap-2 pt-0.5 pb-px px-2">
          <Text size="12" color="subtle">
            redundancy
          </Text>
          <Text size="12" color="subtle">
            {minShards} of {totalShards}
          </Text>
        </div>
      ) : null}
      <div className="px-2">
        <Separator className="w-full my-1" />
      </div>
      <div className="flex-1 overflow-hidden">
        <ScrollArea>
          <div className="px-2">{children}</div>
        </ScrollArea>
      </div>
    </div>
  )
}
