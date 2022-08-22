import { styled } from '../config/theme'
import CurrencyInput from 'react-currency-input-field'
import { TextField } from './TextField'
import { Box } from './Box'
import { Flex } from './Flex'
import { Text } from './Text'
import { Panel } from './Panel'

export const NumberInput = styled(CurrencyInput, TextField)

type Props = {
  units?: string
} & React.ComponentProps<typeof NumberInput>

export function NumberField({ units, ...props }: Props) {
  return (
    <Box css={{ position: 'relative' }}>
      <NumberInput
        {...props}
        autoComplete="off"
        spellCheck={false}
        css={{ paddingRight: units ? '$6' : undefined }}
      />
      {units && (
        <Flex
          align="center"
          css={{
            position: 'absolute',
            top: 0,
            right: '$0-5',
            height: '100%',
            width: '$5',
          }}
        >
          <Panel css={{ padding: '$0-5 $1' }}>
            <Text weight="semibold">{units}</Text>
          </Panel>
        </Flex>
      )}
    </Box>
  )
}
