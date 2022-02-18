import { createStitches } from '@stitches/react'
import type * as Stitches from '@stitches/react'
import { colors, colorsDark } from './colors'
import { utils } from './utils'

const unitSize = 5

function getPx(units: number) {
  return `${units * unitSize}px`
}

// Reference:
// - https://stitches.dev/docs/styling
// - https://www.radix-ui.com/docs/primitives/overview/introduction
const stitches = createStitches({
  theme: {
    colors,
    // Fonts configured globally in fonts.ts
    fonts: {
      sans: 'Inter, Untitled Sans, -apple-system, system-ui, sans-serif',
      display:
        'InterDisplay, Untitled Sans, -apple-system, system-ui, sans-serif',
      mono: 'menlo, monospace',
    },
    space: {
      1: getPx(1),
      2: getPx(2),
      3: getPx(3),
      4: getPx(4),
      5: getPx(5),
      6: getPx(7),
      7: getPx(9),
      8: getPx(13),
      9: getPx(16),
    },
    sizes: {
      1: getPx(1),
      2: getPx(2),
      3: getPx(3),
      4: getPx(4),
      5: getPx(5),
      6: getPx(7),
      7: getPx(9),
      8: getPx(13),
      9: getPx(16),
    },
    fontSizes: {
      1: '12px',
      2: '13px',
      3: '15px',
      4: '17px',
      5: '19px',
      6: '21px',
      7: '27px',
      8: '35px',
      9: '59px',
    },
    radii: {
      1: '4px',
      2: '6px',
      3: '8px',
      4: '12px',
      5: '20px',
      round: '50%',
      pill: '9999px',
    },
    zIndices: {
      1: '100',
      2: '200',
      3: '300',
      4: '400',
      max: '999',
    },
  },
  media: {
    bp1: '(min-width: 520px)',
    bp2: '(min-width: 900px)',
    bp3: '(min-width: 1200px)',
    bp4: '(min-width: 1800px)',
    motion: '(prefers-reduced-motion)',
    hover: '(any-hover: hover)',
    dark: '(prefers-color-scheme: dark)',
    light: '(prefers-color-scheme: light)',
  },
  utils,
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
export type { VariantProps } from '@stitches/react'

export const darkTheme = createTheme('theme-dark', {
  colors: colorsDark,
})
