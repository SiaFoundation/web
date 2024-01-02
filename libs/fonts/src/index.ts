import { cx } from 'class-variance-authority'
import localFont from 'next/font/local'

const sans = localFont({
  variable: '--font-sans',
  display: 'swap',
  preload: true,
  src: [
    {
      path: './fonts/IBM_Plex_Sans/IBMPlexSans-Thin.ttf',
      weight: '100',
      style: 'normal',
    },
    {
      path: './fonts/IBM_Plex_Sans/IBMPlexSans-ThinItalic.ttf',
      weight: '100',
      style: 'italic',
    },
    {
      path: './fonts/IBM_Plex_Sans/IBMPlexSans-ExtraLight.ttf',
      weight: '200',
      style: 'normal',
    },
    {
      path: './fonts/IBM_Plex_Sans/IBMPlexSans-ExtraLightItalic.ttf',
      weight: '200',
      style: 'italic',
    },
    {
      path: './fonts/IBM_Plex_Sans/IBMPlexSans-Light.ttf',
      weight: '300',
      style: 'normal',
    },
    {
      path: './fonts/IBM_Plex_Sans/IBMPlexSans-LightItalic.ttf',
      weight: '300',
      style: 'italic',
    },
    {
      path: './fonts/IBM_Plex_Sans/IBMPlexSans-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/IBM_Plex_Sans/IBMPlexSans-Italic.ttf',
      weight: '400',
      style: 'italic',
    },
    {
      path: './fonts/IBM_Plex_Sans/IBMPlexSans-Medium.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: './fonts/IBM_Plex_Sans/IBMPlexSans-MediumItalic.ttf',
      weight: '500',
      style: 'italic',
    },
    {
      path: './fonts/IBM_Plex_Sans/IBMPlexSans-SemiBold.ttf',
      weight: '600',
      style: 'normal',
    },
    {
      path: './fonts/IBM_Plex_Sans/IBMPlexSans-SemiBoldItalic.ttf',
      weight: '600',
      style: 'italic',
    },
    {
      path: './fonts/IBM_Plex_Sans/IBMPlexSans-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
    {
      path: './fonts/IBM_Plex_Sans/IBMPlexSans-BoldItalic.ttf',
      weight: '700',
      style: 'italic',
    },
  ],
})

const mono = localFont({
  variable: '--font-mono',
  display: 'swap',
  preload: true,
  src: [
    {
      path: './fonts/IBM_Plex_Mono/IBMPlexMono-Thin.ttf',
      weight: '100',
      style: 'normal',
    },
    {
      path: './fonts/IBM_Plex_Mono/IBMPlexMono-ThinItalic.ttf',
      weight: '100',
      style: 'italic',
    },
    {
      path: './fonts/IBM_Plex_Mono/IBMPlexMono-ExtraLight.ttf',
      weight: '200',
      style: 'normal',
    },
    {
      path: './fonts/IBM_Plex_Mono/IBMPlexMono-ExtraLightItalic.ttf',
      weight: '200',
      style: 'italic',
    },
    {
      path: './fonts/IBM_Plex_Mono/IBMPlexMono-Light.ttf',
      weight: '300',
      style: 'normal',
    },
    {
      path: './fonts/IBM_Plex_Mono/IBMPlexMono-LightItalic.ttf',
      weight: '300',
      style: 'italic',
    },
    {
      path: './fonts/IBM_Plex_Mono/IBMPlexMono-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/IBM_Plex_Mono/IBMPlexMono-Italic.ttf',
      weight: '400',
      style: 'italic',
    },
    {
      path: './fonts/IBM_Plex_Mono/IBMPlexMono-Medium.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: './fonts/IBM_Plex_Mono/IBMPlexMono-MediumItalic.ttf',
      weight: '500',
      style: 'italic',
    },
    {
      path: './fonts/IBM_Plex_Mono/IBMPlexMono-SemiBold.ttf',
      weight: '600',
      style: 'normal',
    },
    {
      path: './fonts/IBM_Plex_Mono/IBMPlexMono-SemiBoldItalic.ttf',
      weight: '600',
      style: 'italic',
    },
    {
      path: './fonts/IBM_Plex_Mono/IBMPlexMono-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
    {
      path: './fonts/IBM_Plex_Mono/IBMPlexMono-BoldItalic.ttf',
      weight: '700',
      style: 'italic',
    },
  ],
})

export const rootFontClasses = cx(sans.variable, mono.variable)
