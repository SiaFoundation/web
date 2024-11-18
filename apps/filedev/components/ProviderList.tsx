'use client'

import React, { useMemo } from 'react'
import { Provider, ProviderCompleteData } from '../lib/dataset'
import random from 'lodash/random'
import { ProviderRow } from './ProviderRow'

type Props = {
  dataset: Provider[]
  expectedStorage: number
  expectedUpload: number
  expectedDownload: number
  sortBy: 'cost' | 'speed'
  filters: string[]
}

export function ProviderList({
  dataset,
  expectedStorage,
  expectedUpload,
  expectedDownload,
  sortBy,
  filters,
}: Props) {
  const ranking = useMemo(() => {
    return dataset
      .filter((provider) => {
        if (filters.length === 0) {
          return true
        }
        for (const filter of filters) {
          if (!provider.categories.includes(filter)) {
            return false
          }
        }
        return true
      })
      .map((provider: ProviderCompleteData) => {
        const { storage_cost_tb, ingress_cost_tb, egress_cost_tb } = provider
        const costStorage = storage_cost_tb * expectedStorage
        const costUpload = ingress_cost_tb
          ? ingress_cost_tb * expectedUpload
          : undefined
        const costDownload = egress_cost_tb
          ? egress_cost_tb * expectedDownload
          : undefined
        const costTotal = costStorage + (costUpload || 0) + (costDownload || 0)
        const speedUpload = random(100, 150)
        const speedDownload = random(200, 350)
        const speedAverage = (speedUpload + speedDownload) / 2
        const speedTotal = speedUpload + speedDownload
        return {
          id: provider.provider,
          provider,
          speedUpload,
          speedDownload,
          speedAverage,
          speedTotal,
          costStorage,
          costUpload,
          costDownload,
          costTotal,
        }
      })
      .sort((a, b) => {
        if (sortBy === 'cost') {
          return a.costTotal - b.costTotal
        }
        return a.speedAverage - b.speedAverage
      })
  }, [
    dataset,
    filters,
    expectedStorage,
    expectedUpload,
    expectedDownload,
    sortBy,
  ])

  const maxSpeedTotal = Math.max(...ranking.map((c) => c.speedTotal))
  const maxCostTotal = Math.max(...ranking.map((c) => c.costTotal))

  console.log(ranking)

  return (
    <div className="space-y-6">
      {ranking.map((data) => (
        <ProviderRow
          key={data.id}
          data={data}
          maxSpeedTotal={maxSpeedTotal}
          maxCostTotal={maxCostTotal}
        />
      ))}
    </div>
  )
}
