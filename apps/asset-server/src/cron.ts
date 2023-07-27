import {
  generateRssFeed,
  syncAssets,
  syncFeedsToNotion,
} from '@siafoundation/data-sources'
import cron from 'node-cron'
export async function startCron() {
  console.log('Starting scheduled cron jobs')
  sync()
  // run every 5 minutes
  cron.schedule('*/5 * * * *', async () => {
    sync()
  })
}

export async function sync() {
  try {
    console.log('Syncing assets from Notion')
    await syncAssets()
  } catch (e) {
    console.log(e)
  }
  try {
    console.log('Syncing rss feeds')
    await syncFeedsToNotion()
  } catch (e) {
    console.log(e)
  }
  try {
    console.log('Generating rss feed')
    await generateRssFeed()
  } catch (e) {
    console.log(e)
  }
}
