import {
  Box,
  Information16,
  Flex,
  NextLink,
  Text,
  Tooltip,
  NumberField,
  ValueNum,
} from '@siafoundation/design-system'
import BigNumber from 'bignumber.js'

type Props = {
  average?: BigNumber
  suggestion?: BigNumber
  suggestionTip?: string
  units: string
  value: BigNumber
  onChange: (value: BigNumber) => void
  decimalsLimit?: number
}

export function ConfigurationNumber({
  average,
  suggestion,
  suggestionTip,
  decimalsLimit = 2,
  units,
  value,
  onChange,
}: Props) {
  return (
    <Flex gap="1-5" direction="column" css={{ width: '220px' }}>
      <NumberField
        value={value ? toFixedMax(value, decimalsLimit) : ''}
        units={units}
        decimalsLimit={decimalsLimit}
        onValueChange={(val) => {
          onChange(new BigNumber(val || 0))
        }}
      />
      <Flex gap="1" direction="column">
        {average && (
          <Tip
            label="Network average"
            tip="Averages provided by SiaCentral."
            decimalsLimit={decimalsLimit}
            value={average}
            units={units}
            onChange={onChange}
          />
        )}
        {suggestion && (
          <Tip
            label="Suggestion"
            tip={suggestionTip}
            decimalsLimit={decimalsLimit}
            value={suggestion}
            units={units}
            onChange={onChange}
          />
        )}
      </Flex>
    </Flex>
  )
}

type TipProps = {
  label: string
  link?: string
  tip: string
  units: string
  value: BigNumber
  decimalsLimit: number
  onChange: (value: BigNumber) => void
}

function Tip({
  label,
  link,
  tip,
  value,
  units,
  decimalsLimit,
  onChange,
}: TipProps) {
  return (
    <Flex justify="between" align="center">
      <Tooltip align="start" content={tip}>
        <Flex gap="0-5" align="center">
          <Information16 />
          <Text size="12">
            {link ? (
              <NextLink underline="hover" href={link} target="_blank">
                {label}
              </NextLink>
            ) : (
              label
            )}
          </Text>
        </Flex>
      </Tooltip>
      <Box onClick={() => onChange(value)} css={{ cursor: 'pointer' }}>
        <ValueNum
          value={value}
          variant="value"
          size="12"
          format={(val) => `${toFixedMax(val, decimalsLimit)} ${units}`}
        />
      </Box>
    </Flex>
  )
}

function toFixedMax(val: BigNumber, limit: number) {
  return val.decimalPlaces() > limit ? val.toFixed(limit) : val.toString()
}
