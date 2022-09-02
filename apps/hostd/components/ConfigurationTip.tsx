import {
  Information16,
  Flex,
  NextLink,
  Text,
  ValueSc,
  Tooltip,
  ValueNum,
  toFixedMax,
} from '@siafoundation/design-system'
import BigNumber from 'bignumber.js'

type Props = {
  type: 'siacoin' | 'number'
  label: string
  link?: string
  tip: string
  value: BigNumber
  onChange: (value: BigNumber) => void
  decimalsLimit: number
  units?: string
}

export function ConfigurationTip({
  type,
  label,
  link,
  tip,
  value,
  onChange,
  decimalsLimit,
  units,
}: Props) {
  return (
    <Flex justify="between" align="center">
      <Tooltip align="start" content={tip}>
        <Flex
          gap="0-5"
          align="center"
          css={{ position: 'relative', top: '1px' }}
        >
          <Flex css={{ position: 'relative', top: '-1px' }}>
            <Information16 />
          </Flex>
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
      <Flex onClick={() => onChange(value)} css={{ cursor: 'pointer' }}>
        {type === 'siacoin' ? (
          <ValueSc
            value={value}
            variant="value"
            size="12"
            fixed={decimalsLimit}
            dynamicUnits={false}
            showTooltip={false}
          />
        ) : (
          <ValueNum
            value={value}
            variant="value"
            size="12"
            format={(val) => `${toFixedMax(val, decimalsLimit)} ${units}`}
          />
        )}
      </Flex>
    </Flex>
  )
}
