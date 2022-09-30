import {
  Button,
  Flex,
  Grid,
  IconButton,
  Section,
  Search16,
} from '@siafoundation/design-system'
import { SectionHeading } from '../components/SectionHeading'
import { SmallSection } from '../components/SmallSection'
import { SubsectionHeading } from '../components/SubsectionHeading'

export function Buttons() {
  return (
    <>
      <Section py="1">
        <SectionHeading>Buttons</SectionHeading>
      </Section>
      <Section>
        <SubsectionHeading>Button - sizes</SubsectionHeading>
        <Flex direction="column" gap="2">
          <Flex direction="row" gap="1">
            <Button variant="accent">Green</Button>
            <Button variant="gray">Gray</Button>
            <Button variant="red">Red</Button>
            <Button ghost variant="accent">
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
            <Button size="2" variant="accent">
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
            <Button size="3" variant="accent">
              Green
            </Button>
            <Button size="3" variant="gray">
              Gray
            </Button>
            <Button size="3" variant="red">
              Red
            </Button>
          </Flex>
          <Flex direction="row" gap="1">
            <Button size="2" site variant="accent">
              Green
            </Button>
            <Button size="2" site variant="gray">
              Gray
            </Button>
            <Button size="2" site variant="red">
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
            <Button variant="accent">Green</Button>
            <Button variant="gray">Gray</Button>
            <Button variant="red">Red</Button>
            <Button ghost variant="accent">
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
            <Button state="waiting" variant="accent">
              Green
            </Button>
            <Button state="waiting" variant="gray">
              Gray
            </Button>
            <Button state="waiting" variant="red">
              Red
            </Button>
            <Button state="waiting" ghost variant="accent">
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
            <Button disabled state="waiting" variant="accent">
              Green
            </Button>
            <Button disabled state="waiting" variant="gray">
              Gray
            </Button>
            <Button disabled state="waiting" variant="red">
              Red
            </Button>
            <Button disabled state="waiting" ghost variant="accent">
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
            <IconButton size="1">
              <Search16 />
            </IconButton>
            <IconButton size="2">
              <Search16 />
            </IconButton>
            <IconButton size="3" disabled>
              <Search16 />
            </IconButton>
          </Flex>
          <Flex direction="row" gap="1">
            <IconButton variant="gray" size="1">
              <Search16 />
            </IconButton>
            <IconButton variant="gray" size="2">
              <Search16 />
            </IconButton>
            <IconButton variant="gray" size="3" disabled>
              <Search16 />
            </IconButton>
          </Flex>
          <Flex direction="row" gap="1">
            <IconButton variant="state" size="1">
              <Search16 />
            </IconButton>
            <IconButton variant="state" size="2">
              <Search16 />
            </IconButton>
            <IconButton variant="state" size="3" disabled>
              <Search16 />
            </IconButton>
          </Flex>
        </Grid>
      </Section>
    </>
  )
}
