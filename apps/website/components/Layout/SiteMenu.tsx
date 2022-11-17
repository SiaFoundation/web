import { useState } from 'react'
import {
  LogoMenuIcon,
  LinkData,
  SiteMap,
  ThemeRadio,
  Dialog,
  Text,
  Button,
} from '@siafoundation/design-system'

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
    <div className="relative z-20">
      <Dialog
        open={open}
        onOpenChange={setOpen}
        dynamicHeight={false}
        maxHeight="screen"
        containerVariants={{
          variant: 'fullscreen',
        }}
        contentVariants={{
          variant: 'ghost',
          className: 'bg-black',
        }}
        closeClassName="dark absolute right-10 top-8"
        trigger={
          <Button size="none" variant="ghost" className="relative">
            <Text className="h-16 w-16 flex items-center justify-center">
              <LogoMenuIcon />
            </Text>
          </Button>
        }
      >
        <div className="dark bg-black flex flex-col items-start justify-center h-full py-10 px-6 mx-auto md:py-20 xl:ml-32 2xl:ml-40 xl:pt-32 w-full max-w-screen-lg">
          <SiteMap menuSections={menuSections} onClick={() => setOpen(false)} />
          <div className="flex mt-20 mb-20">
            <ThemeRadio
              className="dark"
              tooltipClassName="dark"
              tabIndex={-1}
            />
          </div>
        </div>
      </Dialog>
    </div>
  )
}
