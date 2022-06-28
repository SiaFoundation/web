export function getSiaVersion() {
  return {
    current: process.env.SIA_CURRENT || '0.0.0',
    rc: process.env.SIA_RC || '0.0.0',
    embc: process.env.EMBC || '0.0.0',
  }
}

export function getGitHubToken() {
  return process.env.GITHUB_TOKEN
}
