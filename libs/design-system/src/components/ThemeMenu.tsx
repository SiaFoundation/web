import {
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRightSlot,
} from '../primitives/DropdownMenu'
import { useTheme } from '../hooks/useTheme'
import { useCallback } from 'react'
import { Asleep16, Awake16, Screen16 } from '../icons'

function getCss(on: boolean) {
  return {
    '&, & > *, &:hover > *': {
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
          <Awake16 />
        </DropdownMenuRightSlot>
      </DropdownMenuItem>
      <DropdownMenuItem
        onSelect={() => onChange('dark')}
        css={getCss(active === 'dark')}
      >
        Dark
        <DropdownMenuRightSlot>
          <Asleep16 />
        </DropdownMenuRightSlot>
      </DropdownMenuItem>
      <DropdownMenuItem
        onSelect={() => onChange('system')}
        css={getCss(active === 'system')}
      >
        System
        <DropdownMenuRightSlot>
          <Screen16 />
        </DropdownMenuRightSlot>
      </DropdownMenuItem>
    </DropdownMenuGroup>
  )
}
