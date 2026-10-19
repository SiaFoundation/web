import { readFileSync } from 'node:fs'
import { join } from 'node:path'

/**
 * Reads a font or picture for the link preview images from this app's public/og/ folder.
 * They are read from disk rather than fetched from the site, because some preview images
 * render during the build, before the files are served anywhere. Next runs both the build
 * and the server from the app's folder.
 */
export function ogFile(path: string) {
  return readFileSync(join(process.cwd(), 'public/og', path))
}

/** A picture from public/og/ as a data URL, which is how the image renderer takes a local file. */
export function ogImage(path: string) {
  return `data:image/png;base64,${ogFile(path).toString('base64')}`
}
