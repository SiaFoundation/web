import { PageHead as DsPageHead, webLinks } from '@siafoundation/design-system'
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
    <DsPageHead
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
        href={routes.newsroom.feed.rss}
        title={newsFeedName}
      />
      <link
        rel="alternate"
        type="application/atom+xml"
        href={routes.newsroom.feed.atom}
        title={newsFeedName}
      />
      <link
        rel="alternate"
        type="application/json"
        href={routes.newsroom.feed.json}
        title={newsFeedName}
      />
    </DsPageHead>
  )
}
