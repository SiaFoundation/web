import {
  generateRssFeed,
  syncAssets,
  syncFeedsToNotion,
} from '@siafoundation/data-sources'
import cron from 'node-cron'
export async function startCron() {
  console.log('Starting scheduled cron jobs')
  runSyncAssets()
  runSyncFeeds()
  // run every 5 minutes
  cron.schedule('*/5 * * * *', async () => {
    runSyncAssets()
  })
  // run every 60 minutes
  cron.schedule('0 * * * *', async () => {
    runSyncFeeds()
  })
}

export async function runSyncAssets() {
  try {
    console.log('Syncing assets from Notion')
    await syncAssets()
  } catch (e) {
    console.log(e)
  }
}

export async function runSyncFeeds() {
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
