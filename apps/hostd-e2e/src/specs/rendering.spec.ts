import { expect, test, Page } from '@playwright/test'
import { afterTest, beforeTest } from '../fixtures/beforeTest'
import {
  navigateToConfig,
  navigateToDashboard,
  navigateToVolumes,
} from '../fixtures/navigate'

// Covers rendering the rest of the suite cannot see. Every other spec drives the
// app by clicking, so a component can draw incorrectly and still pass. A radix
// upgrade once left the scrollbar thumb at its old size and a visx upgrade left
// charts without axes, both through a fully green run. These check the visual
// details a radix, visx or motion upgrade would disturb first.

// Radix clamps the scrollbar thumb to a minimum so it stays grabbable on very
// long pages.
const minThumbHeight = 18

test.beforeEach(async ({ page }) => {
  await beforeTest(page)
})

test.afterEach(async () => {
  await afterTest()
})

test('the scrollbar thumb resizes when page content changes', async ({
  page,
}) => {
  await navigateToConfig({ page })
  await expect(page.getByText('Save changes')).toBeVisible()

  // Grow the page itself rather than the window. The scroll area pins its
  // content element to the viewport height so children can fill it, which means
  // a longer page resizes nothing the scrollbar is watching.
  await setFillerHeight(page, 2000)
  const short = await measureVerticalScrollbar(page)

  await setFillerHeight(page, 8000)
  await expect
    .poll(async () => (await measureVerticalScrollbar(page)).thumbHeight)
    .toBeLessThan(short.thumbHeight)

  expectThumbToMatchContent(short)
  expectThumbToMatchContent(await measureVerticalScrollbar(page))
})

test('dashboard charts draw their axes or say they have no data', async ({
  page,
}) => {
  await navigateToDashboard({ page })
  const panels = page.getByTestId('chartXY')
  await expect(panels.first()).toBeVisible()
  const panelCount = await panels.count()
  expect(panelCount).toBeGreaterThan(0)

  // Each panel shows loading dots until its metrics arrive. Sampling before
  // then reads a dashboard that has drawn nothing, or one chart that happens to
  // have won the race while the rest go unchecked.
  await expect
    .poll(async () => (await readChartPanels(page)).settled)
    .toBe(panelCount)

  // A chart that drew its gridlines but no axes is the failure to catch: the
  // panel looks populated while every label is missing.
  expect((await readChartPanels(page)).withoutAxes).toBe(0)
})

test('closing a dialog with escape leaves the page interactive', async ({
  page,
}) => {
  await navigateToVolumes({ page })
  await page.getByText('Create volume').click()
  const dialog = page.getByRole('dialog')
  await expect(dialog).toBeVisible()

  await page.keyboard.press('Escape')
  await expect(dialog).toBeHidden()

  // Radix suppresses pointer events on the body while a modal is open and
  // restores them on close. Failing to restore leaves the whole page dead to
  // clicks while still looking normal.
  await expect
    .poll(() => page.evaluate(() => document.body.style.pointerEvents))
    .not.toBe('none')
  await navigateToConfig({ page })
})

// A panel has settled once it has drawn a chart or said it has no data; until
// then it is still showing loading dots.
async function readChartPanels(page: Page) {
  return page.evaluate(() => {
    const panels = Array.from(
      document.querySelectorAll('[data-testid="chartXY"]'),
    )
    let settled = 0
    let withoutAxes = 0
    for (const panel of panels) {
      // A panel holds icon svgs too, so the chart is the one with gridlines.
      const chart = Array.from(panel.querySelectorAll('svg')).find((svg) =>
        svg.querySelector('.visx-rows, .visx-columns'),
      )
      const empty = (panel.textContent ?? '').includes('No data available.')
      if (chart || empty) {
        settled += 1
      }
      if (chart && !chart.querySelector('[class*="visx-axis"]')) {
        withoutAxes += 1
      }
    }
    return { settled, withoutAxes }
  })
}

async function setFillerHeight(page: Page, height: number) {
  await page.evaluate((value) => {
    const content =
      document.querySelector('#app-scroll-area')?.firstElementChild
    if (!content) {
      throw new Error('the app scroll area has no content element')
    }
    const existing = document.getElementById('e2e-scroll-filler')
    const filler = existing ?? document.createElement('div')
    filler.id = 'e2e-scroll-filler'
    filler.style.height = `${value}px`
    content.appendChild(filler)
  }, height)
}

type ScrollbarMeasurement = {
  scrollHeight: number
  clientHeight: number
  trackHeight: number
  thumbHeight: number
}

async function measureVerticalScrollbar(
  page: Page,
): Promise<ScrollbarMeasurement> {
  const viewport = page.locator('#app-scroll-area')
  await expect(viewport).toBeVisible()
  const box = await viewport.boundingBox()
  if (!box) {
    throw new Error('the app scroll area has no layout')
  }

  // The scrollbars only mount while the pointer is over the scroll area.
  await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2)
  await page.waitForFunction(
    () =>
      !!document
        .querySelector('#app-scroll-area')
        ?.parentElement?.querySelector('[data-orientation="vertical"]')
        ?.firstElementChild,
  )

  const measurement = await page.evaluate(() => {
    const viewportEl = document.querySelector('#app-scroll-area')
    const scrollbar = viewportEl?.parentElement?.querySelector(
      '[data-orientation="vertical"]',
    )
    const thumb = scrollbar?.firstElementChild
    if (!viewportEl || !scrollbar || !thumb) {
      return null
    }
    return {
      scrollHeight: viewportEl.scrollHeight,
      clientHeight: viewportEl.clientHeight,
      trackHeight: scrollbar.getBoundingClientRect().height,
      thumbHeight: thumb.getBoundingClientRect().height,
    }
  })
  if (!measurement) {
    throw new Error('the vertical scrollbar did not mount')
  }
  return measurement
}

function expectThumbToMatchContent(measurement: ScrollbarMeasurement) {
  const { clientHeight, scrollHeight, trackHeight, thumbHeight } = measurement
  expect(scrollHeight).toBeGreaterThan(clientHeight)
  const expected = Math.max(
    (clientHeight / scrollHeight) * trackHeight,
    minThumbHeight,
  )
  expect(Math.abs(thumbHeight - expected)).toBeLessThanOrEqual(2)
}
