import {
  Box,
  SiacoinField,
  Information16,
  Flex,
  NextLink,
  Text,
  ValueSc,
  Tooltip,
} from '@siafoundation/design-system'
import { toHastings, toSiacoins } from '@siafoundation/sia-js'
import BigNumber from 'bignumber.js'

type Props = {
  average?: BigNumber
  suggestion?: BigNumber
  suggestionTip?: string
  value: BigNumber
  onChange: (value: BigNumber) => void
  decimalsLimitSc?: number
  decimalsLimitFiat?: number
}

export function ConfigurationSiacoin({
  average,
  suggestion,
  suggestionTip,
  decimalsLimitSc = 3,
  decimalsLimitFiat = 3,
  value,
  onChange,
}: Props) {
  return (
    <Flex gap="1-5" direction="column" css={{ width: '220px' }}>
      <SiacoinField
        sc={toSiacoins(value)}
        decimalsLimitSc={decimalsLimitSc}
        decimalsLimitFiat={decimalsLimitFiat}
        placeholder={
          suggestion
            ? toSiacoins(suggestion)
            : average
            ? toSiacoins(average)
            : undefined
        }
        onChange={(val) => onChange(toHastings(val))}
      />
      <Flex gap="1" direction="column">
        {average && (
          <Tip
            label="Network average"
            tip="Averages provided by SiaCentral."
            decimalsLimit={decimalsLimitSc}
            value={average}
            onChange={onChange}
          />
        )}
        {suggestion && (
          <Tip
            label="Suggestion"
            tip={suggestionTip}
            decimalsLimit={decimalsLimitSc}
            value={suggestion}
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
  value: BigNumber
  onChange: (value: BigNumber) => void
  decimalsLimit: number
}

function Tip({ label, link, tip, value, onChange, decimalsLimit }: TipProps) {
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
        <ValueSc
          value={value}
          variant="value"
          size="12"
          fixed={decimalsLimit}
          dynamicUnits={false}
          showTooltip={false}
        />
      </Box>
    </Flex>
  )
}
