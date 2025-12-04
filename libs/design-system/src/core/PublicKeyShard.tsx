'use client'

import { useMemo } from 'react'
import { cx } from 'class-variance-authority'
import { getShardForPublicKey } from '../lib/shard'

/**
 * Shard component that renders a shard object without background grid.
 */
export function ShardComponent({
  shard,
  size = 48,
  interactive,
  className,
}: {
  shard: {
    blocks: Array<{
      x: number
      y: number
      color: { r: number; g: number; b: number }
    }>
  }
  size?: number
  interactive?: boolean
  className?: string
}) {
  // Each shard block is 1/3 of the size (since shard is 3x3).
  const blockSize = size / 3

  return (
    <div className={cx('relative h-fit w-fit', className)}>
      <div
        className={cx(
          'items-center justify-center align-middle flex flex-shrink-0 relative',
          'overflow-hidden select-none outline-none',
          'border-gray-500 dark:border-gray-800 text-gray-1100 dark:text-white',
          interactive && 'cursor-pointer',
        )}
        style={{
          width: size,
          height: size,
        }}
      >
        {shard.blocks.map((block, index) => {
          const bgColor = `rgb(${block.color.r}, ${block.color.g}, ${block.color.b})`
          return (
            <div
              key={`${block.x}-${block.y}-${index}`}
              style={{
                position: 'absolute',
                left: block.x * blockSize,
                top: block.y * blockSize,
                width: blockSize,
                height: blockSize,
                backgroundColor: bgColor,
              }}
            />
          )
        })}
      </div>
    </div>
  )
}

/**
 * PublicKeyShard component that renders a shard based on a public key.
 */
export function PublicKeyShard({
  publicKey,
  size = 48,
  interactive,
  className,
}: {
  publicKey: string
  size?: number
  interactive?: boolean
  className?: string
}) {
  const shard = useMemo(() => getShardForPublicKey(publicKey), [publicKey])

  return (
    <ShardComponent
      shard={shard}
      size={size}
      interactive={interactive}
      className={className}
    />
  )
}
