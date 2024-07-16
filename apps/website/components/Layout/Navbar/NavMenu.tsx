import {
  NavMenuIndicator,
  NavMenuList,
  NavMenuRoot,
  NavMenuViewport,
  panelStyles,
} from '@siafoundation/design-system'
import { cx } from 'class-variance-authority'
import { GrantsNav } from './GrantsNav'
import { HostNav } from './HostNav'
import { RentNav } from './RentNav'
import { WalletNav } from './WalletNav'

export function NavMenu() {
  return (
    <NavMenuRoot className="relative flex gap-6 items-center pl-[100px] pr-10">
      <NavMenuList>
        <div className="gap-5 items-center hidden md:flex">
          <RentNav />
          <HostNav />
          <WalletNav />
          <GrantsNav />
        </div>
        <NavMenuIndicator className="data-[state=visible]:animate-fadeIn data-[state=hidden]:animate-fadeOut top-full z-[1] flex h-[10px] items-end justify-center overflow-hidden transition-[width,transform_250ms_ease]">
          <div className="relative top-[70%] h-[10px] w-[10px] rotate-[45deg] rounded-tl-[2px] bg-gray-400 dark:bg-graydark-400" />
        </NavMenuIndicator>
      </NavMenuList>
      <div className="perspective-[2000px] absolute top-full left-0 flex w-full justify-center">
        <NavMenuViewport
          className={cx(
            'relative',
            'data-[state=open]:animate-scaleIn data-[state=closed]:animate-scaleOut',
            'origin-[top_center] overflow-hidden rounded-[6px] transition-[width,_height] duration-300',
            'mt-[10px] h-[var(--radix-navigation-menu-viewport-height)]',
            'w-full sm:w-[var(--radix-navigation-menu-viewport-width)]',
            panelStyles(),
          )}
        />
      </div>
    </NavMenuRoot>
  )
}
