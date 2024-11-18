'use client'

import React from 'react'
import { ProviderSpeed } from './ProviderSpeed'
import { ProviderCost } from './ProviderCost'
import { ProviderData } from './ProviderData'

type Props = {
  data: ProviderData
  maxSpeedTotal: number
  maxCostTotal: number
}

export function ProviderRow({ data, maxSpeedTotal, maxCostTotal }: Props) {
  return (
    <div className="flex flex-col gap-1" key={data.id}>
      <div className="flex justify-between items-baseline">
        <span className="text-lg font-semibold">{data.id}</span>
      </div>
      <div className="flex gap-3" key={data.id}>
        <div className="flex-1">
          <ProviderCost data={data} maxCostTotal={maxCostTotal} />
        </div>
        <div className="flex-1">
          <ProviderSpeed data={data} maxSpeedTotal={maxSpeedTotal} />
        </div>
      </div>
    </div>
  )
}
