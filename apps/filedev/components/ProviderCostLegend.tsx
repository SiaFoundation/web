'use client'

import React from 'react'

export function ProviderCostLegend() {
  return (
    <div className="pt-4 border-t">
      <div className="flex items-center gap-4 text-sm text-gray-500">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-gray-700" />
          <span>Storage</span>
        </div>
        <div className="flex items-center gap-2">
          <div
            className="w-3 h-3 rounded-full bg-gray-700"
            style={{
              backgroundImage:
                'repeating-linear-gradient(45deg, transparent, transparent 3px, rgba(255,255,255,0.5) 3px, rgba(255,255,255,0.5) 6px)',
            }}
          />
          <span>Upload</span>
        </div>
        <div className="flex items-center gap-2">
          <div
            className="w-3 h-3 rounded-full bg-gray-700"
            style={{
              backgroundImage:
                'repeating-linear-gradient(-45deg, transparent, transparent 3px, rgba(255,255,255,0.5) 3px, rgba(255,255,255,0.5) 6px)',
            }}
          />
          <span>Download</span>
        </div>
      </div>
    </div>
  )
}
