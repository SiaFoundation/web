import {
  DatumCard,
  Flex,
  Select,
  Text,
  ValueNum,
  ValueSc,
} from '@siafoundation/design-system'
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
        <>
          <Select onChange={(e) => setMode(e.target.value)} defaultValue={mode}>
            {enabledModes.map((m) => (
              <option key={m} value={m}>
                {modeMap[m]}
              </option>
            ))}
          </Select>
        </>
      }
      sc={sc ? new BigNumber(sc[mode]) : undefined}
      value={value && format ? format(value[mode]) : undefined}
      // double wrapped flex fixes really weird glitch with colors being applied
      // incorrectly by stitches in generated css classes
      comment={
        sc ? (
          <Flex>
            <Flex gap="2">
              <ValueSc
                tooltip="Change over period"
                value={new BigNumber(sc.diff)}
              />
              {showChange && (
                <Text
                  size="14"
                  weight="semibold"
                  font="mono"
                  ellipsis
                  css={{
                    color: '$gray9',
                  }}
                >
                  {sc.change.toFixed(2)}%
                </Text>
              )}
            </Flex>
          </Flex>
        ) : (
          value && (
            <Flex>
              <Flex gap="2">
                <ValueNum
                  tooltip="Change over period"
                  format={(val) => format(val.toNumber())}
                  value={new BigNumber(value.diff)}
                />
                {showChange && (
                  <Text
                    size="14"
                    weight="semibold"
                    font="mono"
                    ellipsis
                    css={{
                      color: '$gray9',
                    }}
                  >
                    {value.change.toFixed(2)}%
                  </Text>
                )}
              </Flex>
            </Flex>
          )
        )
      }
    />
  )
}
