import { ImageProps, SiteLayout } from '@siafoundation/design-system'
import { Footer } from './Footer'
import { PageHead } from './PageHead'
import { Navbar } from './Navbar'
import { menuSections } from '../config/siteMap'
import { cx } from 'class-variance-authority'

type Props = {
  heading: React.ReactNode
  children: React.ReactNode
  title: string
  description: string
  date?: string
  path: string
  backgroundImage: ImageProps
  previewImage: ImageProps
  focus?: React.ReactNode
  transitions?: boolean
  transitionWidthDuration?: number
  transitionFadeDelay?: number
  className?: string
}

export function Layout({
  heading,
  children,
  title,
  description,
  date,
  path,
  backgroundImage,
  previewImage,
  focus,
  transitions,
  transitionWidthDuration,
  transitionFadeDelay,
  className,
}: Props) {
  return (
    <div className="bg-white dark:bg-graydark-50 h-full overflow-x-hidden overflow-y-auto">
      <PageHead
        title={title}
        description={description}
        image={previewImage.src}
        date={date}
        path={path}
      />
      <SiteLayout
        focus={focus}
        transitions={transitions}
        transitionWidthDuration={transitionWidthDuration}
        transitionFadeDelay={transitionFadeDelay}
        heading={heading}
        menuSections={menuSections}
        footer={<Footer />}
        backgroundImage={backgroundImage}
        navbar={<Navbar />}
      >
        <div className={cx('flex flex-col', className)}>{children}</div>
      </SiteLayout>
    </div>
  )
}
