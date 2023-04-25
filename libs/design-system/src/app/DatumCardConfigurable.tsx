import { Select } from '../core/Select'
import { Text } from '../core/Text'
import { DatumCard } from '../components/DatumCard'
import { ValueNum } from '../components/ValueNum'
import { ValueSc } from '../components/ValueSc'
import { DataLabel } from './DataLabel'
import BigNumber from 'bignumber.js'
import { useState } from 'react'

type Mode = 'total' | 'average' | 'latest'

type Props = {
  label: string
  color?: string
  sc?: {
    total: number
    average: number
    latest: number
    diff: number
    change: number
  }
  value?: {
    total: number
    average: number
    latest: number
    diff: number
    change: number
  }
  format?: (val: number) => string
  defaultMode: Mode
  enabledModes?: Mode[]
  showChange?: boolean
}

const modeMap = {
  total: 'total',
  average: 'average',
  latest: 'latest',
}

export function DatumCardConfigurable({
  label,
  color,
  sc,
  value,
  format = (val) => val.toFixed(2),
  defaultMode,
  enabledModes = ['total', 'average', 'latest'],
  showChange = true,
}: Props) {
  const [mode, setMode] = useState<Mode>(defaultMode)
  return (
    <DatumCard
      label={<DataLabel label={label} color={color} />}
      actions={
        <Select
          onChange={(e) => setMode(e.currentTarget.value as Mode)}
          defaultValue={mode}
        >
          {enabledModes.map((m) => (
            <option key={m} value={m}>
              {modeMap[m]}
            </option>
          ))}
        </Select>
      }
      sc={sc ? new BigNumber(sc[mode]) : undefined}
      value={value && format ? format(value[mode]) : undefined}
      comment={
        sc ? (
          <div className="flex items-center gap-4">
            <ValueSc
              tooltip="Change over period"
              value={new BigNumber(sc.diff)}
            />
            {showChange && sc.change !== undefined && (
              <Text
                size="14"
                weight="semibold"
                font="mono"
                ellipsis
                color="verySubtle"
              >
                {sc.change.toFixed(2)}%
              </Text>
            )}
          </div>
        ) : (
          value && (
            <div className="flex items-center gap-4">
              <ValueNum
                tooltip="Change over period"
                format={(val) => format(val.toNumber())}
                value={new BigNumber(value.diff)}
              />
              {showChange && value.change !== undefined && (
                <Text
                  size="14"
                  weight="semibold"
                  font="mono"
                  ellipsis
                  color="verySubtle"
                >
                  {value.change.toFixed(2)}%
                </Text>
              )}
            </div>
          )
        )
      }
    />
  )
}
