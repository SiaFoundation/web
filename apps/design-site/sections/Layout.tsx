import {
  NavbarSite,
  Panel,
  Section,
  UserDropdownMenu,
} from '@siafoundation/design-system'
import { SubsectionHeading } from '../components/SubsectionHeading'

export function Layout() {
  return (
    <>
      <Section className="pt-20">
        <SubsectionHeading>Panel</SubsectionHeading>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Panel className="w-full h-[100px]" />
          <Panel className="w-full h-[100px]" />
          <Panel className="w-full h-[100px]" />
          <Panel className="w-full h-[100px]" />
        </div>
      </Section>
      <Section className="pt-20">
        <SubsectionHeading>Navbar</SubsectionHeading>
        <div className="relative bg-gray-400 dark:bg-graydark-400 overflow-hidden rounded">
          <div className="p-4">
            <NavbarSite appName="Xerox" homeHref={'#'}>
              <UserDropdownMenu />
            </NavbarSite>
          </div>
        </div>
      </Section>
    </>
  )
}
