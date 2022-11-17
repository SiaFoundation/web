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
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Image {...bellLabs} alt="bell labs" />
          <Image {...macTeam} alt="mac team" />
        </div>
      </Section>
      <Section>
        <SubsectionHeading>Image - responsive</SubsectionHeading>
        <div className="flex justify-start gap-4">
          <div className="relative h-[250px] w-[250px]">
            <Image {...bellLabs} alt="bell labs" layout="responsive" />
          </div>
          <div className="relative h-[350px] w-[250px]">
            <Image {...macTeam} alt="mac team" layout="responsive" />
          </div>
        </div>
      </Section>
      <Section>
        <SubsectionHeading>Image - fill & cover</SubsectionHeading>
        <div className="flex gap-4 justify-start">
          <div className="relative h-[250px] w-[250px]">
            <Image
              src={bellLabs.src}
              blurDataURL={bellLabs.blurDataURL}
              alt="bell labs"
              layout="fill"
              objectFit="cover"
            />
          </div>
          <div className="relative h-[250px] w-[250px]">
            <Image
              src={macTeam.src}
              blurDataURL={macTeam.blurDataURL}
              alt="mac team"
              layout="fill"
              objectFit="cover"
            />
          </div>
        </div>
      </Section>
      <Section>
        <SubsectionHeading>Avatar</SubsectionHeading>
        <div className="grid grid-cols-1 md:grid-cols-2 justify-start gap-6">
          <div className="flex gap-4 items-center justify-start">
            <Avatar size="1" src={avatar1.src} interactive />
            <Avatar size="2" src={avatar2.src} interactive />
            <Avatar size="3" src={avatar3.src} interactive />
          </div>
          <div className="flex gap-4 items-center justify-start">
            <Avatar size="1" fallback="RH" interactive />
            <Avatar size="2" fallback="RH" interactive />
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
