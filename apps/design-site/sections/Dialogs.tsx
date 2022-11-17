import {
  Button,
  Dialog,
  DialogClose,
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
      <Section className="pt-24">
        <SectionHeading>Dialogs</SectionHeading>
      </Section>
      <Section className="pt-20">
        <SubsectionHeading>Dialog</SubsectionHeading>
        <div className="flex gap-2">
          <Dialog
            trigger={<Button>Dialog</Button>}
            title="Privacy"
            description={
              <>
                This app uses the following third-party APIs, all external APIs
                are not required and can be toggled on or off.
              </>
            }
            controls={
              <div className="flex justify-end">
                <DialogClose asChild>
                  <Button>Close</Button>
                </DialogClose>
              </div>
            }
          ></Dialog>
          <Dialog
            trigger={<Button>Dialog scroll</Button>}
            title="Privacy"
            description="This is the description"
            controls={
              <div className="flex gap-2 justify-end">
                <Button size="medium" variant="gray">
                  cancel
                </Button>
                <Button size="medium" variant="accent" type="submit">
                  submit
                </Button>
              </div>
            }
          >
            {times(30, (i) => (
              <Paragraph size="14" key={i}>
                This app uses the following third-party APIs, all external APIs
                are not required and can be toggled on or off.
              </Paragraph>
            ))}
          </Dialog>
          <Dialog
            trigger={<Button>Dialog no desc or controls</Button>}
            title="Dialog"
          >
            <Paragraph>
              This app uses the following third-party APIs, all external APIs
              are not required and can be toggled on or off.
            </Paragraph>
          </Dialog>
          <Dialog
            trigger={<Button>Dialog no desc or controls overflow</Button>}
            title="Dialog"
          >
            {times(10, (i) => (
              <Paragraph key={i}>
                This app uses the following third-party APIs, all external APIs
                are not required and can be toggled on or off.
              </Paragraph>
            ))}
          </Dialog>
          <Dialog
            trigger={<Button>Dialog wide</Button>}
            title="Dialog"
            contentVariants={{
              className: 'max-w-[800px]',
            }}
          >
            {times(10, (i) => (
              <Paragraph key={i}>
                This app uses the following third-party APIs, all external APIs
                are not required and can be toggled on or off.
              </Paragraph>
            ))}
          </Dialog>
          <Dialog
            open={open}
            onOpenChange={(val) => setOpen(val)}
            trigger={<Button>Dialog controlled</Button>}
            title="Dialog"
          >
            {times(10, (i) => (
              <Paragraph key={i}>
                This app uses the following third-party APIs, all external APIs
                are not required and can be toggled on or off.
              </Paragraph>
            ))}
          </Dialog>
        </div>
      </Section>
    </>
  )
}
