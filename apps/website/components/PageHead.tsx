import { SitePageHead, webLinks } from '@siafoundation/design-system'
import { appName, newsFeedName } from '../config/app'
import { routes } from '../config/routes'

type Props = {
  title: string
  description: string
  image: string
  date?: string
  path: string
  analytics?: boolean
  children?: React.ReactNode
}

export function PageHead({ title, description, image, date, path }: Props) {
  return (
    <SitePageHead
      appLink={webLinks.website}
      appName={appName}
      title={title}
      description={description}
      image={image}
      date={date}
      path={path}
      analytics
    >
      <link
        rel="alternate"
        type="application/rss+xml"
        href={routes.news.feed.rss}
        title={newsFeedName}
      />
      <link
        rel="alternate"
        type="application/atom+xml"
        href={routes.news.feed.atom}
        title={newsFeedName}
      />
      <link
        rel="alternate"
        type="application/json"
        href={routes.news.feed.json}
        title={newsFeedName}
      />
    </SitePageHead>
  )
}
