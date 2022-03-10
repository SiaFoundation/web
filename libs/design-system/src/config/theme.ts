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
      0: '4px',
      1: '8px',
      2: '12px',
      3: '16px',
      4: '20px',
      5: '24px',
      6: '32px',
      7: '40px',
      8: '48px',
      9: '56px',
    },
    sizes: {
      0: '4px',
      1: '8px',
      2: '12px',
      3: '16px',
      4: '20px',
      5: '24px',
      6: '32px',
      7: '40px',
      8: '48px',
      9: '56px',
    },
    fontSizes: {
      0: '12px',
      1: '14px',
      2: '18px',
      3: '22px',
      4: '24px',
      5: '32px',
      6: '64px',
    },
    radii: {
      1: '0px',
      2: '0px',
      3: '4px',
      4: '8px',
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
