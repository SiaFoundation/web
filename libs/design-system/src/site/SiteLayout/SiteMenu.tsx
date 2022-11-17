import { useState } from 'react'
import { LogoMenuIcon } from '../../icons/LogoMenuIcon'
import { LinkData } from '../../lib/links'
import { SiteMap } from '../SiteMap'
import { ThemeRadio } from '../../components/ThemeRadio'
import { Dialog } from '../../core/Dialog'
import { Text } from '../../core/Text'

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
          <div className="relative cursor-pointer">
            <Text className="h-16 w-16 inline-flex">
              <LogoMenuIcon />
            </Text>
          </div>
        }
      >
        <div className="dark bg-black flex flex-col items-start justify-center h-full py-10 px-6 mx-auto md:py-20 xl:ml-32 2xl:ml-40 xl:pt-32 w-full max-w-screen-lg">
          <SiteMap menuSections={menuSections} onClick={() => setOpen(false)} />
          <div className="flex mt-20">
            <ThemeRadio tabIndex={-1} />
          </div>
        </div>
      </Dialog>
    </div>
  )
}
