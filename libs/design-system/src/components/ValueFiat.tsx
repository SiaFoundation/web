'use client'

import { Text } from '../core/Text'
import { Tooltip } from '../core/Tooltip'
import BigNumber from 'bignumber.js'
import { useExternalActiveExchangeRate } from '../hooks/useExternalExchangeRate'
import { getCurrencyDisplayPropsFiat } from '../lib/currencyDisplay'
import { ValueWithTooltip } from './ValueWithTooltip'
import { useMemo } from 'react'

type Props = {
  labeledBy?: string
  testId?: string
  size?: React.ComponentProps<typeof Text>['size']
  scaleSize?: React.ComponentProps<typeof Text>['scaleSize']
  sc: BigNumber // hastings
  color?: React.ComponentProps<typeof Text>['color']
  variant?: 'change' | 'value'
  tooltip?: string
  fixed?: number
  font?: React.ComponentProps<typeof Text>['font']
  fixedTip?: number
  dynamicUnits?: boolean
  hastingUnits?: boolean
  extendedSuffix?: string
  showTooltip?: boolean
  tipSide?: React.ComponentProps<typeof Tooltip>['side']
}

export function ValueFiat({
  sc,
  size,
  scaleSize,
  color: customColor,
  tooltip = '',
  variant = 'change',
  fixed,
  font = 'mono',
  fixedTip = 20,
  showTooltip = true,
  tipSide,
  extendedSuffix,
  labeledBy,
  testId,
}: Props) {
  const { rate, currency } = useExternalActiveExchangeRate()
  const displayProps = useMemo(() => {
    if (!rate || !currency) {
      return null
    }
    return getCurrencyDisplayPropsFiat({
      sc,
      variant,
      fixed,
      fixedTip,
      color: customColor,
      tooltip,
      extendedSuffix,
      exchange: {
        currency,
        rate,
      },
    })
  }, [
    sc,
    variant,
    fixed,
    fixedTip,
    customColor,
    tooltip,
    extendedSuffix,
    rate,
    currency,
  ])

  if (!rate || !currency) {
    return null
  }

  if (!displayProps) {
    return null
  }

  return (
    <ValueWithTooltip
      labeledBy={labeledBy}
      testId={testId}
      size={size}
      scaleSize={scaleSize}
      tipSide={tipSide}
      font={font}
      showTooltip={showTooltip}
      value={displayProps.value}
      tooltip={displayProps.tooltip}
      color={displayProps.color}
    />
  )
}
