import {
  Button,
  Section,
  Search16,
  Filter16,
  LinkButton,
} from '@siafoundation/design-system'
import { SectionHeading } from '../components/SectionHeading'
import { SubsectionHeading } from '../components/SubsectionHeading'

export function Buttons() {
  return (
    <>
      <Section>
        <SectionHeading>Buttons</SectionHeading>
        <SubsectionHeading>Button</SubsectionHeading>
        <div className="flex flex-col gap-6">
          <div className="flex gap-2">
            <Button size="small" variant="accent">
              <Filter16 />
              Accent
              <Filter16 />
            </Button>
            <Button size="small" variant="gray">
              Gray
            </Button>
            <Button size="small" variant="red">
              Red
            </Button>
            <Button size="small" variant="ghost">
              Ghost
            </Button>
            <LinkButton size="small" variant="gray">
              Link
            </LinkButton>
          </div>
          <div className="flex gap-2">
            <Button size="medium" variant="accent">
              Accent
            </Button>
            <Button size="medium" variant="gray">
              Gray
            </Button>
            <Button size="medium" variant="red">
              Red
            </Button>
            <Button size="medium" variant="ghost">
              Ghost
            </Button>
          </div>
          <div className="flex gap-2">
            <Button size="large" variant="accent">
              Accent
            </Button>
            <Button size="large" variant="gray">
              Gray
            </Button>
            <Button size="large" variant="red">
              Red
            </Button>
            <Button size="large" variant="ghost">
              Ghost
            </Button>
          </div>
          <div className="flex gap-2">
            <Button rounded={false} size="large" variant="accent">
              Accent
            </Button>
            <Button rounded={false} size="large" variant="gray">
              Gray
            </Button>
            <Button rounded={false} size="large" variant="red">
              Red
            </Button>
            <Button rounded={false} size="large" variant="ghost">
              Ghost
            </Button>
          </div>
          <div className="flex gap-2">
            <Button disabled size="small" variant="accent">
              Accent
            </Button>
            <Button disabled size="small" variant="gray">
              Gray
            </Button>
            <Button disabled size="small" variant="red">
              Red
            </Button>
            <Button disabled size="small" variant="ghost">
              Ghost
            </Button>
          </div>
          <div className="flex gap-2">
            <Button disabled size="medium" variant="accent">
              Accent
            </Button>
            <Button disabled size="medium" variant="gray">
              Gray
            </Button>
            <Button disabled size="medium" variant="red">
              Red
            </Button>
            <Button disabled size="medium" variant="ghost">
              Ghost
            </Button>
          </div>
          <div className="flex gap-2">
            <Button disabled size="large" variant="accent">
              Accent
            </Button>
            <Button disabled size="large" variant="gray">
              Gray
            </Button>
            <Button disabled size="large" variant="red">
              Red
            </Button>
            <Button disabled size="large" variant="ghost">
              Ghost
            </Button>
          </div>
        </div>
      </Section>
      <Section>
        <SubsectionHeading>Buttons - Icon</SubsectionHeading>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex gap-2">
            <Button size="small">
              <Search16 />
            </Button>
            <Button size="medium">
              <Search16 />
            </Button>
            <Button size="large" disabled>
              <Search16 />
            </Button>
          </div>
          <div className="flex gap-2">
            <Button variant="gray" size="small">
              <Search16 />
            </Button>
            <Button variant="gray" size="medium">
              <Search16 />
            </Button>
            <Button variant="gray" size="large" disabled>
              <Search16 />
            </Button>
          </div>
          <div className="flex gap-2">
            <Button state="waiting" size="small">
              <Search16 />
            </Button>
            <Button state="waiting" size="medium">
              <Search16 />
            </Button>
            <Button state="waiting" size="large" disabled>
              <Search16 />
            </Button>
          </div>
        </div>
      </Section>
    </>
  )
}
