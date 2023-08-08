import {
  LoadingDots,
  ScrollArea,
  Separator,
  Text,
} from '@siafoundation/design-system'
import { useObject } from '@siafoundation/react-renterd'
import { cx } from 'class-variance-authority'
import { sortBy } from 'lodash'
import { computeSlabContractSetShards } from '../../../../contexts/files/health'
import { ObjectData } from '../../../../contexts/files/types'
import { useHealthLabel } from '../../../../hooks/useHealthLabel'

export function FilesHealthColumnContents({
  path,
  isUploading,
  isDirectory,
  health: _health,
  size,
}: ObjectData) {
  const obj = useObject({
    disabled: isUploading || isDirectory,
    params: {
      key: path.slice(1),
    },
    config: {
      swr: {
        dedupingInterval: 5000,
      },
    },
  })

  const { displayHealth, label } = useHealthLabel({
    health: _health,
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
    obj.data.object.slabs.map((s) => ({
      ...s.slab,
      contractSetShards: computeSlabContractSetShards({
        totalShards: s.slab.shards.length,
        minShards: s.slab.minShards,
        health: s.slab.health,
      }),
    })),
    'contractSetShards'
  )

  return (
    <Layout
      className={slabs.length > 15 ? 'h-[300px]' : ''}
      displayHealth={displayHealth}
      label={label}
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
            {slab.contractSetShards}/{slab.shards.length}
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
}: {
  className?: string
  children: React.ReactNode
  displayHealth: number
  label: string
}) {
  return (
    <div
      className={cx('z-10 flex flex-col pb-1 -mx-1 overflow-hidden', className)}
    >
      <div className="flex justify-between gap-2 pt-0.5 pb-px px-2">
        <Text size="12">{label}</Text>
        <Text size="12">{(displayHealth * 100).toFixed(0)}%</Text>
      </div>
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
