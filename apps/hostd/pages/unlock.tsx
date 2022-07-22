import { Flex, Panel, Separator, Text } from '@siafoundation/design-system'
import { PublicLayout } from '../components/PublicLayout'
import UnlockForm from '../components/UnlockForm'

export default function Unlock() {
  return (
    <PublicLayout>
      <Flex
        direction="column"
        align="center"
        justify="center"
        gap="3"
        css={{ height: '100%' }}
      >
        <Panel
          css={{
            position: 'relative',
            top: '-50px',
            width: '300px',
            p: '$2',
          }}
        >
          <Flex direction="column" gap="2">
            <Text font="mono" weight="bold" size="20">
              hostd
            </Text>
            <Separator size="100" pad={0} />
            <UnlockForm />
          </Flex>
        </Panel>
      </Flex>
    </PublicLayout>
  )
}
