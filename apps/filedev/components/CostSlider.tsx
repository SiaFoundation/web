'use client'

import React, { useMemo } from 'react'
import { LucideIcon } from 'lucide-react'
import { NumberField, Text } from '@siafoundation/design-system'
import BigNumber from 'bignumber.js'

interface CostSliderProps {
  icon: LucideIcon
  label: string
  value?: number
  onChange: (value?: number) => void
  onFocus?: () => void
}

const CostSlider: React.FC<CostSliderProps> = ({
  icon: Icon,
  label,
  value,
  onChange,
  onFocus,
}) => {
  const val = useMemo(() => new BigNumber(value || NaN), [value])
  return (
    <div className="space-y-2">
      <label className="block">
        <Text className="flex gap-1">
          <Icon className="w-5 h-5" />
          {label}
        </Text>
        <div className="flex gap-4 items-center">
          <input
            type="range"
            min="0"
            max="50"
            value={Math.min(Math.max(value || 0, 0), 50)}
            onChange={(e) => onChange(Number(e.target.value))}
            onFocus={onFocus}
            className="flex-1 h-2 bg-gray-200 dark:bg-gray-900 rounded-lg appearance-none cursor-pointer accent-emerald-500"
          />
          <NumberField
            min="0"
            step="any"
            value={val}
            units="TB"
            onChange={(val) => onChange(val?.toNumber())}
            onFocus={onFocus}
            className="w-24 px-2 py-1 text-sm border rounded-md"
          />
        </div>
      </label>
    </div>
  )
}

export default CostSlider
