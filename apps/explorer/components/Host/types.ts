'use client'

import {
  SiaCentralHost,
  SiaCentralHostSettings,
} from '@siafoundation/sia-central'

export type SiaCentralHostScanned = SiaCentralHost & {
  settings: SiaCentralHostSettings
  // price_table: SiaCentralHostPriceTable
  // benchmark: SiaCentralHostBenchmark
}
