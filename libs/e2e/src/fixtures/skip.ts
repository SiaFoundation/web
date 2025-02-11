import test from 'playwright/test'

export type BrowserName = 'webkit' | 'firefox' | 'chromium'

export function testRequiresClipboardPermissions(browserName: BrowserName) {
  test.skip(
    browserName === 'webkit',
    'Skipping on webkit: test requires clipboard permissions'
  )
}

export function testOnlyWorksOn(
  browserNames: BrowserName[],
  currentBrowserName: BrowserName
) {
  test.skip(
    !browserNames.includes(currentBrowserName),
    `Skipping on ${currentBrowserName}: test only works on ${browserNames.join(
      ', '
    )}`
  )
}
