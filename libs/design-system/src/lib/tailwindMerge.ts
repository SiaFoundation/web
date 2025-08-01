import { extendTailwindMerge } from 'tailwind-merge'

export const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      'font-family': [],
      'font-weight': [],
      'font-size': [],
      'max-w': [],
    },
  },
})
