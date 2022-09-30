import { createStitches } from '@stitches/react'
import type * as Stitches from '@stitches/react'
import { colors, colorsDark } from './colors'
import { utils } from './utils'

// Reference:
// - https://stitches.dev/docs/styling
// - https://www.radix-ui.com/docs/primitives/overview/introduction
const stitches = createStitches({
  theme: {
    colors,
    // Fonts configured globally in fonts.ts
    fonts: {
      sans: 'PlexSans, Untitled Sans, -apple-system, system-ui, sans-serif',
      display: 'PlexSans, Untitled Sans, -apple-system, system-ui, sans-serif',
      mono: 'PlexMono, menlo, monospace',
    },
    space: {
      '0-5': '4px',
      1: '8px',
      '1-5': '12px',
      2: '16px',
      '2-5': '20px',
      3: '24px',
      '3-5': '28px',
      4: '32px',
      5: '40px',
      6: '48px',
      7: '56px',
      8: '64px',
      9: '72px',
      10: '80px',
      11: '88px',
      12: '96px',
      13: '112px',
      14: '128px',
      15: '142px',
      max: '160px',
      frame: '$0-5',
    },
    sizes: {
      '0-5': '4px', // 0
      1: '8px', // 1
      '1-5': '12px', // 2
      2: '16px', // 3
      '2-5': '20px', // 4
      3: '24px', // 5
      '3-5': '28px', // 6
      4: '32px', // 7
      5: '40px', // 8
      6: '48px', // 9
      7: '56px', // 10
      8: '64px', // 11
      9: '72px',
      10: '80px', // 12
      11: '88px', //
      12: '96px',
      13: '112px',
      14: '128px',
      15: '142px',
      max: '160px', // 13
      frame: '$0-5',
    },
    fontSizes: {
      10: '10px',
      12: '12px',
      14: '14px',
      16: '16px',
      18: '18px',
      20: '20px',
      24: '24px',
      32: '32px',
      40: '40px',
      64: '64px',
    },
    radii: {
      '0-5': '2px',
      1: '4px',
      2: '8px',
      3: '16px',
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
