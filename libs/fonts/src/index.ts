import { cx } from 'class-variance-authority'
import { IBM_Plex_Sans, IBM_Plex_Mono } from 'next/font/google'

const sans = IBM_Plex_Sans({
  weight: ['100', '200', '300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
  preload: true,
})

const mono = IBM_Plex_Mono({
  weight: ['100', '200', '300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
  preload: true,
})

export const rootFontClasses = cx(sans.variable, mono.variable)
