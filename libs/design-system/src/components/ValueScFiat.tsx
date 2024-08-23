'use client'

import { Text } from '../core/Text'
import BigNumber from 'bignumber.js'
import { ValueSc } from './ValueSc'
import { ValueFiat } from './ValueFiat'
import {
  useAppSettings,
  useActiveExchangeRate,
} from '@siafoundation/react-core'
import { useMemo } from 'react'
import { Tooltip } from '../core/Tooltip'

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
  tipSide?: React.ComponentProps<typeof Tooltip>['side']
  font?: React.ComponentProps<typeof Text>['font']
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
  font = 'mono',
  tipSide,
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
  const { rate } = useActiveExchangeRate()

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
        font={font}
        dynamicUnits={dynamicUnits}
        hastingUnits={hastingUnits}
        extendedSuffix={extendedSuffix}
        showTooltip={showTooltip}
        tipSide={tipSide}
      />
    ),
    [
      value,
      size,
      scaleSize,
      tooltip,
      variant,
      fixed,
      font,
      dynamicUnits,
      hastingUnits,
      extendedSuffix,
      showTooltip,
      tipSide,
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
        font={font}
        dynamicUnits={dynamicUnits}
        hastingUnits={hastingUnits}
        extendedSuffix={extendedSuffix}
        showTooltip={showTooltip}
        tipSide={tipSide}
      />
    ),
    [
      value,
      size,
      scaleSize,
      tooltip,
      variant,
      font,
      fixedFiat,
      fixedTipFiat,
      dynamicUnits,
      hastingUnits,
      extendedSuffix,
      showTooltip,
      tipSide,
      currencyDisplay,
      displayBoth,
      displayBothDirection,
    ]
  )

  if (currencyDisplay === 'sc') {
    return scEl
  }

  if (!rate) {
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
