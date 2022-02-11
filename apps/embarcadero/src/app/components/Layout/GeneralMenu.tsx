import {
  ChatBubbleIcon,
  CubeIcon,
  FileTextIcon,
  InfoCircledIcon,
} from '@radix-ui/react-icons'
import {
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRightSlot,
  Link,
} from '@siafoundation/design-system'
import { ThemeMenu } from './ThemeMenu'

export function GeneralMenu() {
  return (
    <DropdownMenuGroup>
      <DropdownMenuLabel>General</DropdownMenuLabel>
      <DropdownMenuItem>
        <Link
          href="https://github.com/SiaFoundation/embarcadero"
          target="_blank"
          css={{
            display: 'flex',
            width: '100%',
            alignItems: 'center',
          }}
        >
          About
          <DropdownMenuRightSlot>
            <InfoCircledIcon />
          </DropdownMenuRightSlot>
        </Link>
      </DropdownMenuItem>
      <DropdownMenuItem>
        <Link
          href="https://discord.gg/sia"
          target="_blank"
          css={{
            display: 'flex',
            width: '100%',
            alignItems: 'center',
          }}
        >
          Discord
          <DropdownMenuRightSlot>
            <ChatBubbleIcon />
          </DropdownMenuRightSlot>
        </Link>
      </DropdownMenuItem>
      <DropdownMenuItem>
        <Link
          href="https://support.sia.tech"
          target="_blank"
          css={{
            display: 'flex',
            width: '100%',
            alignItems: 'center',
          }}
        >
          Docs
          <DropdownMenuRightSlot>
            <CubeIcon />
          </DropdownMenuRightSlot>
        </Link>
      </DropdownMenuItem>
      <DropdownMenuItem>
        Privacy
        <DropdownMenuRightSlot>
          <FileTextIcon />
        </DropdownMenuRightSlot>
      </DropdownMenuItem>
    </DropdownMenuGroup>
  )
}
