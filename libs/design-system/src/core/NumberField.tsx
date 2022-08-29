import { styled } from '../config/theme'
import CurrencyInput from 'react-currency-input-field'
import { TextField } from './TextField'
import { Box } from './Box'
import { Flex } from './Flex'
import { Text } from './Text'

const NumberInput = styled(CurrencyInput, TextField)

type Props = {
  units?: string
} & React.ComponentProps<typeof NumberInput>

export function NumberField({ units, size = '1', ...props }: Props) {
  return (
    <Box css={{ position: 'relative' }}>
      <NumberInput
        {...props}
        autoComplete="off"
        size={size}
        spellCheck={false}
        css={{ ...props.css, paddingRight: units ? '$6' : undefined }}
      />
      {units && (
        <Flex
          align="center"
          css={{
            position: 'absolute',
            top: 0,
            height: '100%',
            right: size === '1' ? '$1' : '$1-5',
          }}
        >
          <Text size={size === '1' ? '12' : '14'} weight="semibold">
            {units}
          </Text>
        </Flex>
      )}
    </Box>
  )
}
