import { createStitches } from '@stitches/react'
import type * as Stitches from '@stitches/react'

const unitSize = 5

function getPx(units: number) {
  return `${units * unitSize}px`
}

// Reference: https://github.com/radix-ui/design-system/blob/master/stitches.config.ts
const stitches = createStitches({
  theme: {
    colors: {
      // Theme colors
      // Add new theme colors here.
      // Existing colors from: https://support.sia.tech/sia-integrations/sia-brand-guidelines
      siaGreen: '#1ED660',
      siaGray: '#7F8C8D',
      gray1: '#F7F9F8', // very light gray
      gray2: '#ECF1F1', // light gray
      gray3: '#BFC9C9', // medium gray
      gray4: '#93A5A5', // dark gray
      gray5: '#404647', // darker gray
      gray6: '#202323', // darkest gray

      // Semantic colors
      loContrast: 'hsla(0, 0%, 100%, 1)',
      text: 'hsla(0, 2%, 40%, 1)',
      hiContrast: 'hsla(0, 2%, 11%, 1)',
      canvas: 'hsl(0 0% 93%)',
      panel: 'white',
      shadowLight: 'hsl(206 22% 7% / 35%)',
      shadowDark: 'hsl(206 22% 7% / 20%)',
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
