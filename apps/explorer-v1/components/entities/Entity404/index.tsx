import { AnimatedPanel, Container, Text } from '@siafoundation/design-system'

type Props = {
  message: string
}

export function Entity404({ message }: Props) {
  return (
    <>
      <Container>
        <div className="flex flex-col gap-12">
          <AnimatedPanel
            variant="verySubtle"
            startTime={0}
            className="p-6 rounded"
          >
            <div className="flex flex-col gap-10 items-center">
              <Text size="64" font="mono" weight="semibold">
                404
              </Text>
              <Text size="24" font="mono" className="text-center">
                beep boop
              </Text>
              <Text size="24" font="mono" className="text-center">
                {message}
              </Text>
            </div>
          </AnimatedPanel>
        </div>
      </Container>
    </>
  )
}
