import { Flex, Section, Skeleton } from '@siafoundation/design-system'
import { SectionHeading } from '../components/SectionHeading'
import { SmallSection } from '../components/SmallSection'
import { SubsectionHeading } from '../components/SubsectionHeading'

export function Skeletons() {
  return (
    <>
      <Section size="1">
        <SectionHeading>Skeletons</SectionHeading>
      </Section>
      <Section>
        <SubsectionHeading>Skeleton</SubsectionHeading>
        <Flex direction="column" gap="5" align="stretch">
          <SmallSection>Avatar</SmallSection>
          <Flex
            css={{
              ai: 'center',
              gap: '$1',
              fw: 'wrap',
            }}
          >
            <Skeleton variant="avatar1" />
            <Skeleton variant="avatar2" />
            <Skeleton variant="avatar3" />
          </Flex>
          <SmallSection>Text</SmallSection>
          <Flex
            css={{
              fd: 'column',
              gap: '$4',
              mb: '$3',
            }}
          >
            <Skeleton variant="title" css={{ width: '50%' }} />
            <Skeleton variant="heading" css={{ width: '25%' }} />
          </Flex>
          <Flex
            css={{
              fd: 'column',
              gap: '$4',
            }}
          >
            <Skeleton variant="text" css={{ width: '30%' }} />
            <Skeleton variant="text" css={{ width: '75%' }} />
            <Skeleton variant="text" css={{ width: '50%' }} />
          </Flex>
          <SmallSection>Button</SmallSection>
          <Flex
            css={{
              gap: '$2',
            }}
          >
            <Skeleton variant="button" />
            <Skeleton variant="button" />
            <Skeleton variant="button" />
          </Flex>
        </Flex>
      </Section>
    </>
  )
}
