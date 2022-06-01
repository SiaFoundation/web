import {
  AnimatedPanel,
  Container,
  Flex,
  Text,
} from '@siafoundation/design-system'

type Props = {
  message: string
}

export function Entity404({ message }: Props) {
  return (
    <>
      <Container>
        <Flex direction="column" gap="6">
          <AnimatedPanel
            variant="subtle"
            startTime={0}
            css={{
              padding: '$3',
              borderRadius: '$2',
            }}
          >
            <Flex direction="column" align="center" gap="5">
              <Text size="64" font="mono" weight="semibold">
                404
              </Text>
              <Text size="24" font="mono" css={{ textAlign: 'center' }}>
                beep boop
              </Text>
              <Text size="24" font="mono" css={{ textAlign: 'center' }}>
                {message}
              </Text>
            </Flex>
          </AnimatedPanel>
        </Flex>
      </Container>
    </>
  )
}
