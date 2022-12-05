import '../config/style.css'
import {
  getImageProps,
  NextAppSsr,
  PageHead,
  ScrollArea,
  webLinks,
} from '@siafoundation/design-system'
import preview from '../assets/jungle-preview.png'
import { Heading } from '../components/Heading'

const previewImage = getImageProps(preview)

type Props = React.ComponentProps<typeof NextAppSsr>

export default function App(props: Props) {
  return <NextAppSsr {...props} Layout={Layout} />
}

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-white dark:bg-graydark-50 h-full">
      <PageHead
        appLink={webLinks.design}
        appName="Sia"
        title="Design System"
        description="A playground for the Sia design system."
        image={previewImage.src}
        path="/"
      />
      <ScrollArea>
        <div className="pt-24 pb-40">
          <Heading />
          {children}
        </div>
      </ScrollArea>
    </div>
  )
}
