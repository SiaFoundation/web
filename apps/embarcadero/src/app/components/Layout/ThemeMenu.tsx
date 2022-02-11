import { DrawingPinFilledIcon, MoonIcon, SunIcon } from '@radix-ui/react-icons'
import {
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRightSlot,
  useTheme,
} from '@siafoundation/design-system'
import { useCallback } from 'react'

function getCss(on: boolean) {
  return {
    '& > *, &:hover > *': {
      color: on ? '$hiContrast' : undefined,
    },
  }
}

export function ThemeMenu() {
  const { activeTheme, activeMode, setTheme, setMode } = useTheme()

  const active = activeMode === 'system' ? 'system' : activeTheme

  const onChange = useCallback(
    (val: 'light' | 'dark' | 'system') => {
      if (val === 'system') {
        setMode('system')
      } else {
        setMode('user')
        setTheme(val as 'light' | 'dark')
      }
    },
    [setMode, setTheme]
  )

  return (
    <DropdownMenuGroup>
      <DropdownMenuLabel>Color mode</DropdownMenuLabel>
      <DropdownMenuItem
        onSelect={() => onChange('light')}
        css={getCss(active === 'light')}
      >
        Light
        <DropdownMenuRightSlot>
          <SunIcon />
        </DropdownMenuRightSlot>
      </DropdownMenuItem>
      <DropdownMenuItem
        onSelect={() => onChange('dark')}
        css={getCss(active === 'dark')}
      >
        Dark
        <DropdownMenuRightSlot>
          <MoonIcon />
        </DropdownMenuRightSlot>
      </DropdownMenuItem>
      <DropdownMenuItem
        onSelect={() => onChange('system')}
        css={getCss(active === 'system')}
      >
        System
        <DropdownMenuRightSlot>
          <DrawingPinFilledIcon />
        </DropdownMenuRightSlot>
      </DropdownMenuItem>
    </DropdownMenuGroup>
  )
}
