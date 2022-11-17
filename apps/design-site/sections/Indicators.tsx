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
            <Badge variant="simple">Simple</Badge>
            <Badge variant="inactive">Inactive</Badge>
            <Badge variant="active">Active</Badge>
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge rounded={false} variant="accent">
              Accent
            </Badge>
            <Badge rounded={false} variant="simple">
              Simple
            </Badge>
            <Badge rounded={false} variant="inactive">
              Inactive
            </Badge>
            <Badge rounded={false} variant="active">
              Active
            </Badge>
          </div>
        </div>
      </Section>
    </>
  )
}
