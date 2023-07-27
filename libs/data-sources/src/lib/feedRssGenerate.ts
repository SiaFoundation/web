import * as fs from 'fs'
import { Feed } from 'feed'
import { fetchAllFeedItems } from './notion/feed'
import { getAssetPath } from './assets'

export async function generateRssFeed() {
  const posts = await fetchAllFeedItems([])
  const siteUrl = 'https://sia.tech'
  const date = new Date()
  const author = {
    name: 'Sia Foundation',
    email: 'hello@sia.tech',
    link: 'https://twitter.com/sia__foundation',
  }

  const feed = new Feed({
    title: 'Sia',
    description: 'Updates from the Sia Foundation and ecosystem.',
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
    feed.addItem({
      title: post.title,
      id: post.link,
      link: post.link,
      author: [author],
      contributor: [author],
      date: new Date(post.date),
    })
  })

  const rssDirectory = getAssetPath('rss')
  fs.mkdirSync(rssDirectory, { recursive: true })
  fs.writeFileSync(rssDirectory + '/feed.xml', feed.rss2())
  fs.writeFileSync(rssDirectory + '/atom.xml', feed.atom1())
  fs.writeFileSync(rssDirectory + '/feed.json', feed.json1())
}
