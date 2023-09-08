import Identicon from 'identicon.js'

export function hashToAvatar(hash: string, size = 40) {
  const options = {
    foreground: [0, 0, 0, 255],
    background: [255, 255, 255, 255],
    margin: 0.1,
    size,
    format: 'svg',
  }

  const data = new Identicon(hash, options).toString()

  return `data:image/svg+xml;base64,${data}`
}
