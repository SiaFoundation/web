'use client'

import React from 'react'
import { ProviderData } from './ProviderData'

export function ProviderSpeed({
  data: { provider, speedAverage, speedUpload, speedDownload },
  maxSpeedTotal,
}: {
  data: ProviderData
  maxSpeedTotal: number
}) {
  if (
    speedAverage === undefined ||
    speedUpload === undefined ||
    speedDownload === undefined
  ) {
    return null
  }
  return (
    <div key={provider.provider} className="space-y-2">
      <div className="flex justify-between items-baseline">
        <span className="text-md font-medium">
          {speedAverage.toFixed(2)} mbps
        </span>
      </div>
      <div className="h-2 w-full bg-gray-100 dark:bg-gray-900 rounded-full overflow-hidden flex">
        {speedUpload > 0 && (
          <div
            className="h-full transition-all duration-500"
            style={{
              width: `${(speedUpload / maxSpeedTotal) * 100}%`,
              backgroundColor: provider.color,
              backgroundImage:
                'repeating-linear-gradient(45deg, transparent, transparent 5px, rgba(255,255,255,0.3) 5px, rgba(255,255,255,0.3) 10px)',
            }}
          />
        )}
        {speedDownload > 0 && (
          <div
            className="h-full transition-all duration-500"
            style={{
              width: `${(speedDownload / maxSpeedTotal) * 100}%`,
              backgroundColor: provider.color,
              backgroundImage:
                'repeating-linear-gradient(-45deg, transparent, transparent 5px, rgba(255,255,255,0.3) 5px, rgba(255,255,255,0.3) 10px)',
            }}
          />
        )}
      </div>

      <div className="flex justify-between text-sm text-gray-500">
        <span>Down: {speedDownload.toFixed(0)} mbps</span>
        <span>Up: {speedUpload.toFixed(0)} mpbs</span>
      </div>
    </div>
  )
}
