import {
  ContentBlock,
  ContentCard,
  ContentGallery,
  ContentLi,
  CtaBox,
  Flex,
  Grid,
  Section,
} from '@siafoundation/design-system'
import { times } from 'lodash'
import { SectionHeading } from '../components/SectionHeading'
import { SmallSection } from '../components/SmallSection'
import { SubsectionHeading } from '../components/SubsectionHeading'

export function Site() {
  return (
    <Section>
      <SectionHeading>ContentBlock</SectionHeading>
      <Section>
        <SubsectionHeading> size 1</SubsectionHeading>
        <Flex direction="column" gap="2">
          <ContentBlock
            size="1"
            title="Title"
            description={`
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iste, qui!
            `}
            links={[
              {
                title: 'Urbit',
                link: 'https://urbit.org',
                newTab: true,
              },
              {
                title: 'Scuttlebutt',
                link: 'https://ssbc.github.io/scuttlebutt-protocol-guide/',
                newTab: true,
              },
            ]}
          />
        </Flex>
      </Section>
      <Section>
        <SubsectionHeading>size 2</SubsectionHeading>
        <Flex direction="column" gap="2">
          <ContentBlock
            size="2"
            title="Title"
            description={`
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iste, qui!
            `}
            links={[
              {
                title: 'Urbit',
                link: 'https://urbit.org',
                newTab: true,
              },
              {
                title: 'Scuttlebutt',
                link: 'https://ssbc.github.io/scuttlebutt-protocol-guide/',
                newTab: true,
              },
            ]}
          />
        </Flex>
      </Section>
      <Section>
        <SubsectionHeading>size 3</SubsectionHeading>
        <Flex direction="column" gap="2">
          <ContentBlock
            size="3"
            title="Title"
            description={`
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iste, qui!
            `}
            links={[
              {
                title: 'Urbit',
                link: 'https://urbit.org',
                newTab: true,
              },
              {
                title: 'Scuttlebutt',
                link: 'https://ssbc.github.io/scuttlebutt-protocol-guide/',
                newTab: true,
              },
            ]}
          />
        </Flex>
      </Section>
      <SectionHeading>ContentCard</SectionHeading>
      <Section>
        <Grid
          gap="2"
          columns={{
            '@initial': 1,
            '@bp1': 2,
            '@bp3': 3,
          }}
        >
          <ContentCard
            title="Title"
            subtitle="Subtitle"
            description={`
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iste, qui!
            `}
            link={'https://urbit.org'}
            newTab
          />
        </Grid>
      </Section>
      <SectionHeading>ContentLi</SectionHeading>
      <Section>
        <Grid
          gap="2"
          columns={{
            '@initial': 1,
            '@bp1': 2,
            '@bp3': 3,
          }}
        >
          <ContentLi
            title="Title"
            subtitle="Subtitle"
            description={`
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iste, qui!
            `}
            link={'https://urbit.org'}
            newTab
          />
        </Grid>
      </Section>
      <SectionHeading>ContentGallery</SectionHeading>
      <Section>
        <SubsectionHeading>variant list</SubsectionHeading>
        <ContentGallery
          title="Title"
          subtitle="Subtitle"
          description={`
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iste, qui!
            `}
          links={[
            {
              title: 'Urbit',
              link: 'https://urbit.org',
              newTab: true,
            },
            {
              title: 'Scuttlebutt',
              link: 'https://ssbc.github.io/scuttlebutt-protocol-guide/',
              newTab: true,
            },
          ]}
          filterable="variant-list"
          items={times(6, (i) => ({
            title: `Title ${i + 1}`,
            subtitle: 'Subtitle',
            tags: [`group_${(i % 3) + 1}`],
            description: `
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iste, qui!
                `,
            link: 'https://urbit.org',
            newTab: true,
          }))}
        />
      </Section>
      <Section>
        <SubsectionHeading>variant card</SubsectionHeading>
        <ContentGallery
          title="Title"
          subtitle="Subtitle"
          description={`
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iste, qui!
            `}
          links={[
            {
              title: 'Urbit',
              link: 'https://urbit.org',
              newTab: true,
            },
            {
              title: 'Scuttlebutt',
              link: 'https://ssbc.github.io/scuttlebutt-protocol-guide/',
              newTab: true,
            },
          ]}
          filterable="variant-card"
          variant="card"
          items={times(6, (i) => ({
            title: `Title ${i + 1}`,
            subtitle: 'Subtitle',
            tags: [`group_${(i % 3) + 1}`],
            description: `
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iste, qui!
                `,
            link: 'https://urbit.org',
            newTab: true,
          }))}
        />
      </Section>
      <SectionHeading>CtaBox</SectionHeading>
      <Section>
        <SubsectionHeading>size 1</SubsectionHeading>
        <CtaBox
          title="Title"
          description={`
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iste, qui!
          `}
          actionTitle="Urbit"
          actionLink="https://urbit.org"
          actionNewTab
        />
      </Section>
      <Section>
        <SubsectionHeading>size 2</SubsectionHeading>
        <CtaBox
          title="Title"
          size="2"
          description={`
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iste, qui!
          `}
          actionTitle="Urbit"
          actionLink="https://urbit.org"
          actionNewTab
        />
      </Section>
    </Section>
  )
}
