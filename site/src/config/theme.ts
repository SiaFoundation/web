import { createStitches } from '@stitches/react'
import type * as Stitches from '@stitches/react'

const unitSize = 4

function getPx(units: number) {
  return `${units * unitSize}px`
}

const stitches = createStitches({
  theme: {
    colors: {
      hiContrast: 'hsla(0, 0%, 100%, 1)',
      loContrast: 'hsla(0, 2%, 11%, 1)',
    },
    fonts: {
      sans: 'Helvetica Neue, Untitled Sans, -apple-system, system-ui, sans-serif',
    },
    space: {
      0: getPx(0.5),
      1: getPx(1),
      2: getPx(2),
      3: getPx(3),
      4: getPx(4),
      5: getPx(5),
      6: getPx(7),
      7: getPx(9),
      8: getPx(13),
      9: getPx(16),
      10: getPx(21),
    },
    fontSizes: {
      1: '12px',
      2: '18px',
      3: '32px',
    },
    lineHeights: {
      1: '15px',
      2: '24px',
      3: '40px',
    },
    zIndices: {
      0: 0,
      1: 100,
      2: 200,
    },
    radii: {
      1: '6px',
      2: '8px',
      round: '50%',
    },
  },
})

export const {
  styled,
  css,
  theme,
  createTheme,
  getCssText,
  globalCss,
  keyframes,
  config,
} = stitches
export type CSS = Stitches.CSS<typeof config>
