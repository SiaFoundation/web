import { DialogPortal } from '@radix-ui/react-dialog'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogOverlay,
  AlertDialogPortal,
  AlertDialogTitle,
  AlertDialogTrigger,
  Box,
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogControls,
  DialogDescription,
  DialogOverlay,
  DialogTitle,
  DialogTrigger,
  Flex,
  Section,
} from '@siafoundation/design-system'
import { SectionHeading } from '../components/SectionHeading'
import { SubsectionHeading } from '../components/SubsectionHeading'

export function Dialogs() {
  return (
    <>
      <Section size="1">
        <SectionHeading>Dialogs</SectionHeading>
      </Section>
      <Section>
        <SubsectionHeading>Dialog</SubsectionHeading>
        <Box>
          <Dialog>
            <DialogTrigger asChild>
              <Button>Dialog</Button>
            </DialogTrigger>
            <DialogPortal>
              <DialogOverlay />
              <DialogContent>
                <DialogTitle>Privacy</DialogTitle>
                <DialogDescription>
                  This app uses the following third-party APIs, all external
                  APIs are not required and can be toggled on or off.
                </DialogDescription>
                <DialogControls>
                  <DialogClose asChild>
                    <Button>Close</Button>
                  </DialogClose>
                </DialogControls>
              </DialogContent>
            </DialogPortal>
          </Dialog>
        </Box>
      </Section>
      <Section>
        <SubsectionHeading>AlertDialog</SubsectionHeading>
        <Box>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button>Alert Dialog</Button>
            </AlertDialogTrigger>
            <AlertDialogPortal>
              <AlertDialogOverlay />
              <AlertDialogContent>
                <AlertDialogTitle>Title</AlertDialogTitle>
                <AlertDialogDescription>
                  Description - Lorem ipsum dolor sit amet consectetur
                  adipisicing elit. Exercitationem dolor voluptates ipsum labore
                  architecto. Aperiam delectus illum earum commodi. Quod
                  repellendus veniam a dolore aspernatur inventore sit quae ad
                  deserunt.
                </AlertDialogDescription>
                <DialogControls>
                  <AlertDialogCancel asChild>
                    <Button>nvm, cancel</Button>
                  </AlertDialogCancel>
                  <AlertDialogAction asChild>
                    <Button variant="accent">Action</Button>
                  </AlertDialogAction>
                </DialogControls>
              </AlertDialogContent>
            </AlertDialogPortal>
          </AlertDialog>
        </Box>
      </Section>
    </>
  )
}
