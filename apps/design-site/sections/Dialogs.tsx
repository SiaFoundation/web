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
              <DialogContent
                css={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '$2',
                  maxWidth: '400px',
                }}
              >
                <DialogTitle>Title</DialogTitle>
                <DialogDescription>
                  Description - Lorem ipsum dolor sit amet, consectetur
                  adipisicing elit. Non quia facere ad totam veritatis iure
                  nesciunt provident quos vel reiciendis laboriosam corporis
                  debitis, maiores rerum ab nobis quaerat consectetur
                  asperiores?
                </DialogDescription>
                <DialogClose asChild>
                  <Button>Close</Button>
                </DialogClose>
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
              <AlertDialogContent
                css={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '$2',
                  maxWidth: '400px',
                }}
              >
                <AlertDialogTitle>Title</AlertDialogTitle>
                <AlertDialogDescription>
                  Description - Lorem ipsum dolor sit amet consectetur
                  adipisicing elit. Exercitationem dolor voluptates ipsum labore
                  architecto. Aperiam delectus illum earum commodi. Quod
                  repellendus veniam a dolore aspernatur inventore sit quae ad
                  deserunt.
                </AlertDialogDescription>
                <Flex gap="1" justify="end" css={{ width: '100%' }}>
                  <AlertDialogCancel asChild>
                    <Button>nvm, cancel</Button>
                  </AlertDialogCancel>
                  <AlertDialogAction asChild>
                    <Button variant="accent">Action</Button>
                  </AlertDialogAction>
                </Flex>
              </AlertDialogContent>
            </AlertDialogPortal>
          </AlertDialog>
        </Box>
      </Section>
    </>
  )
}
