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
// - https://github.com/radix-ui/design-system/blob/master/stitches.config.ts
const stitches = createStitches({
  theme: {
    colors: {
      // Radix DS theme colors
      ...colors,

      // TODO: Add new brand/site colors here or configure entire theme

      // Existing colors from: https://support.sia.tech/sia-integrations/sia-brand-guidelines
      // Primary
      siaGreenA1: 'rgba(30, 214, 96, 0.05)',
      siaGreenA2: 'rgba(30, 214, 96, 0.1)',
      siaGreenA3: 'rgba(30, 214, 96, 0.2)',
      siaGreenA4: 'rgba(30, 214, 96, 0.3)',
      siaGreenA5: 'rgba(30, 214, 96, 0.4)',
      siaGreenA6: 'rgba(30, 214, 96, 0.5)',
      siaGreenA7: 'rgba(30, 214, 96, 0.6)',
      siaGreenA8: 'rgba(30, 214, 96, 0.7)',
      siaGreenA9: 'rgba(30, 214, 96, 0.8)',
      siaGreenA10: 'rgba(30, 214, 96, 0.9)',
      siaGreenA11: 'rgba(30, 214, 96, 0.95)',
      siaGreenA12: 'rgba(30, 214, 96, 1)',
      // Secondary
      siaGray1: '#F7F9F8', // very light gray
      siaGray2: '#ECF1F1', // light gray
      siaGray3: '#BFC9C9', // medium gray
      siaGray4: '#93A5A5', // dark gray
      siaGray5: '#7F8C8D', // Sia gray
      siaGray6: '#404647', // darker gray
      siaGray7: '#202323', // darkest gray

      // Semantic
      inputShadow: '$siaGreenA10',
    },
    fonts: {
      sans: 'Metropolis, Untitled Sans, -apple-system, system-ui, sans-serif',
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
  // Radix DS dark theme colors
  colors: colorsDark,
})
