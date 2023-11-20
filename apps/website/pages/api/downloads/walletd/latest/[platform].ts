import { getWalletdLatestRelease } from '../../../../../content/releases'
import fetch from 'node-fetch'

export const config = {
  api: {
    responseLimit: false,
  },
}

const daemon = 'walletd'

export default async function handler(req, res) {
  const { platform } = req.query

  try {
    const latest = await getWalletdLatestRelease()
    const fileName = `${daemon}_${platform}.zip`
    const githubUrl = `https://github.com/SiaFoundation/${daemon}/releases/download/${latest.tag_name}/${fileName}`

    const response = await fetch(githubUrl)

    if (!response.ok) throw new Error(`Failed to fetch ${githubUrl}`)

    res.setHeader('Content-Type', 'application/zip')
    res.setHeader('Content-Disposition', `attachment; filename=${fileName}`)

    response.body.pipe(res)
  } catch (error) {
    console.error('Error fetching the file:', error)
    res.status(500).send('Internal Server Error')
  }
}
