const { Notion } = require('./notion')
const { fetchRssFeedItems } = require('./feedSyncRss')
require('dotenv').config()

const feedDatabaseId = '9be1ecfc6f3142e7b8e284f2f6bd9338'

// sync articles from rss feeds
async function syncFeeds() {
  const allArticles = await fetchAllFeedItems()

  // console.log('syncing archive')
  // await syncJsonArchive(allArticles)

  console.log('syncing posts from feeds')
  const items = await fetchRssFeedItems()

  console.log('saving posts')
  // eslint-disable-next-line no-undef
  await Promise.all(
    items.map(async (post) => {
      await savePost(allArticles, post)
    })
  )

  // double check no duplicates
  console.log('checking for duplicates')
  await dedupeFeedItems(allArticles)
  console.log('Done')
}

async function dedupeFeedItems(allArticles) {
  const links = []
  allArticles.forEach(async (article) => {
    const link = article.link
    if (links.includes(link)) {
      await deleteArticle(article.id)
      console.log('deleted duplicate', link)
    } else {
      links.push(link)
    }
  })
}

async function savePost(allArticles, post) {
  const url = new URL(post.link)
  // clean the link, at least medium appends query params
  const link = url.origin + url.pathname
  // use the clean link to check if the article is new
  const doesArticleExist = allArticles.find((a) => a.link === link)
  if (!doesArticleExist) {
    console.log('new item', link)
    const tags = ['ecosystem-all']
    if (url.origin === 'https://blog.sia.tech') {
      tags.push('sia-all')
    }
    const item = {
      title: post.title,
      date: new Date(post.pubDate).toISOString(),
      tags,
      link,
    }
    saveItem(item)
  } else {
    console.log('item already exists', link)
  }
}

async function saveItem(item) {
  try {
    await Notion.pages.create({
      parent: {
        type: 'database_id',
        database_id: feedDatabaseId,
      },

      properties: {
        title: {
          title: [
            {
              text: {
                content: item.title,
              },
            },
          ],
        },
        link: {
          url: item.link,
        },
        tags: {
          multi_select: item.tags.map((tag) => {
            return {
              name: tag,
            }
          }),
        },
        date: {
          date: {
            start: new Date(item.date).toISOString(),
          },
        },
      },
    })
  } catch (e) {
    console.log(e)
  }
}

async function deleteArticle(pageId) {
  try {
    await Notion.pages.update({
      page_id: pageId,
      archived: true,
    })
  } catch (e) {
    console.log(e)
  }
}

async function fetchAllFeedItems() {
  let allPages = []
  let startCursor = undefined
  let more = true
  while (more) {
    let response = await Notion.databases.query({
      database_id: feedDatabaseId,
      page_size: 100,
      start_cursor: startCursor,
    })
    allPages.push(...response.results)
    if (!response.has_more) {
      more = false
      break
    }
    startCursor = response.next_cursor
  }
  return allPages.map((page) => ({
    id: page.id,
    title: page.properties.title.title[0].plain_text,
    link: page.properties.link.url,
    tags: page.properties.tags.multi_select.map((tag) => tag.name),
    date: page.properties.date.date.start,
  }))
}

module.exports = {
  syncFeeds: syncFeeds,
  fetchAllFeedItems,
}

// // TODO: remove
// const articlesFilePath = path.join(process.env.CONTENT, 'feed.json')
// async function syncJsonArchive(allArticles) {
//   // parse existing articles.json so that new data can be merged in
//   const articleData = fs.readFileSync(articlesFilePath, 'utf-8')
//   let articles = []
//   try {
//     const json = JSON.parse(articleData)
//     articles = json
//   } catch (e) {
//     throw Error('error parsing articles.json')
//   }

//   console.log('articles archive', articles.length)

//   articles.forEach(async (article) => {
//     const url = new URL(article.link)
//     const link = url.origin + url.pathname
//     const doesArticleExist = allArticles.find(
//       (a) => a.properties.link.url === link
//     )
//     if (!doesArticleExist) {
//       await saveItem(article)
//     }
//   })
// }
