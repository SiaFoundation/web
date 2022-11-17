import { Section, Skeleton } from '@siafoundation/design-system'
import { SectionHeading } from '../components/SectionHeading'
import { SmallSection } from '../components/SmallSection'
import { SubsectionHeading } from '../components/SubsectionHeading'

export function Skeletons() {
  return (
    <>
      <Section>
        <SectionHeading>Skeletons</SectionHeading>
        <SubsectionHeading>Skeleton</SubsectionHeading>
        <div className="flex flex-col gap-10 items-stretch">
          <SmallSection>Text</SmallSection>
          <div className="flex flex-col gap-4 mb-6">
            <Skeleton variant="text" className="w-[50%]" />
            <Skeleton variant="text" className="w-[25%]" />
          </div>
          <div className="flex flex-col gap-4">
            <Skeleton variant="text" className="w-[30%]" />
            <Skeleton variant="text" className="w-[75%]" />
            <Skeleton variant="text" className="w-[50%]" />
          </div>
        </div>
      </Section>
    </>
  )
}
