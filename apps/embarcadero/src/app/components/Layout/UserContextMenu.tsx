import {
  ChatBubbleIcon,
  CubeIcon,
  DotsHorizontalIcon,
  FileTextIcon,
  InfoCircledIcon,
} from '@radix-ui/react-icons'
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRightSlot,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Link,
} from '@siafoundation/design-system'
import { GeneralMenu } from './GeneralMenu'
import { ThemeMenu } from './ThemeMenu'

type Props = React.ComponentProps<typeof Button>

export function UserContextMenu(props: Props) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button {...props}>
          <DotsHorizontalIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <GeneralMenu />
        <DropdownMenuSeparator />
        <ThemeMenu />
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
