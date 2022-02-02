import {
  ArrowRightIcon,
  ChatBubbleIcon,
  CubeIcon,
  FileTextIcon,
  InfoCircledIcon,
} from '@radix-ui/react-icons'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuRightSlot,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuTriggerItem,
} from '@siafoundation/design-system'

type Props = {
  align?: 'center' | 'end' | 'start'
  children: React.ReactNode
}

export function Menu({ align, children }: Props) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent align={align}>
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
        <DropdownMenuSeparator />
        <SubMenu name="Sub menu 1">
          <SubMenu name="Nested menu" />
        </SubMenu>
        <SubMenu name="Sub menu 2">
          <SubMenu name="Nested menu" />
        </SubMenu>
        <DropdownMenuSeparator />
        <DropdownMenuLabel>Choose multiple</DropdownMenuLabel>
        <DropdownMenuGroup>
          <DropdownMenuCheckboxItem>Item</DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem checked>Item</DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem>Item</DropdownMenuCheckboxItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuLabel>Choose one</DropdownMenuLabel>
        <DropdownMenuRadioGroup value="one">
          <DropdownMenuRadioItem value="one">Item</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="two">Item</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="three">Item</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

type SubMenuProps = {
  name: string
  children?: React.ReactNode
}

const SubMenu = ({ name, children }: SubMenuProps) => (
  <DropdownMenu>
    <DropdownMenuTriggerItem>
      {name}
      <DropdownMenuRightSlot>
        <ArrowRightIcon />
      </DropdownMenuRightSlot>
    </DropdownMenuTriggerItem>
    <DropdownMenuContent>
      {children}
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
    </DropdownMenuContent>
  </DropdownMenu>
)
