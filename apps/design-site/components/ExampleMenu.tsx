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
  NextLink,
  LogoDiscord16,
  Notebook16,
  LicenseGlobal16,
  ArrowRight16,
  Information16,
} from '@siafoundation/design-system'

type Props = {
  align?: 'center' | 'end' | 'start'
  children: React.ReactNode
}

export function ExampleMenu({ align, children }: Props) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent align={align}>
        <DropdownMenuItem>
          About
          <DropdownMenuRightSlot>
            <Information16 />
          </DropdownMenuRightSlot>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <NextLink
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
              <LogoDiscord16 />
            </DropdownMenuRightSlot>
          </NextLink>
        </DropdownMenuItem>
        <DropdownMenuItem>
          Docs
          <DropdownMenuRightSlot>
            <Notebook16 />
          </DropdownMenuRightSlot>
        </DropdownMenuItem>
        <DropdownMenuItem>
          Privacy
          <DropdownMenuRightSlot>
            <LicenseGlobal16 />
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
        <ArrowRight16 />
      </DropdownMenuRightSlot>
    </DropdownMenuTriggerItem>
    <DropdownMenuContent>
      {children}
      <DropdownMenuItem>
        About
        <DropdownMenuRightSlot>
          <Information16 />
        </DropdownMenuRightSlot>
      </DropdownMenuItem>
      <NextLink href="https://discord.gg/sia" target="_blank">
        <DropdownMenuItem>
          Discord
          <DropdownMenuRightSlot>
            <LogoDiscord16 />
          </DropdownMenuRightSlot>
        </DropdownMenuItem>
      </NextLink>
      <DropdownMenuItem>
        Docs
        <DropdownMenuRightSlot>
          <Notebook16 />
        </DropdownMenuRightSlot>
      </DropdownMenuItem>
      <DropdownMenuItem>
        Privacy
        <DropdownMenuRightSlot>
          <LicenseGlobal16 />
        </DropdownMenuRightSlot>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
)
