import test from 'playwright/test'

export function testRequiresClipboardPermissions(browserName: string) {
  test.skip(
    browserName === 'webkit',
    'Skipping on webkit: test requires clipboard permissions'
  )
}
