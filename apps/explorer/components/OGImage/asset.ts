import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { getCloudflareContext } from '@opennextjs/cloudflare'

/**
 * Loads the fonts and pictures for the link preview images from this app's public/og/
 * folder.
 *
 * Some preview images render during the build, before the files are served anywhere, so
 * outside Cloudflare they are read from disk. Next runs both the build and the server
 * from the app's folder. A Cloudflare Worker has no such folder, so there they come from
 * the Worker's static assets, which hold a copy of public/.
 */
async function ogFile(path: string): Promise<ArrayBuffer> {
  const assets = workerAssets()
  if (assets) {
    const response = await assets.fetch(`https://assets.local/og/${path}`)
    if (!response.ok) {
      throw new Error(`/og/${path} answered ${response.status}`)
    }
    return response.arrayBuffer()
  }
  const file = await readFile(join(process.cwd(), 'public/og', path))
  return file.buffer.slice(file.byteOffset, file.byteOffset + file.byteLength)
}

// getCloudflareContext throws anywhere but on a Worker, including during the build.
function workerAssets() {
  try {
    return getCloudflareContext().env.ASSETS
  } catch {
    return undefined
  }
}

/** The image renderer takes a local picture only as a data URL. */
async function ogPicture(path: string) {
  const data = Buffer.from(await ogFile(path)).toString('base64')
  return `data:image/png;base64,${data}`
}

export type OGPictures = {
  pattern: string
  logo: string
}

export async function ogAssets() {
  const [medium, semibold, bold, pattern, logo] = await Promise.all([
    ogFile('fonts/plex-sans-medium.ttf'),
    ogFile('fonts/plex-sans-semibold.ttf'),
    ogFile('fonts/plex-sans-bold.ttf'),
    ogPicture('pattern.png'),
    ogPicture('shard-bleed.png'),
  ])
  const font = (data: ArrayBuffer, weight: 500 | 600 | 700) => ({
    name: 'IBM Plex Sans',
    data,
    style: 'normal' as const,
    weight,
  })
  return {
    fonts: [font(medium, 500), font(semibold, 600), font(bold, 700)],
    pictures: { pattern, logo } satisfies OGPictures,
  }
}
