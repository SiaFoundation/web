'use client'

import React from 'react'
import { ProviderData } from './ProviderData'

export function ProviderCost({
  data: { provider, costTotal, costStorage, costUpload, costDownload },
  maxCostTotal,
}: {
  data: ProviderData
  maxCostTotal: number
}) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-baseline">
        <span className="text-md font-medium">${costTotal?.toFixed(2)}</span>
      </div>
      <div className="h-2 w-full bg-gray-100 dark:bg-gray-900 rounded-full overflow-hidden flex">
        {costStorage > 0 && (
          <div
            className="h-full transition-all duration-500"
            style={{
              width: `${(costStorage / maxCostTotal) * 100}%`,
              backgroundColor: provider.color,
              backgroundImage: 'none',
            }}
          />
        )}
        {costUpload !== undefined && costUpload > 0 && (
          <div
            className="h-full transition-all duration-500"
            style={{
              width: `${(costUpload / maxCostTotal) * 100}%`,
              backgroundColor: provider.color,
              backgroundImage:
                'repeating-linear-gradient(45deg, transparent, transparent 5px, rgba(255,255,255,0.3) 5px, rgba(255,255,255,0.3) 10px)',
            }}
          />
        )}
        {costDownload !== undefined && costDownload > 0 && (
          <div
            className="h-full transition-all duration-500"
            style={{
              width: `${(costDownload / maxCostTotal) * 100}%`,
              backgroundColor: provider.color,
              backgroundImage:
                'repeating-linear-gradient(-45deg, transparent, transparent 5px, rgba(255,255,255,0.3) 5px, rgba(255,255,255,0.3) 10px)',
            }}
          />
        )}
      </div>

      <div className="flex justify-between text-sm text-gray-500">
        <span>Storage: ${costStorage.toFixed(2)}</span>
        {costUpload !== undefined && (
          <span>Upload: ${costUpload.toFixed(2)}</span>
        )}
        {costDownload !== undefined && (
          <span>Download: ${costDownload.toFixed(2)}</span>
        )}
      </div>
    </div>
  )
}
