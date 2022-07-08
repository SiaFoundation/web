import {
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRightSlot,
  LogoDiscord16,
  Notebook16,
  LicenseGlobal16,
  Information16,
  Link,
  webLinks,
} from '@siafoundation/design-system'
import { useDialog } from '../../contexts/dialog'

export function GeneralMenuGroup() {
  const { openDialog } = useDialog()

  return (
    <DropdownMenuGroup>
      <DropdownMenuLabel>General</DropdownMenuLabel>
      <Link href={webLinks.github} target="_blank">
        <DropdownMenuItem>
          About
          <DropdownMenuRightSlot>
            <Information16 />
          </DropdownMenuRightSlot>
        </DropdownMenuItem>
      </Link>
      <Link href={webLinks.discord} target="_blank">
        <DropdownMenuItem>
          Discord
          <DropdownMenuRightSlot>
            <LogoDiscord16 />
          </DropdownMenuRightSlot>
        </DropdownMenuItem>
      </Link>
      <Link href={webLinks.docs.index} target="_blank">
        <DropdownMenuItem>
          Docs
          <DropdownMenuRightSlot>
            <Notebook16 />
          </DropdownMenuRightSlot>
        </DropdownMenuItem>
      </Link>
      <DropdownMenuItem onSelect={() => openDialog('privacy')}>
        Privacy
        <DropdownMenuRightSlot>
          <LicenseGlobal16 />
        </DropdownMenuRightSlot>
      </DropdownMenuItem>
    </DropdownMenuGroup>
  )
}
