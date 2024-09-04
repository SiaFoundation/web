import test from 'playwright/test'

export function testRequiresClipboardPermissions(browserName: string) {
  // eslint-disable-next-line playwright/no-skipped-test
  test.skip(
    browserName === 'webkit',
    'Skipping on webkit: test requires clipboard permissions'
  )
}
