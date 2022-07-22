import {
  Button,
  DropdownMenuSeparator,
  UserDropdownMenu,
  Warning16,
  Tooltip,
  Box,
} from '@siafoundation/design-system'
import { StatusMenuGroup } from './StatusMenuGroup'
import { GeneralMenuGroup } from './GeneralMenuGroup'
import { useConnectivity } from '../../hooks/useConnectivity'

type Props = React.ComponentProps<typeof Button>

export function UserMenu(props: Props) {
  const { daemon } = useConnectivity()

  return (
    <UserDropdownMenu
      trigger={
        !daemon && (
          <Box>
            <Tooltip content="Disconnected from daemon">
              <Button {...props} css={{ color: '$red10' }}>
                <Warning16 />
              </Button>
            </Tooltip>
          </Box>
        )
      }
    >
      <StatusMenuGroup />
      <DropdownMenuSeparator />
      <GeneralMenuGroup />
    </UserDropdownMenu>
  )
}
