import { Avatar, Image, Section } from '@siafoundation/design-system'
import { SectionHeading } from '../components/SectionHeading'
import { SubsectionHeading } from '../components/SubsectionHeading'
import bellLabs from '../assets/bell-labs.jpeg'
import macTeam from '../assets/mac-team.png'
import avatar1 from '../assets/avatar1.png'
import avatar2 from '../assets/avatar2.png'
import avatar3 from '../assets/avatar3.png'

export function Images() {
  return (
    <>
      <Section>
        <SectionHeading>Images</SectionHeading>
        <SubsectionHeading>Image</SubsectionHeading>
        <div className="flex flex-wrap justify-start gap-4 max-w-[500px]">
          <Image src={bellLabs} alt="bell labs" />
          <Image src={macTeam} alt="mac team" />
        </div>
      </Section>
      <Section>
        <SubsectionHeading>Image - contain</SubsectionHeading>
        <div className="flex flex-wrap justify-start gap-4">
          <Image
            src={bellLabs}
            alt="bell labs"
            className="object-contain w-[250px]"
          />
          <Image
            src={macTeam}
            alt="mac team"
            className="object-contain w-[250px]"
          />
        </div>
      </Section>
      <Section>
        <SubsectionHeading>Image - cover</SubsectionHeading>
        <div className="flex flex-wrap gap-4 justify-start">
          <Image
            src={bellLabs}
            alt="bell labs"
            className="object-cover h-[250px] w-[250px]"
          />
          <Image
            src={macTeam}
            alt="mac team"
            className="object-cover h-[250px] w-[250px]"
          />
        </div>
      </Section>
      <Section>
        <SubsectionHeading>Avatar</SubsectionHeading>
        <div className="flex flex-wrap justify-start gap-6">
          <div className="flex gap-4 items-center justify-start">
            <Avatar size="1" src={avatar1.src} interactive />
            <Avatar size="2" src={avatar2.src} interactive />
            <Avatar size="3" src={avatar3.src} interactive />
          </div>
          <div className="flex gap-4 items-center justify-start">
            <Avatar size="1" fallback="RH" interactive />
            <Avatar size="2" fallback="RH" interactive />
            <Avatar shape="square" size="2" fallback="RH" interactive />
            <Avatar size="3" fallback="RH" interactive />
          </div>
          <div className="flex gap-4 items-center justify-start">
            <Avatar shape="square" size="1" src={avatar1.src} />
            <Avatar shape="square" size="2" src={avatar2.src} />
            <Avatar shape="square" size="3" src={avatar3.src} />
          </div>
        </div>
      </Section>
    </>
  )
}
