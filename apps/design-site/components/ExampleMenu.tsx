import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuRightSlot,
  DropdownMenuSeparator,
  Link,
  LogoDiscord16,
  Notebook16,
  LicenseGlobal16,
  Information16,
  DropdownMenuSub,
  Text,
} from '@siafoundation/design-system'

type Props = {
  align?: 'center' | 'end' | 'start'
  children: React.ReactNode
}

export function ExampleMenu({ align, children }: Props) {
  return (
    <DropdownMenu
      trigger={children}
      contentProps={{
        align,
      }}
    >
      <DropdownMenuItem>
        About
        <DropdownMenuRightSlot>
          <Information16 />
        </DropdownMenuRightSlot>
      </DropdownMenuItem>
      <Link href="https://discord.gg/sia" target="_blank" className="w-full">
        <DropdownMenuItem>
          Discord
          <DropdownMenuRightSlot>
            <LogoDiscord16 />
          </DropdownMenuRightSlot>
        </DropdownMenuItem>
      </Link>
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
    </DropdownMenu>
  )
}

type SubMenuProps = {
  name: string
  children?: React.ReactNode
}

const SubMenu = ({ name, children }: SubMenuProps) => (
  <DropdownMenuSub trigger={<Text>{name}</Text>}>
    {children}
    <DropdownMenuItem>
      About
      <DropdownMenuRightSlot>
        <Information16 />
      </DropdownMenuRightSlot>
    </DropdownMenuItem>
    <Link href="https://discord.gg/sia" target="_blank" className="w-full">
      <DropdownMenuItem>
        Discord
        <DropdownMenuRightSlot>
          <LogoDiscord16 />
        </DropdownMenuRightSlot>
      </DropdownMenuItem>
    </Link>
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
  </DropdownMenuSub>
)
