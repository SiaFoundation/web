import fs from 'fs'
import { Feed } from 'feed'
import { webLinks } from '@siafoundation/design-system'
import { routes } from '../config/routes'
import { newsFeedName } from '../config/app'
import { getContentPath } from '../config/content'
import { getNewsPostsWithHtml } from './news'

export async function generateRssNewsFeed() {
  const posts = await getNewsPostsWithHtml()
  const siteUrl = webLinks.website
  const date = new Date()
  const author = {
    name: 'Sia Foundation',
    email: webLinks.email,
    link: webLinks.twitter,
  }

  const feed = new Feed({
    title: newsFeedName,
    description: '',
    id: siteUrl,
    link: siteUrl,
    image: `${siteUrl}/android-chrome-192x192.png`,
    favicon: `${siteUrl}/favicon-32x32.png`,
    copyright: `All rights reserved ${date.getFullYear()}, Sia Foundation`,
    updated: date,
    generator: 'Feed for Node.js',
    feedLinks: {
      rss2: `${siteUrl}/rss/feed.xml`,
      json: `${siteUrl}/rss/feed.json`,
      atom: `${siteUrl}/rss/atom.xml`,
    },
    author,
  })

  posts.forEach((post) => {
    const url = `${siteUrl}${routes.newsroom.newsPost.replace(
      '[slug]',
      post.slug
    )}`
    const content = post.html.replace(/\sclass="[a-zA-Z0-9:;.\s()\-,]*"/g, '')
    feed.addItem({
      title: post.title,
      id: url,
      link: url,
      description: post.subtitle,
      content,
      author: [author],
      contributor: [author],
      date: new Date(post.date),
    })
  })

  const rssDirectory = getContentPath('rss')
  fs.mkdirSync(rssDirectory, { recursive: true })
  fs.writeFileSync(rssDirectory + '/feed.xml', feed.rss2())
  fs.writeFileSync(rssDirectory + '/atom.xml', feed.atom1())
  fs.writeFileSync(rssDirectory + '/feed.json', feed.json1())
}
