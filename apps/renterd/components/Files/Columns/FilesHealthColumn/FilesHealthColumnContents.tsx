import {
  LoadingDots,
  ScrollArea,
  Separator,
  Text,
} from '@siafoundation/design-system'
import { useObject } from '@siafoundation/renterd-react'
import { cx } from 'class-variance-authority'
import { sortBy } from '@technically/lodash'
import { computeSlabContractSetShards } from '../../../../lib/health'
import { ObjectData } from '../../../../contexts/filesManager/types'
import { useHealthLabel } from '../../../../hooks/useHealthLabel'
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

  const { displayHealth, label } = useHealthLabel({
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

  if (!obj.data?.object) {
    return (
      <Layout displayHealth={displayHealth} label={label}>
        <Text size="12">Error fetching slab metadata.</Text>
      </Layout>
    )
  }

  const slabs = sortBy(
    obj.data.object.slabs?.map((s) => ({
      ...s.slab,
      key: `${s.offset}${s.length}${s.slab.key}`,
      isPartialSlab: !!s.slab.shards,
      contractSetShards: s.slab.shards?.length
        ? computeSlabContractSetShards({
            totalShards: s.slab.shards.length,
            minShards: s.slab.minShards,
            health: s.slab.health,
          })
        : 0,
    })) || [],
    'contractSetShards'
  )

  return (
    <Layout
      className={slabs.length > 15 ? 'h-[300px]' : ''}
      displayHealth={displayHealth}
      label={label}
      minShards={slabs.find((s) => s.minShards)?.minShards}
      totalShards={slabs.find((s) => s.shards)?.shards.length}
    >
      {slabs.map((slab) => (
        <div key={slab.key} className="flex justify-between gap-2">
          <Text
            size="12"
            color="subtle"
            className="flex items-center"
            font="mono"
          >
            Slab {slab.key.replace('key:', '').slice(0, 4)}:
          </Text>
          <Text size="12" className="flex items-center">
            {slab.isPartialSlab
              ? `${slab.contractSetShards}/${slab.shards.length}`
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
