import {
  Flex,
  Panel,
  Separator,
  Text,
  AppPublicLayout,
  AppUnlockForm,
} from '@siafoundation/design-system'
import { routes } from '../config/routes'

export default function Unlock() {
  return (
    <AppPublicLayout routes={routes}>
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
              renterd
            </Text>
            <Separator className="w-full" />
            <AppUnlockForm routes={routes} />
          </Flex>
        </Panel>
      </Flex>
    </AppPublicLayout>
  )
}
