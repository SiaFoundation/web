import { Flex, RLink } from '@siafoundation/design-system'
import { AdvancedMenu } from './AdvancedMenu'

export function SwapNav() {
  return (
    <Flex gap="1" justify="between">
      <RLink to="/" css={{ fontSize: '$6' }}>
        Swap
      </RLink>
      <AdvancedMenu />
    </Flex>
  )
}
