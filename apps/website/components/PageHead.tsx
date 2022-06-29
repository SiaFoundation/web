import { PageHead as DsPageHead } from '@siafoundation/design-system'
import { appName, newsFeedName } from '../config/app'
import { sitemap } from '../config/site'

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
        href={sitemap.newsroom.feed.rss}
        title={newsFeedName}
      />
      <link
        rel="alternate"
        type="application/atom+xml"
        href={sitemap.newsroom.feed.atom}
        title={newsFeedName}
      />
      <link
        rel="alternate"
        type="application/json"
        href={sitemap.newsroom.feed.json}
        title={newsFeedName}
      />
    </DsPageHead>
  )
}
