/**
 * Shard utilities for generating deterministic shard icons based on host keys.
 * Each host gets a deterministic, consistent shard pattern based on their public key.
 */

export interface ShardBlock {
  x: number
  y: number
  color: { r: number; g: number; b: number; name: string }
}

export interface Shard {
  blocks: ShardBlock[]
}

type Color = { r: number; g: number; b: number; name: string }
type Position = { x: number; y: number }

/**
 * Bright colors used for the shard blocks themselves.
 * These create the distinctive colorful patterns.
 */
export function getColorPalette(): Color[] {
  return [
    { r: 229, g: 10, b: 174, name: 'punch' }, // #E50AAE
    { r: 255, g: 121, b: 25, name: 'zest' }, // #FF7919
    { r: 195, g: 229, b: 0, name: 'highlighter' }, // #C3E500
    { r: 54, g: 217, b: 85, name: 'slime' }, // #36D955
    { r: 118, g: 230, b: 235, name: 'powder' }, // #76E6EB
  ]
}

/**
 * Dark olive colors used for background tiles.
 * These create subtle variation in the background.
 */
export function getOliveColorPalette(): Color[] {
  return [
    { r: 25, g: 33, b: 8, name: 'olive-3' }, // #192108
    { r: 19, g: 26, b: 6, name: 'olive-4' }, // #131A06
    { r: 13, g: 17, b: 4, name: 'olive-5' }, // #0D1104
    { r: 10, g: 13, b: 3, name: 'olive-6' }, // #0A0D03
    { r: 8, g: 10, b: 2, name: 'olive-7' }, // #080A02
    { r: 6, g: 8, b: 2, name: 'olive-8' }, // #060802
    { r: 4, g: 5, b: 1, name: 'olive-9' }, // #040501
  ]
}

/**
 * Converts a 3x3 grid pattern (where 1 = block, 0 = empty) into a list of block positions.
 * This is how we define each shard shape.
 */
function gridToBlockList(
  grid: [[1 | 0, 1 | 0, 1 | 0], [1 | 0, 1 | 0, 1 | 0], [1 | 0, 1 | 0, 1 | 0]],
): Position[] {
  const blocks: Position[] = []
  for (let y = 0; y < 3; y++) {
    for (let x = 0; x < 3; x++) {
      if (grid[y]![x] === 1) {
        blocks.push({ x, y })
      }
    }
  }
  return blocks
}

/**
 * All possible shard shapes. Each shape is a 3x3 grid pattern.
 * We have 33 different shapes to choose from.
 */
const shardShapes = [
  {
    blocks: gridToBlockList([
      [0, 0, 0],
      [1, 1, 0],
      [0, 0, 0],
    ]),
  },
  {
    blocks: gridToBlockList([
      [0, 1, 0],
      [0, 1, 0],
      [0, 0, 0],
    ]),
  },
  {
    blocks: gridToBlockList([
      [0, 0, 0],
      [1, 1, 1],
      [0, 0, 0],
    ]),
  },
  {
    blocks: gridToBlockList([
      [0, 1, 0],
      [0, 1, 0],
      [0, 1, 0],
    ]),
  },
  {
    blocks: gridToBlockList([
      [1, 1, 0],
      [1, 1, 0],
      [0, 0, 0],
    ]),
  },
  {
    blocks: gridToBlockList([
      [0, 1, 0],
      [1, 1, 1],
      [0, 0, 0],
    ]),
  },
  {
    blocks: gridToBlockList([
      [0, 0, 0],
      [1, 1, 1],
      [0, 1, 0],
    ]),
  },
  {
    blocks: gridToBlockList([
      [0, 0, 0],
      [0, 1, 1],
      [0, 1, 0],
    ]),
  },
  {
    blocks: gridToBlockList([
      [0, 0, 0],
      [1, 1, 0],
      [0, 1, 0],
    ]),
  },
  {
    blocks: gridToBlockList([
      [1, 1, 0],
      [0, 1, 0],
      [0, 1, 0],
    ]),
  },
  {
    blocks: gridToBlockList([
      [0, 0, 0],
      [1, 1, 1],
      [1, 0, 0],
    ]),
  },
  {
    blocks: gridToBlockList([
      [0, 1, 0],
      [0, 1, 0],
      [0, 1, 1],
    ]),
  },
  {
    blocks: gridToBlockList([
      [0, 1, 0],
      [1, 1, 0],
      [1, 0, 0],
    ]),
  },
  {
    blocks: gridToBlockList([
      [1, 0, 0],
      [1, 1, 0],
      [0, 1, 0],
    ]),
  },
  {
    blocks: gridToBlockList([
      [0, 1, 1],
      [1, 1, 0],
      [0, 0, 0],
    ]),
  },
  {
    blocks: gridToBlockList([
      [1, 1, 0],
      [0, 1, 1],
      [0, 0, 0],
    ]),
  },
  {
    blocks: gridToBlockList([
      [0, 1, 0],
      [1, 1, 1],
      [0, 1, 0],
    ]),
  },
  {
    blocks: gridToBlockList([
      [0, 1, 0],
      [1, 1, 1],
      [1, 0, 1],
    ]),
  },
  {
    blocks: gridToBlockList([
      [0, 1, 1],
      [0, 0, 1],
      [0, 1, 1],
    ]),
  },
  {
    blocks: gridToBlockList([
      [1, 1, 0],
      [0, 0, 0],
      [0, 1, 1],
    ]),
  },
  {
    blocks: gridToBlockList([
      [1, 1, 1],
      [1, 1, 0],
      [1, 0, 0],
    ]),
  },
  {
    blocks: gridToBlockList([
      [0, 0, 1],
      [0, 1, 1],
      [1, 1, 1],
    ]),
  },
  {
    blocks: gridToBlockList([
      [1, 1, 1],
      [1, 0, 1],
      [1, 1, 1],
    ]),
  },
  {
    blocks: gridToBlockList([
      [1, 0, 1],
      [1, 0, 1],
      [0, 0, 0],
    ]),
  },
  {
    blocks: gridToBlockList([
      [1, 1, 0],
      [1, 0, 1],
      [0, 1, 1],
    ]),
  },
  {
    blocks: gridToBlockList([
      [0, 1, 1],
      [1, 0, 1],
      [1, 0, 0],
    ]),
  },
  {
    blocks: gridToBlockList([
      [0, 1, 1],
      [1, 1, 1],
      [1, 1, 0],
    ]),
  },
  {
    blocks: gridToBlockList([
      [0, 1, 1],
      [1, 0, 0],
      [1, 0, 0],
    ]),
  },
  {
    blocks: gridToBlockList([
      [0, 0, 1],
      [0, 0, 1],
      [1, 1, 0],
    ]),
  },
  {
    blocks: gridToBlockList([
      [1, 1, 0],
      [0, 1, 1],
      [0, 1, 0],
    ]),
  },
  {
    blocks: gridToBlockList([
      [1, 0, 0],
      [1, 1, 1],
      [0, 1, 0],
    ]),
  },
]

// Initialize shard shapes with placeholder colors (will be assigned later).
const allShardShapes = shardShapes.map((shape) => ({
  ...shape,
  blocks: shape.blocks.map((block) => ({
    ...block,
    color: { r: 255, g: 0, b: 0, name: '' },
  })),
}))

/**
 * Converts a string (like a host key) into a deterministic number.
 * Same input always produces the same output.
 */
function hashString(str: string): number {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i)
    hash = (hash << 5) - hash + char
    hash |= 0 // Keep it as a 32-bit integer.
  }
  return Math.abs(hash)
}

/**
 * Creates a deep copy of a shard so we don't modify the original.
 */
function cloneShard(shard: Shard): Shard {
  return {
    blocks: shard.blocks.map((block) => ({ ...block })),
  }
}

/**
 * Checks if two positions are adjacent (touching horizontally, vertically, or diagonally).
 */
function areAdjacent(pos1: Position, pos2: Position): boolean {
  const dx = Math.abs(pos1.x - pos2.x)
  const dy = Math.abs(pos1.y - pos2.y)
  return dx <= 1 && dy <= 1
}

/**
 * Builds a map showing which positions are adjacent to each other.
 * This helps us ensure no two adjacent tiles get the same color.
 */
function buildAdjacencyMap(positions: Position[]): Map<number, number[]> {
  const adjacencyMap = new Map<number, number[]>()
  for (let i = 0; i < positions.length; i++) {
    adjacencyMap.set(i, [])
    for (let j = 0; j < positions.length; j++) {
      if (i !== j && areAdjacent(positions[i]!, positions[j]!)) {
        adjacencyMap.get(i)!.push(j)
      }
    }
  }
  return adjacencyMap
}

/**
 * Finds which color index a given color object has in the palette.
 * Returns -1 if not found.
 */
function findColorIndex(color: Color, palette: Color[]): number {
  return palette.findIndex(
    (c) => c.r === color.r && c.g === color.g && c.b === color.b,
  )
}

/**
 * Assigns colors to a set of positions, ensuring no two adjacent positions get the same color.
 * Uses a greedy algorithm that tries to use all colors evenly.
 *
 * @param positions - The positions to assign colors to
 * @param palette - The available colors to choose from
 * @param seed - A number to make the assignment deterministic (same seed = same result)
 * @returns An array of colors, one for each position
 */
function assignColorsToPositions(
  positions: Position[],
  palette: Color[],
  seed: number,
): Color[] {
  const adjacencyMap = buildAdjacencyMap(positions)
  const assignedColors: Color[] = new Array(positions.length)
  const colorUsageCount = new Array(palette.length).fill(0)
  const initialColorIndex = seed % palette.length

  // Process each position in order.
  for (let i = 0; i < positions.length; i++) {
    // Find which colors are already used by adjacent positions.
    const usedColorIndices = new Set<number>()
    for (const adjIndex of adjacencyMap.get(i) || []) {
      if (assignedColors[adjIndex]) {
        const colorIndex = findColorIndex(assignedColors[adjIndex]!, palette)
        if (colorIndex !== -1) {
          usedColorIndices.add(colorIndex)
        }
      }
    }

    // Find the best color: one that's not used by neighbors, and is used the least overall.
    let bestColorIndex = -1
    let leastUsedCount = Number.POSITIVE_INFINITY

    // Try colors starting from the seed position.
    for (let j = 0; j < palette.length; j++) {
      const colorIndex = (initialColorIndex + j) % palette.length
      const isAvailable = !usedColorIndices.has(colorIndex)
      const usageCount = colorUsageCount[colorIndex]

      if (isAvailable && usageCount < leastUsedCount) {
        leastUsedCount = usageCount
        bestColorIndex = colorIndex
      }
    }

    // If all colors are used by neighbors, just pick the least used one.
    if (bestColorIndex === -1) {
      for (let j = 0; j < palette.length; j++) {
        if (colorUsageCount[j] < leastUsedCount) {
          leastUsedCount = colorUsageCount[j]
          bestColorIndex = j
        }
      }
    }

    // Assign the color and track its usage.
    assignedColors[i] = palette[bestColorIndex]!
    colorUsageCount[bestColorIndex]++
  }

  return assignedColors
}

/**
 * Assigns colors to the blocks in a shard, making sure no two adjacent blocks have the same color.
 * Modifies the shard in place.
 */
export function assignColorsToShardBlocks(shard: Shard, seed?: number): void {
  const colors = getColorPalette()
  const positions = shard.blocks.map((block) => ({ x: block.x, y: block.y }))
  const assignedColors = assignColorsToPositions(
    positions,
    colors,
    seed ?? Math.floor(Math.random() * 1000),
  )

  // Apply the assigned colors to the shard blocks.
  for (let i = 0; i < shard.blocks.length; i++) {
    shard.blocks[i]!.color = assignedColors[i]!
  }
}

/**
 * Gets a deterministic shard for a given public key.
 * Same public key always returns the same shard shape and colors.
 */
export function getShardForPublicKey(publicKey: string): Shard {
  const hash = hashString(publicKey)
  const shapeIndex = hash % allShardShapes.length
  const base = allShardShapes[shapeIndex]!
  const shard = cloneShard(base)
  assignColorsToShardBlocks(shard, hash)
  return shard
}

/**
 * Type for a single cell in the public key avatar grid.
 */
export type AvatarGridCell = {
  x: number
  y: number
  color: Color
  isShard: boolean
}

/**
 * Type for the complete 5x5 public key avatar grid.
 */
export type AvatarGrid = AvatarGridCell[][]

/**
 * Generates a complete 5x5 grid for a public key avatar.
 * The grid contains:
 * - A 3x3 shard pattern centered in the middle (colored blocks)
 * - Background tiles filled with olive colors (ensuring no adjacent tiles match)
 *
 * @param publicKey - The public key, used to deterministically generate the pattern
 * @returns A 5x5 grid where each cell knows its color and whether it's part of the shard
 */
export function generatePublicKeyAvatarGrid(publicKey: string): AvatarGrid {
  const shard = getShardForPublicKey(publicKey)
  const oliveColors = getOliveColorPalette()
  const hash = hashString(publicKey)

  // Map shard blocks to their positions in the 5x5 grid (centered, so offset by 1,1).
  const shardBlockMap = new Map<string, Color>()
  for (const block of shard.blocks) {
    const gridX = block.x + 1
    const gridY = block.y + 1
    shardBlockMap.set(`${gridX},${gridY}`, block.color)
  }

  // Find all positions that aren't part of the shard (these need background colors).
  const backgroundPositions: Position[] = []
  for (let y = 0; y < 5; y++) {
    for (let x = 0; x < 5; x++) {
      if (!shardBlockMap.has(`${x},${y}`)) {
        backgroundPositions.push({ x, y })
      }
    }
  }

  // Assign olive colors to background tiles, ensuring no adjacent tiles match.
  const backgroundColors = assignColorsToPositions(
    backgroundPositions,
    oliveColors,
    hash,
  )

  // Build a map from position string to color for quick lookup.
  const backgroundColorMap = new Map<string, Color>()
  for (let i = 0; i < backgroundPositions.length; i++) {
    const pos = backgroundPositions[i]!
    backgroundColorMap.set(`${pos.x},${pos.y}`, backgroundColors[i]!)
  }

  // Build the final 5x5 grid.
  const grid: AvatarGrid = []

  for (let y = 0; y < 5; y++) {
    const row: AvatarGridCell[] = []

    for (let x = 0; x < 5; x++) {
      const key = `${x},${y}`
      const shardColor = shardBlockMap.get(key)

      if (shardColor) {
        // This position is part of the shard.
        row.push({ x, y, color: shardColor, isShard: true })
      } else {
        // This position is a background tile.
        const oliveColor = backgroundColorMap.get(key)!
        row.push({ x, y, color: oliveColor, isShard: false })
      }
    }

    grid.push(row)
  }

  return grid
}
