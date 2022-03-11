import {
  Badge,
  Button,
  Flex,
  Heading,
  Paragraph,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Section,
  Text,
  Tooltip,
} from '@siafoundation/design-system'
import { SectionHeading } from '../components/SectionHeading'
import { SubsectionHeading } from '../components/SubsectionHeading'

function Content() {
  return (
    <Flex direction="column" gap="1" css={{ p: '$3' }}>
      <Heading>Hey there</Heading>
      <Paragraph size="1">
        Be sure to read the user manual before operating machinery like this
        button.
      </Paragraph>
    </Flex>
  )
}

export function Popups() {
  return (
    <>
      <Section size="1">
        <SectionHeading>Popups</SectionHeading>
      </Section>
      <Section>
        <SubsectionHeading>Popover</SubsectionHeading>
        <Text css={{ pb: '$3' }}>Click to see Popover</Text>
        <Flex direction="row" gap="2" align="center">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="accent">Start aligned</Button>
            </PopoverTrigger>
            <PopoverContent align="start">
              <Content />
            </PopoverContent>
          </Popover>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="accent">Center aligned</Button>
            </PopoverTrigger>
            <PopoverContent align="center">
              <Content />
            </PopoverContent>
          </Popover>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="accent">End aligned</Button>
            </PopoverTrigger>
            <PopoverContent align="end">
              <Content />
            </PopoverContent>
          </Popover>
        </Flex>
      </Section>
      <Section>
        <SubsectionHeading>Tooltip</SubsectionHeading>
        <Text css={{ pb: '$3' }}>Hover to see Tooltip</Text>
        <Flex direction="row" gap="2">
          <Tooltip align="start" content="Start aligned">
            <Badge variant="accent">Start aligned</Badge>
          </Tooltip>
          <Tooltip align="center" content="Center aligned">
            <Badge variant="accent">Center aligned</Badge>
          </Tooltip>
          <Tooltip align="end" content="End aligned">
            <Badge variant="accent">End aligned</Badge>
          </Tooltip>
        </Flex>
      </Section>
    </>
  )
}
