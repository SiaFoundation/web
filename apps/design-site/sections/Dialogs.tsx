import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTrigger,
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
  Flex,
  Paragraph,
  Section,
} from '@siafoundation/design-system'
import { times } from 'lodash'
import { useState } from 'react'
import { SectionHeading } from '../components/SectionHeading'
import { SubsectionHeading } from '../components/SubsectionHeading'

export function Dialogs() {
  const [open, setOpen] = useState<boolean>(false)

  return (
    <>
      <Section size="1">
        <SectionHeading>Dialogs</SectionHeading>
      </Section>
      <Section>
        <SubsectionHeading>Dialog</SubsectionHeading>
        <Flex gap="1">
          <Dialog>
            <DialogTrigger asChild>
              <Button>Dialog</Button>
            </DialogTrigger>
            <DialogContent
              title="Privacy"
              description={
                <>
                  This app uses the following third-party APIs, all external
                  APIs are not required and can be toggled on or off.
                </>
              }
              controls={
                <Flex justify="end">
                  <DialogClose asChild>
                    <Button>Close</Button>
                  </DialogClose>
                </Flex>
              }
            />
          </Dialog>
          <Dialog>
            <DialogTrigger asChild>
              <Button>Dialog sroll</Button>
            </DialogTrigger>
            <DialogContent
              variant="form"
              title="Privacy"
              description="This is the description"
              controls={
                <Flex gap="1" justify="end">
                  <Button size="2" variant="gray">
                    cancel
                  </Button>
                  <Button size="2" variant="accent" type="submit">
                    submit
                  </Button>
                </Flex>
              }
            >
              {times(10, (i) => (
                <Paragraph key={i}>
                  This app uses the following third-party APIs, all external
                  APIs are not required and can be toggled on or off.
                </Paragraph>
              ))}
            </DialogContent>
          </Dialog>
          <Dialog>
            <DialogTrigger asChild>
              <Button>Dialog no desc or controls</Button>
            </DialogTrigger>
            <DialogContent title="Dialog">
              <Paragraph>
                This app uses the following third-party APIs, all external APIs
                are not required and can be toggled on or off.
              </Paragraph>
            </DialogContent>
          </Dialog>
          <Dialog>
            <DialogTrigger asChild>
              <Button>Dialog no desc or controls overflow</Button>
            </DialogTrigger>
            <DialogContent title="Dialog">
              {times(10, (i) => (
                <Paragraph key={i}>
                  This app uses the following third-party APIs, all external
                  APIs are not required and can be toggled on or off.
                </Paragraph>
              ))}
            </DialogContent>
          </Dialog>
          <Dialog>
            <DialogTrigger asChild>
              <Button>Dialog wide</Button>
            </DialogTrigger>
            <DialogContent
              title="Dialog"
              css={{
                maxWidth: '800px',
              }}
            >
              {times(10, (i) => (
                <Paragraph key={i}>
                  This app uses the following third-party APIs, all external
                  APIs are not required and can be toggled on or off.
                </Paragraph>
              ))}
            </DialogContent>
          </Dialog>
          <Dialog open={open} onOpenChange={(val) => setOpen(val)}>
            <DialogTrigger asChild>
              <Button>Dialog controlled</Button>
            </DialogTrigger>
            <DialogContent title="Dialog">
              {times(10, (i) => (
                <Paragraph key={i}>
                  This app uses the following third-party APIs, all external
                  APIs are not required and can be toggled on or off.
                </Paragraph>
              ))}
            </DialogContent>
          </Dialog>
        </Flex>
      </Section>
      <Section>
        <SubsectionHeading>AlertDialog</SubsectionHeading>
        <Flex gap="2">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button>Alert Dialog</Button>
            </AlertDialogTrigger>
            <AlertDialogContent
              title="Title"
              description={
                <>
                  Description - Lorem ipsum dolor sit amet consectetur
                  adipisicing elit. Exercitationem dolor voluptates ipsum labore
                  architecto. Aperiam delectus illum earum commodi. Quod
                  repellendus veniam a dolore aspernatur inventore sit quae ad
                  deserunt.
                </>
              }
              cancel={<Button>nvm, cancel</Button>}
              action={<Button variant="accent">Action</Button>}
            />
          </AlertDialog>
        </Flex>
      </Section>
    </>
  )
}
