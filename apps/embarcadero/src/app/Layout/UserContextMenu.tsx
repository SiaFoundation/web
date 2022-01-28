import {
  ChatBubbleIcon,
  CubeIcon,
  DiscIcon,
  DotsHorizontalIcon,
  FileTextIcon,
  InfoCircledIcon,
  PaperPlaneIcon,
} from '@radix-ui/react-icons'
import {
  Button,
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@siafoundation/design-system'

export function UserContextMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button>
          <DotsHorizontalIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" css={{ marginTop: '$1' }}>
        <DropdownMenuGroup>
          <DropdownMenuItem>
            About
            <InfoCircledIcon />
          </DropdownMenuItem>
          <DropdownMenuItem>
            Discord
            <ChatBubbleIcon />
          </DropdownMenuItem>
          <DropdownMenuItem>
            Docs
            <CubeIcon />
          </DropdownMenuItem>
          <DropdownMenuItem>
            Privacy
            <FileTextIcon />
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
