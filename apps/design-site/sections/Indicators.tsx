import {
  Alert,
  Badge,
  ProgressBar,
  Section,
  Text,
} from '@siafoundation/design-system'
import { SectionHeading } from '../components/SectionHeading'
import { SubsectionHeading } from '../components/SubsectionHeading'

export function Indicators() {
  return (
    <>
      <Section>
        <SectionHeading>Indicators</SectionHeading>
        <SubsectionHeading>Alert</SubsectionHeading>
        <div className="flex flex-col gap-4 items-stretch">
          <Alert>
            <Text>Announcement, neural implants now available.</Text>
          </Alert>
        </div>
      </Section>
      <Section>
        <SubsectionHeading>ProgressBar</SubsectionHeading>
        <div className="grid grid-cols-3 gap-6">
          <div>
            <ProgressBar value={50} variant="gray" />
          </div>
          <div>
            <ProgressBar value={25} variant="accent" />
          </div>
        </div>
      </Section>
      <Section>
        <SubsectionHeading>Badge</SubsectionHeading>
        <div className="flex flex-col gap-6">
          <div className="flex flex-wrap gap-2">
            <Badge variant="accent">Accent</Badge>
            <Badge variant="green">Green</Badge>
            <Badge variant="red">Red</Badge>
            <Badge variant="gray">Gray</Badge>
            <Badge variant="inactive">default</Badge>
            <Badge variant="accent" rounded={false}>
              No rounding
            </Badge>
          </div>
        </div>
      </Section>
    </>
  )
}
