import { useState } from 'react'
import {
  LinkData,
  SiteMap,
  ThemeRadio,
  Dialog,
  Button,
  MenuIcon,
  Logo,
  Container,
  DialogClose,
} from '@siafoundation/design-system'
import { cx } from 'class-variance-authority'

export type MenuSection = {
  title: string
  links: LinkData[]
}

type Props = {
  menuSections: MenuSection[]
}

export function SiteMenu({ menuSections }: Props) {
  const [open, setOpen] = useState<boolean>(false)

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
      dynamicHeight={false}
      containerVariants={{
        variant: 'none',
        className: [
          'm-auto',
          'h-full',
          'max-w-screen-2xl',
          'relative',
          '2xl:-left-[7.5px]',
        ],
      }}
      contentVariants={{
        variant: 'none',
        className: 'bg-black h-full border-3 border-graydark-400/50',
      }}
      closeClassName="dark absolute right-4 md:right-12 top-9"
      trigger={
        <Button
          size="small"
          variant="ghost"
          className="relative"
          icon="contrast"
        >
          <MenuIcon />
        </Button>
      }
    >
      <div className="dark">
        <div className="absolute bg-black z-10 top-0 left-0 right-0 h-[100px] border-b-2 border-graydark-400/20">
          <Container size="4" className="flex gap-10 items-center h-full">
            <Logo size={35} />
            <div className="flex-1" />
            <ThemeRadio tooltipClassName="dark" tabIndex={-1} />
            <DialogClose className="relative top-[3px]" />
          </Container>
        </div>
        <div
          className={cx(
            'bg-black flex flex-col items-start justify-center h-full',
            'pt-32 lg:pt-40 px-6 mx-auto xl:ml-32 2xl:ml-40 w-full max-w-screen-lg'
          )}
        >
          <SiteMap menuSections={menuSections} onClick={() => setOpen(false)} />
          <div className="flex mt-20 mb-20"></div>
        </div>
      </div>
    </Dialog>
  )
}
