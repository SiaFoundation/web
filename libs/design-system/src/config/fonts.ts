import { globalCss } from './theme'

export const fontStyles = globalCss({
  '@font-face': [
    // Metropolis
    {
      fontFamily: 'Metropolis',
      src: `url("/fonts/Metropolis/metropolis-regular-webfont.woff2") format("woff2"), url("/fonts/Metropolis/metropolis-regular-webfont.woff") format("woff")`,
      fontWeight: '400',
      fontStyle: 'normal',
    },
    {
      fontFamily: 'Metropolis',
      src: `url("/fonts/Metropolis/metropolis-medium-webfont.woff2") format("woff2"), url("/fonts/Metropolis/metropolis-medium-webfont.woff") format("woff")`,
      fontWeight: '500',
      fontStyle: 'normal',
    },
    {
      fontFamily: 'Metropolis',
      src: `url("/fonts/Metropolis/metropolis-semibold-webfont.woff2") format("woff2"), url("/fonts/Metropolis/metropolis-semibold-webfont.woff") format("woff")`,
      fontWeight: '600',
      fontStyle: 'normal',
    },
    // Inter
    {
      fontFamily: 'Inter',
      fontStyle: 'normal',
      fontWeight: '100 900',
      fontDisplay: 'swap',
      src: `url("/fonts/Inter/Inter-roman.var.woff2") format("woff2")`,
      // fontNamedInstance: 'Regular',
    },
    {
      fontFamily: 'Inter',
      fontStyle: 'italic',
      fontWeight: '100 900',
      fontDisplay: 'swap',
      src: `url("/fonts/Inter/Inter-italic.var.woff2") format("woff2")`,
      // fontNamedInstance: 'Italic',
    },
    // InterDisplay
    {
      fontFamily: 'InterDisplay',
      fontStyle: 'normal',
      fontWeight: '100 900',
      fontDisplay: 'swap',
      src: `url("/fonts/Inter/InterDisplay-roman.var.woff2") format("woff2")`,
      // fontNamedInstance: 'Regular',
    },
    {
      fontFamily: 'InterDisplay',
      fontStyle: 'italic',
      fontWeight: '100 900',
      fontDisplay: 'swap',
      src: `url("/fonts/Inter/InterDisplay-italic.var.woff2") format("woff2")`,
      // fontNamedInstance: 'Italic',
    },
    // PlexSans
    {
      fontFamily: 'PlexSans',
      fontStyle: 'normal',
      fontWeight: '100 900',
      fontDisplay: 'swap',
      src: `url("/fonts/PlexSans/IBMPlexSansVar-Roman.woff2") format("woff2")`,
      // fontNamedInstance: 'Regular',
    },
    {
      fontFamily: 'PlexSans',
      fontStyle: 'italic',
      fontWeight: '100 900',
      fontDisplay: 'swap',
      src: `url("/fonts/PlexSans/IBMPlexSansVar-Italic.woff2") format("woff2")`,
      // fontNamedInstance: 'Italic',
    },
    // PlexMono - where does the 'Text' font weight live?
    {
      fontFamily: 'PlexMono',
      fontStyle: 'normal',
      fontWeight: '100',
      src: `url("/fonts/PlexMono/IBMPlexMono-Thin.woff2") format("woff2")`,
    },
    {
      fontFamily: 'PlexMono',
      fontStyle: 'italic',
      fontWeight: '100',
      src: `url("/fonts/PlexMono/IBMPlexMono-ThinItalic.woff2") format("woff2")`,
    },
    {
      fontFamily: 'PlexMono',
      fontStyle: 'normal',
      fontWeight: '200',
      src: `url("/fonts/PlexMono/IBMPlexMono-ExtraLight.woff2") format("woff2")`,
    },
    {
      fontFamily: 'PlexMono',
      fontStyle: 'italic',
      fontWeight: '200',
      src: `url("/fonts/PlexMono/IBMPlexMono-ExtraLightItalic.woff2") format("woff2")`,
    },
    {
      fontFamily: 'PlexMono',
      fontStyle: 'normal',
      fontWeight: '300',
      src: `url("/fonts/PlexMono/IBMPlexMono-Light.woff2") format("woff2")`,
    },
    {
      fontFamily: 'PlexMono',
      fontStyle: 'italic',
      fontWeight: '300',
      src: `url("/fonts/PlexMono/IBMPlexMono-LightItalic.woff2") format("woff2")`,
    },
    {
      fontFamily: 'PlexMono',
      fontStyle: 'normal',
      fontWeight: '400',
      src: `url("/fonts/PlexMono/IBMPlexMono-Regular.woff2") format("woff2")`,
    },
    {
      fontFamily: 'PlexMono',
      fontStyle: 'italic',
      fontWeight: '400',
      src: `url("/fonts/PlexMono/IBMPlexMono-Italic.woff2") format("woff2")`,
    },
    {
      fontFamily: 'PlexMono',
      fontStyle: 'normal',
      fontWeight: '500',
      src: `url("/fonts/PlexMono/IBMPlexMono-Medium.woff2") format("woff2")`,
    },
    {
      fontFamily: 'PlexMono',
      fontStyle: 'italic',
      fontWeight: '500',
      src: `url("/fonts/PlexMono/IBMPlexMono-MediumItalic.woff2") format("woff2")`,
    },
    {
      fontFamily: 'PlexMono',
      fontStyle: 'normal',
      fontWeight: '600',
      src: `url("/fonts/PlexMono/IBMPlexMono-SemiBold.woff2") format("woff2")`,
    },
    {
      fontFamily: 'PlexMono',
      fontStyle: 'italic',
      fontWeight: '600',
      src: `url("/fonts/PlexMono/IBMPlexMono-SemiBoldItalic.woff2") format("woff2")`,
    },
    {
      fontFamily: 'PlexMono',
      fontStyle: 'normal',
      fontWeight: '700',
      src: `url("/fonts/PlexMono/IBMPlexMono-Bold.woff2") format("woff2")`,
    },
    {
      fontFamily: 'PlexMono',
      fontStyle: 'italic',
      fontWeight: '700',
      src: `url("/fonts/PlexMono/IBMPlexMono-BoldItalic.woff2") format("woff2")`,
    },
    {
      fontFamily: 'PlexMono',
      fontStyle: 'normal',
      fontWeight: '800',
      src: `url("/fonts/PlexMono/IBMPlexMono-ExtraBold.woff2") format("woff2")`,
    },
    {
      fontFamily: 'PlexMono',
      fontStyle: 'italic',
      fontWeight: '800',
      src: `url("/fonts/PlexMono/IBMPlexMono-ExtraBoldItalic.woff2") format("woff2")`,
    },
  ],
})
