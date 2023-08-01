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
  Switch,
  Wikis16,
  Tooltip,
} from '@siafoundation/design-system'
import { cx } from 'class-variance-authority'
import { useAppSettings } from '@siafoundation/react-core'

export type MenuSection = {
  title: string
  links: LinkData[]
}

type Props = {
  menuSections: MenuSection[]
}

export function SiteMenu({ menuSections }: Props) {
  const [open, setOpen] = useState<boolean>(false)
  const { gpu } = useAppSettings()

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
      closeClassName="hidden"
      trigger={
        <Button
          size="small"
          variant="ghost"
          className="relative !p-0"
          icon="contrast"
        >
          <MenuIcon />
        </Button>
      }
    >
      <div className="dark">
        <div className="absolute bg-black z-10 top-0 left-0 right-0 h-[100px] border-b-2 border-graydark-400/20">
          <Container
            size="4"
            className="flex gap-6 md:gap-10 items-center h-full"
          >
            <Logo size={35} />
            <div className="flex-1" />
            <Tooltip
              side="bottom"
              content={
                gpu.canGpuRender
                  ? gpu.isGpuEnabled
                    ? 'Interactive host map is currently enabled.'
                    : 'Interactive host map is currently disabled.'
                  : 'Browser does not support interactive host map.'
              }
            >
              <div>
                <Switch
                  tabIndex={-1}
                  disabled={!gpu.canGpuRender}
                  checked={gpu.canGpuRender && gpu.isGpuEnabled}
                  onCheckedChange={gpu.setIsGpuEnabled}
                >
                  <Wikis16 />
                </Switch>
              </div>
            </Tooltip>
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
