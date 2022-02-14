import {
  Flex,
  Heading,
  IconButton,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@siafoundation/design-system'
import { GearIcon } from '@radix-ui/react-icons'
import { Details } from './Details'

export function AdvancedMenu() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <IconButton css={{ transform: 'scale(1.5)' }}>
          <GearIcon />
        </IconButton>
      </PopoverTrigger>
      <PopoverContent align="end" css={{ padding: '$3', minWidth: '400px' }}>
        <Flex direction="column" gap="3">
          <Heading>Advanced</Heading>
          <Details />
        </Flex>
      </PopoverContent>
    </Popover>
  )
}
