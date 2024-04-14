'use client'

import { Text } from '../core/Text'
import BigNumber from 'bignumber.js'
import { ValueSc } from './ValueSc'
import { ValueFiat } from './ValueFiat'
import { useAppSettings } from '@siafoundation/react-core'
import { useSiaCentralExchangeRates } from '@siafoundation/sia-central-react'
import { useMemo } from 'react'

type Props = {
  size?: React.ComponentProps<typeof Text>['size']
  scaleSize?: React.ComponentProps<typeof Text>['scaleSize']
  value: BigNumber // hastings
  variant?: 'change' | 'value'
  tooltip?: string
  fixed?: number
  fixedFiat?: number
  fixedTipFiat?: number
  dynamicUnits?: boolean
  hastingUnits?: boolean
  extendedSuffix?: string
  showTooltip?: boolean
  displayBoth?: boolean
  displayBothDirection?: 'row' | 'column'
}

export function ValueScFiat({
  value,
  size,
  scaleSize,
  tooltip = '',
  variant = 'change',
  fixed = 3,
  fixedFiat,
  fixedTipFiat,
  dynamicUnits = true,
  hastingUnits = true,
  extendedSuffix,
  showTooltip = true,
  displayBoth = false,
  displayBothDirection = 'column',
}: Props) {
  const {
    settings: { currencyDisplay },
  } = useAppSettings()
  const exchangeRates = useSiaCentralExchangeRates()

  const scEl = useMemo(
    () => (
      <ValueSc
        value={value}
        size={size}
        color={
          displayBoth &&
          displayBothDirection === 'row' &&
          currencyDisplay === 'bothPreferFiat'
            ? 'subtle'
            : undefined
        }
        scaleSize={scaleSize}
        tooltip={tooltip}
        variant={variant}
        fixed={fixed}
        dynamicUnits={dynamicUnits}
        hastingUnits={hastingUnits}
        extendedSuffix={extendedSuffix}
        showTooltip={showTooltip}
      />
    ),
    [
      value,
      size,
      scaleSize,
      tooltip,
      variant,
      fixed,
      dynamicUnits,
      hastingUnits,
      extendedSuffix,
      showTooltip,
      currencyDisplay,
      displayBoth,
      displayBothDirection,
    ]
  )

  const fiatEl = useMemo(
    () => (
      <ValueFiat
        sc={value}
        size={size}
        color={
          displayBoth &&
          displayBothDirection === 'row' &&
          currencyDisplay === 'bothPreferSc'
            ? 'subtle'
            : undefined
        }
        scaleSize={scaleSize}
        tooltip={tooltip}
        variant={variant}
        fixed={fixedFiat}
        fixedTip={fixedTipFiat}
        dynamicUnits={dynamicUnits}
        hastingUnits={hastingUnits}
        extendedSuffix={extendedSuffix}
        showTooltip={showTooltip}
      />
    ),
    [
      value,
      size,
      scaleSize,
      tooltip,
      variant,
      fixedFiat,
      fixedTipFiat,
      dynamicUnits,
      hastingUnits,
      extendedSuffix,
      showTooltip,
      currencyDisplay,
      displayBoth,
      displayBothDirection,
    ]
  )

  if (currencyDisplay === 'sc') {
    return scEl
  }

  if (!exchangeRates.data) {
    return scEl
  }

  if (currencyDisplay === 'fiat') {
    return fiatEl
  }

  if (currencyDisplay === 'bothPreferSc') {
    if (displayBoth) {
      return (
        <div
          className={
            displayBothDirection === 'column'
              ? 'flex flex-col items-end'
              : 'flex gap-1'
          }
        >
          {scEl}
          {fiatEl}
        </div>
      )
    } else {
      return scEl
    }
  }

  if (currencyDisplay === 'bothPreferFiat') {
    if (displayBoth) {
      return (
        <div
          className={
            displayBothDirection === 'column'
              ? 'flex flex-col items-end'
              : 'flex gap-1'
          }
        >
          {fiatEl}
          {scEl}
        </div>
      )
    } else {
      return fiatEl
    }
  }

  return scEl
}
