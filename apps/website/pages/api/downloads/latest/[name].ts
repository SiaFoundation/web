import { GitHubRelease } from '@siafoundation/data-sources'
import {
  getHostdLatestRelease,
  getRenterdLatestRelease,
  getWalletdLatestRelease,
} from '../../../../content/releases'
import fetch from 'node-fetch'

export const config = {
  api: {
    responseLimit: false,
  },
}

export default async function handler(req, res) {
  const { name } = req.query
  try {
    let daemon = ''
    let latest: GitHubRelease = null
    if (name.includes('hostd')) {
      daemon = 'hostd'
      latest = await getHostdLatestRelease()
    }
    if (name.includes('renterd')) {
      daemon = 'renterd'
      latest = await getRenterdLatestRelease()
    }
    if (name.includes('walletd')) {
      daemon = 'walletd'
      latest = await getWalletdLatestRelease()
    }
    const githubUrl = `https://github.com/SiaFoundation/${daemon}/releases/download/${latest.tag_name}/${name}`

    const response = await fetch(githubUrl)

    if (!response.ok) throw new Error(`Failed to fetch ${githubUrl}`)

    res.setHeader('Content-Type', 'application/zip')
    res.setHeader('Content-Disposition', `attachment; filename=${name}`)

    response.body.pipe(res)
  } catch (error) {
    console.error('Error fetching the file:', error)
    res.status(500).send('Internal Server Error')
  }
}
