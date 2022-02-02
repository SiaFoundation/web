import {
  Alert,
  Badge,
  Banner,
  Button,
  Flex,
  Heading,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Section,
  Text,
  TextField,
  Tooltip,
} from '@siafoundation/design-system'
import { SectionHeading } from '../components/SectionHeading'
import { SubsectionHeading } from '../components/SubsectionHeading'

function Content() {
  return (
    <Flex direction="column" gap="1" css={{ p: '$3' }}>
      <Heading>Hey there</Heading>
      <Text>
        Be sure to read the user manual before operating machinery like this
        button.
      </Text>
    </Flex>
  )
}

export function Popups() {
  return (
    <Section>
      <SectionHeading>Popups</SectionHeading>
      <Section>
        <SubsectionHeading>Popover</SubsectionHeading>
        <Text css={{ pb: '$3' }}>Click to see Popover</Text>
        <Flex direction="row" gap="2" align="center">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="green">Start aligned</Button>
            </PopoverTrigger>
            <PopoverContent align="start">
              <Content />
            </PopoverContent>
          </Popover>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="green">Center aligned</Button>
            </PopoverTrigger>
            <PopoverContent align="center">
              <Content />
            </PopoverContent>
          </Popover>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="green">End aligned</Button>
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
            <Badge variant="green">Start aligned</Badge>
          </Tooltip>
          <Tooltip align="center" content="Center aligned">
            <Badge variant="green">Center aligned</Badge>
          </Tooltip>
          <Tooltip align="end" content="End aligned">
            <Badge variant="green">End aligned</Badge>
          </Tooltip>
        </Flex>
      </Section>
    </Section>
  )
}
