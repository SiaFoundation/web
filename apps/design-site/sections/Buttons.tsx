import { MagnifyingGlassIcon } from '@radix-ui/react-icons'
import {
  Button,
  Flex,
  Grid,
  IconButton,
  Section,
} from '@siafoundation/design-system'
import { SectionHeading } from '../components/SectionHeading'
import { SmallSection } from '../components/SmallSection'
import { SubsectionHeading } from '../components/SubsectionHeading'

export function Buttons() {
  return (
    <Section>
      <SectionHeading>Buttons</SectionHeading>
      <Section>
        <SubsectionHeading>Button - sizes</SubsectionHeading>
        <Flex direction="column" gap="2">
          <Flex direction="row" gap="1">
            <Button variant="green">Green</Button>
            <Button variant="gray">Gray</Button>
            <Button variant="red">Red</Button>
            <Button ghost variant="green">
              Green
            </Button>
            <Button ghost variant="gray">
              Gray
            </Button>
            <Button ghost variant="red">
              Red
            </Button>
          </Flex>
          <Flex direction="row" gap="1">
            <Button size="2" variant="green">
              Green
            </Button>
            <Button size="2" variant="gray">
              Gray
            </Button>
            <Button size="2" variant="red">
              Red
            </Button>
          </Flex>
          <Flex direction="row" gap="1">
            <Button size="3" variant="green">
              Green
            </Button>
            <Button size="3" variant="gray">
              Gray
            </Button>
            <Button size="3" variant="red">
              Red
            </Button>
          </Flex>
        </Flex>
      </Section>
      <Section>
        <SubsectionHeading>Button - states</SubsectionHeading>
        <Flex direction="column" gap="3">
          <SmallSection>default</SmallSection>
          <Flex direction="row" gap="1">
            <Button variant="green">Green</Button>
            <Button variant="gray">Gray</Button>
            <Button variant="red">Red</Button>
            <Button ghost variant="green">
              Green
            </Button>
            <Button ghost variant="gray">
              Gray
            </Button>
            <Button ghost variant="red">
              Red
            </Button>
          </Flex>
          <SmallSection>waiting</SmallSection>
          <Flex direction="row" gap="1">
            <Button state="waiting" variant="green">
              Green
            </Button>
            <Button state="waiting" variant="gray">
              Gray
            </Button>
            <Button state="waiting" variant="red">
              Red
            </Button>
            <Button state="waiting" ghost variant="green">
              Green
            </Button>
            <Button state="waiting" ghost variant="gray">
              Gray
            </Button>
            <Button state="waiting" ghost variant="red">
              Red
            </Button>
          </Flex>
          <SmallSection>disabled</SmallSection>
          <Flex direction="row" gap="1">
            <Button disabled state="waiting" variant="green">
              Green
            </Button>
            <Button disabled state="waiting" variant="gray">
              Gray
            </Button>
            <Button disabled state="waiting" variant="red">
              Red
            </Button>
            <Button disabled state="waiting" ghost variant="green">
              Green
            </Button>
            <Button disabled state="waiting" ghost variant="gray">
              Gray
            </Button>
            <Button disabled state="waiting" ghost variant="red">
              Red
            </Button>
          </Flex>
        </Flex>
      </Section>
      <Section>
        <SubsectionHeading>IconButton</SubsectionHeading>
        <Grid columns={{ '@initial': 1, '@bp1': 2 }} gap="2">
          <Flex direction="row" gap="1">
            <IconButton size="1" variant="ghost">
              <MagnifyingGlassIcon />
            </IconButton>
            <IconButton size="2" state="active" variant="ghost">
              <MagnifyingGlassIcon />
            </IconButton>
            <IconButton size="3" state="waiting" variant="ghost">
              <MagnifyingGlassIcon />
            </IconButton>
            <IconButton size="4" disabled variant="ghost">
              <MagnifyingGlassIcon />
            </IconButton>
          </Flex>
          <Flex direction="row" gap="1">
            <IconButton size="1" variant="raised">
              <MagnifyingGlassIcon />
            </IconButton>
            <IconButton size="2" state="active" variant="raised">
              <MagnifyingGlassIcon />
            </IconButton>
            <IconButton size="3" state="waiting" variant="raised">
              <MagnifyingGlassIcon />
            </IconButton>
            <IconButton size="4" disabled variant="raised">
              <MagnifyingGlassIcon />
            </IconButton>
          </Flex>
        </Grid>
      </Section>
    </Section>
  )
}
