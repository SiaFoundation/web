'use client'

import { useMemo } from 'react'
import { cva, cx } from 'class-variance-authority'
import { generatePublicKeyAvatarGrid, type AvatarGrid } from '../lib/shard'

const styles = cva(
  [
    'items-center justify-center align-middle flex flex-shrink-0 relative',
    'overflow-hidden select-none outline-none',
    'border-gray-500 dark:border-gray-800 text-gray-1100 dark:text-white',
    'rounded',
  ],
  {
    variants: {
      interactive: {
        true: 'cursor-pointer',
      },
    },
  },
)

/**
 * PublicKeyAvatar component that renders a deterministic shard icon.
 */
export function PublicKeyAvatar({
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
  const grid = useMemo(
    () => generatePublicKeyAvatarGrid(publicKey),
    [publicKey],
  )
  return (
    <GridAvatar
      grid={grid}
      size={size}
      interactive={interactive}
      className={className}
    />
  )
}

/**
 * GridAvatar component that renders a grid of cells.
 */
export function GridAvatar({
  grid,
  size = 48,
  interactive,
  className,
}: {
  grid: AvatarGrid
  size?: number
  interactive?: boolean
  className?: string
}) {
  const flatGrid = useMemo(() => grid.flat(), [grid])
  return (
    <div className={cx('relative h-fit w-fit', className)}>
      <div
        className={styles({
          interactive,
        })}
        style={{
          width: size,
          height: size,
        }}
      >
        <div className="grid grid-cols-5 w-full h-full">
          {flatGrid.map((cell) => {
            const bgColor = `rgb(${cell.color.r}, ${cell.color.g}, ${cell.color.b})`
            return (
              <div
                key={`${cell.x}-${cell.y}`}
                className="w-full h-full"
                style={{
                  backgroundColor: bgColor,
                }}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}
