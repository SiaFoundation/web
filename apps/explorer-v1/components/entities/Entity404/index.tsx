import { Panel, Container, Text } from '@siafoundation/design-system'

type Props = {
  message: string
}

export function Entity404({ message }: Props) {
  return (
    <Container size="2">
      <Panel className="md:p-8 !rounded-lg !border-3 !border-gray-1100 dark:!border-graydark-500">
        <div className="p-8 flex flex-col gap-10 items-center">
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
      </Panel>
    </Container>
  )
}
