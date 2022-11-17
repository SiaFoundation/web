import {
  Badge,
  Button,
  Heading,
  Paragraph,
  Popover,
  Section,
  Text,
  Tooltip,
} from '@siafoundation/design-system'
import { SectionHeading } from '../components/SectionHeading'
import { SubsectionHeading } from '../components/SubsectionHeading'

function Content() {
  return (
    <div className="flex flex-col gap-2 p-4">
      <Heading>Hey there</Heading>
      <Paragraph size="18">
        Be sure to read the user manual before operating machinery like this
        button.
      </Paragraph>
    </div>
  )
}

export function Popups() {
  return (
    <>
      <Section>
        <SectionHeading>Popups</SectionHeading>
        <SubsectionHeading>Popover</SubsectionHeading>
        <Text className="pb-6">Click to see Popover</Text>
        <div className="flex gap-4 items-center">
          <Popover
            trigger={<Button variant="accent">Start aligned</Button>}
            contentProps={{
              align: 'start',
            }}
          >
            <Content />
          </Popover>
          <Popover
            trigger={<Button variant="accent">Center aligned</Button>}
            contentProps={{
              align: 'center',
            }}
          >
            <Content />
          </Popover>
          <Popover
            trigger={<Button variant="accent">End aligned</Button>}
            contentProps={{
              align: 'end',
            }}
          >
            <Content />
          </Popover>
        </div>
      </Section>
      <Section>
        <SubsectionHeading>Tooltip</SubsectionHeading>
        <Text className="pb-6">Hover to see Tooltip</Text>
        <div className="flex gap-4">
          <Tooltip align="start" content="Start aligned">
            <Badge variant="accent">Start aligned</Badge>
          </Tooltip>
          <Tooltip align="center" content="Center aligned">
            <Badge variant="accent">Center aligned</Badge>
          </Tooltip>
          <Tooltip align="end" content="End aligned">
            <Badge variant="accent">End aligned</Badge>
          </Tooltip>
        </div>
      </Section>
    </>
  )
}
