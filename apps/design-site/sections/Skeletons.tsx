import { Section, Skeleton } from '@siafoundation/design-system'
import { SectionHeading } from '../components/SectionHeading'
import { SubsectionHeading } from '../components/SubsectionHeading'

export function Skeletons() {
  return (
    <>
      <Section>
        <SectionHeading>Skeletons</SectionHeading>
        <SubsectionHeading>Text</SubsectionHeading>
        <div className="flex flex-col gap-10 items-stretch">
          <div className="flex flex-col gap-4 mb-6">
            <Skeleton className="h-6 w-[50%]" />
            <Skeleton className="h-6 w-[25%]" />
          </div>
          <div className="flex flex-col gap-4">
            <Skeleton className="h-6 w-[30%]" />
            <Skeleton className="h-6 w-[75%]" />
            <Skeleton className="h-6 w-[50%]" />
          </div>
        </div>
      </Section>
    </>
  )
}
