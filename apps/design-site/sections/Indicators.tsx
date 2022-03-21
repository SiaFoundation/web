import {
  Alert,
  Badge,
  Box,
  Flex,
  Grid,
  Heading,
  ProgressBar,
  Section,
  Text,
} from '@siafoundation/design-system'
import { SectionHeading } from '../components/SectionHeading'
import { SubsectionHeading } from '../components/SubsectionHeading'

export function Indicators() {
  return (
    <>
      <Section size="1">
        <SectionHeading>Indicators</SectionHeading>
      </Section>
      <Section>
        <SubsectionHeading>Alert</SubsectionHeading>
        <Flex direction="column" gap="2" align="stretch">
          <Alert variant="gray">
            <Text>Announcement, neural implants now available.</Text>
          </Alert>
          <Alert variant="green">
            <Text>Announcement, neural implants now available.</Text>
          </Alert>
          <Alert variant="red">
            <Text>Announcement, all jetpacks are being recalled.</Text>
          </Alert>
          <Alert variant="loContrast">
            <Text>Announcement, neural implants now available.</Text>
          </Alert>
          <Alert variant="red">
            <Heading>
              Announcement, neural implants no longer available.
            </Heading>
          </Alert>
        </Flex>
      </Section>
      <Section>
        <SubsectionHeading>ProgressBar</SubsectionHeading>
        <Grid columns="3" gap="3">
          <Box>
            <ProgressBar value={50} variant="gray" />
          </Box>
          <Box>
            <ProgressBar value={25} variant="green" />
          </Box>
          <Box>
            <ProgressBar value={75} variant="gradient" />
          </Box>
        </Grid>
      </Section>
      <Section>
        <SubsectionHeading>Badge</SubsectionHeading>
        <Flex direction="column" gap="3">
          <Flex direction="row" gap="1" wrap="wrap">
            <Badge variant="accent">Accent</Badge>
            <Badge variant="simple">Simple</Badge>
            <Badge variant="gold">Gold</Badge>
            <Badge variant="gray">Gray</Badge>
            <Badge variant="indigo">Indigo</Badge>
            <Badge variant="lime">Lime</Badge>
            <Badge variant="orange">Orange</Badge>
            <Badge variant="pink">Pink</Badge>
            <Badge variant="purple">Purple</Badge>
            <Badge variant="green">Green</Badge>
            <Badge variant="red">Red</Badge>
            <Badge variant="teal">Teal</Badge>
            <Badge variant="violet">Violet</Badge>
            <Badge variant="yellow">Yellow</Badge>
          </Flex>
          <Flex direction="row" gap="1" wrap="wrap">
            <Badge flat variant="accent">
              Accent
            </Badge>
            <Badge flat variant="simple">
              Simple
            </Badge>
            <Badge flat variant="gold">
              Gold
            </Badge>
            <Badge flat variant="gray">
              Gray
            </Badge>
            <Badge flat variant="indigo">
              Indigo
            </Badge>
            <Badge flat variant="lime">
              Lime
            </Badge>
            <Badge flat variant="orange">
              Orange
            </Badge>
            <Badge flat variant="pink">
              Pink
            </Badge>
            <Badge flat variant="purple">
              Purple
            </Badge>
            <Badge flat variant="green">
              Green
            </Badge>
            <Badge flat variant="red">
              Red
            </Badge>
            <Badge flat variant="teal">
              Teal
            </Badge>
            <Badge flat variant="violet">
              Violet
            </Badge>
            <Badge flat variant="yellow">
              Yellow
            </Badge>
          </Flex>
        </Flex>
      </Section>
      <Section>
        <SubsectionHeading>Badge - interactive</SubsectionHeading>
        <Flex direction="row" gap="1" wrap="wrap">
          <Badge interactive variant="accent">
            Accent
          </Badge>
          <Badge interactive variant="simple">
            Outline
          </Badge>
          <Badge interactive variant="gold">
            Gold
          </Badge>
          <Badge interactive variant="gray">
            Gray
          </Badge>
          <Badge interactive variant="indigo">
            Indigo
          </Badge>
          <Badge interactive variant="lime">
            Lime
          </Badge>
          <Badge interactive variant="green">
            Green
          </Badge>
          <Badge interactive variant="orange">
            Orange
          </Badge>
          <Badge interactive variant="pink">
            Pink
          </Badge>
          <Badge interactive variant="purple">
            Purple
          </Badge>
          <Badge interactive variant="red">
            Red
          </Badge>
          <Badge interactive variant="teal">
            Teal
          </Badge>
          <Badge interactive variant="violet">
            Violet
          </Badge>
          <Badge interactive variant="yellow">
            Yellow
          </Badge>
        </Flex>
      </Section>
    </>
  )
}
