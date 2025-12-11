'use client'

import { useMemo, useRef } from 'react'
import { cva, cx } from 'class-variance-authority'
import * as htmlToImage from 'html-to-image'
import { generatePublicKeyAvatarGrid, type AvatarGrid } from '../lib/shard'
import {
  ContextMenu,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuLeftSlot,
} from './ContextMenu'
import { Download16 } from '@siafoundation/react-icons'

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
      filename={publicKey}
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
  filename: customFilename,
}: {
  grid: AvatarGrid
  size?: number
  interactive?: boolean
  className?: string
  filename?: string
}) {
  const flatGrid = useMemo(() => grid.flat(), [grid])
  const avatarRef = useRef<HTMLDivElement>(null)
  const filename = customFilename || 'avatar'

  const handleDownloadPng = async () => {
    if (!avatarRef.current) {
      throw Error('HTML node required')
    }
    const dataUrl = await htmlToImage.toPng(avatarRef.current, { quality: 1 })
    const link = document.createElement('a')
    link.download = `${filename}.png`
    link.href = dataUrl
    link.click()
  }

  const handleDownloadSvg = () => {
    const cellSize = size / 5
    const svgCells: string[] = []

    for (let y = 0; y < 5; y++) {
      for (let x = 0; x < 5; x++) {
        const cell = grid[y]![x]!
        const bgColor = `rgb(${cell.color.r}, ${cell.color.g}, ${cell.color.b})`
        const xPos = x * cellSize
        const yPos = y * cellSize

        svgCells.push(
          `<rect x="${xPos}" y="${yPos}" width="${cellSize}" height="${cellSize}" fill="${bgColor}"/>`,
        )
      }
    }

    const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" shape-rendering="crispEdges">
${svgCells.join('\n')}
</svg>`

    const blob = new Blob([svgContent], { type: 'image/svg+xml' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.download = `${filename}.svg`
    link.href = url
    link.click()
    setTimeout(() => {
      URL.revokeObjectURL(url)
    }, 100)
  }

  const avatarContent = (
    <div ref={avatarRef} className={cx('relative h-fit w-fit', className)}>
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

  return (
    <ContextMenu
      trigger={avatarContent}
      contentProps={{
        onClick: (e) => {
          e.stopPropagation()
        },
      }}
    >
      <ContextMenuLabel>Download</ContextMenuLabel>
      <ContextMenuItem onSelect={handleDownloadPng}>
        <ContextMenuLeftSlot>
          <Download16 />
        </ContextMenuLeftSlot>
        Download as PNG
      </ContextMenuItem>
      <ContextMenuItem onSelect={handleDownloadSvg}>
        <ContextMenuLeftSlot>
          <Download16 />
        </ContextMenuLeftSlot>
        Download as SVG
      </ContextMenuItem>
    </ContextMenu>
  )
}
