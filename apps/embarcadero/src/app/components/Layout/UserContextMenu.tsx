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
  DropdownMenuRightSlot,
  DropdownMenuTrigger,
} from '@siafoundation/design-system'

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
        <DropdownMenuGroup>
          <DropdownMenuItem>
            About
            <DropdownMenuRightSlot>
              <InfoCircledIcon />
            </DropdownMenuRightSlot>
          </DropdownMenuItem>
          <DropdownMenuItem>
            Discord
            <DropdownMenuRightSlot>
              <ChatBubbleIcon />
            </DropdownMenuRightSlot>
          </DropdownMenuItem>
          <DropdownMenuItem>
            Docs
            <DropdownMenuRightSlot>
              <CubeIcon />
            </DropdownMenuRightSlot>
          </DropdownMenuItem>
          <DropdownMenuItem>
            Privacy
            <DropdownMenuRightSlot>
              <FileTextIcon />
            </DropdownMenuRightSlot>
          </DropdownMenuItem>
          {/* <DropdownMenuSeparator />
          <DropdownMenuCheckboxItem>Item</DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem checked>Item</DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem>Item</DropdownMenuCheckboxItem>
          <DropdownMenuSeparator />
          <DropdownMenuLabel>Choose one</DropdownMenuLabel>
          <DropdownMenuRadioGroup value="one">
            <DropdownMenuRadioItem value="one">Item</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="two">Item</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="three">Item</DropdownMenuRadioItem>
          </DropdownMenuRadioGroup> */}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
