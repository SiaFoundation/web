import '../config/style.css'
import {
  getImageProps,
  SiteLayout,
  NextAppSsr,
} from '@siafoundation/design-system'
import Head from 'next/head'
import background from '../assets/jungle.png'
import { Heading } from '../components/Heading'

const backgroundImage = getImageProps(background)

type Props = React.ComponentProps<typeof NextAppSsr>

export default function App(props: Props) {
  return <NextAppSsr {...props} Layout={Layout} />
}

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SiteLayout
      menuSections={[
        {
          title: 'Sections',
          links: [
            {
              link: '/',
              title: 'Core',
            },
            {
              link: '/sites',
              title: 'Sites',
            },
            {
              link: '/apps',
              title: 'Apps',
            },
          ],
        },
      ]}
      navbar={<div />}
      heading={<Heading />}
      backgroundImage={backgroundImage}
    >
      <Head>
        <title>Sia - Design system</title>
      </Head>
      <div className="bg-white dark:bg-graydark-50 pb-60">{children}</div>
    </SiteLayout>
  )
}
