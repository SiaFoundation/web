export function getContentDirectory() {
  const dir = process.env.CONTENT
  if (!dir) {
    throw Error('CONTENT directory environment variable must be set')
  }
  return dir
}

export function getGitHubToken() {
  return process.env.GITHUB_TOKEN
}
