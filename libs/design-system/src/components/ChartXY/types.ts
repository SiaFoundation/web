export type ChartConfig<Key extends string, Cat extends string> = {
  enabledGraph?: Key[]
  enabledTip?: Key[]
  categories?: Cat[]
  data: Record<
    Key,
    {
      category?: Cat
      label?: string
      color?: string
      pattern?: boolean
      fromOpacity?: number
      toOpacity?: number
    }
  >
  format: (v: number) => string
  formatTimestamp?: (v: number) => string
  disableAnimations?: boolean
}

export type ChartPoint<T extends string> = Record<T | 'timestamp', number>

export type ChartData<T extends string> = ChartPoint<T>[]

export type ChartType = 'barstack' | 'bargroup' | 'line' | 'area' | 'areastack'
export type CurveType = 'linear' | 'cardinal' | 'step'
export type StackOffset =
  | 'none'
  | 'wiggle'
  | 'expand'
  | 'diverging'
  | 'silhouette'

type KeyStats = {
  average: number
  change: number | undefined
  diff: number
  total: number
  latest: number
}

export type ChartStats = {
  [key: string]: KeyStats
}

export type Chart<Key extends string, Cat extends string> = {
  data: ChartData<Key>
  stats: ChartStats
  config: ChartConfig<Key, Cat>
  chartType: ChartType
  isLoading: boolean
}
