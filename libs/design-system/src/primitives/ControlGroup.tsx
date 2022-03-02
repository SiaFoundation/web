import { styled } from '../config/theme'
import { Button } from './Button'
import { TextField } from './TextField'
import { Select } from './Select'
import { ControlGroupBase } from './ControlGroupBase'

export const ControlGroup = styled(ControlGroupBase, {
  display: 'flex',

  // Make sure ControlGroup and its children don't affect normal stacking order
  position: 'relative',
  zIndex: 0,

  [`& ${Button}`]: {
    borderRadius: 0,
    boxShadow:
      'inset 0 1px $colors$accentInactive, inset -1px 0 $colors$accentInactive, inset 0 -1px $colors$accentInactive',
    '&:hover': {
      boxShadow:
        '-1px 0 $colors$accentActive, inset 0 1px $colors$accentActive, inset -1px 0 $colors$accentActive, inset 0 -1px $colors$accentActive',
    },
    '&:focus': {
      zIndex: 1,
      boxShadow:
        'inset 0 0 0 1px $colors$accentActive, 0 0 0 1px $colors$accentActive',
    },
    '&:first-child': {
      borderTopLeftRadius: '$1',
      borderBottomLeftRadius: '$1',
      boxShadow: 'inset 0 0 0 1px $colors$accentInactive',
      '&:hover': {
        boxShadow: 'inset 0 0 0 1px $colors$accentActive',
      },
      '&:focus': {
        boxShadow:
          'inset 0 0 0 1px $colors$accentActive, 0 0 0 1px $colors$accentActive',
      },
    },
    '&:last-child': {
      borderTopRightRadius: '$1',
      borderBottomRightRadius: '$1',
      boxShadow:
        'inset 0 1px $colors$accentInactive, inset -1px 0 $colors$accentInactive, inset 0 -1px $colors$accentInactive',
      '&:focus': {
        boxShadow:
          'inset 0 0 0 1px $colors$accentActive, 0 0 0 1px $colors$accentActive',
      },
    },
  },
  [`& ${TextField}`]: {
    borderRadius: 0,
    boxShadow:
      'inset 0 1px $colors$accentInactive, inset -1px 0 $colors$accentInactive, inset 0 -1px $colors$accentInactive',
    '&:focus': {
      zIndex: 1,
      boxShadow:
        'inset 0px 0px 0px 1px $colors$accentInput, 0px 0px 0px 1px $colors$accentInput',
    },
    '&:first-child': {
      borderTopLeftRadius: '$1',
      borderBottomLeftRadius: '$1',
      boxShadow: 'inset 0 0 0 1px $colors$accentInactive',
      '&:focus': {
        boxShadow:
          'inset 0px 0px 0px 1px $colors$accentInput, 0px 0px 0px 1px $colors$accentInput',
      },
    },
    '&:last-child': {
      borderTopRightRadius: '$1',
      borderBottomRightRadius: '$1',
      boxShadow:
        'inset 0 1px $colors$accentInactive, inset -1px 0 $colors$accentInactive, inset 0 -1px $colors$accentInactive',
      '&:focus': {
        boxShadow:
          'inset 0px 0px 0px 1px $colors$accentInput, 0px 0px 0px 1px $colors$accentInput',
      },
    },
  },
  [`& ${Select}`]: {
    borderRadius: 0,
    boxShadow:
      'inset 0 1px $colors$accentInactive, inset -1px 0 $colors$accentInactive, inset 0 -1px $colors$accentInactive',
    '&:focus-within': {
      boxShadow:
        'inset 0px 0px 0px 1px $colors$accentInput, 0px 0px 0px 1px $colors$accentInput',
    },
    '&:first-child': {
      borderTopLeftRadius: '$1',
      borderBottomLeftRadius: '$1',
      boxShadow: 'inset 0 0 0 1px $colors$accentInactive',
      '&:focus-within': {
        boxShadow:
          'inset 0px 0px 0px 1px $colors$accentInput, 0px 0px 0px 1px $colors$accentInput',
      },
    },
    '&:last-child': {
      borderTopRightRadius: '$1',
      borderBottomRightRadius: '$1',
      boxShadow:
        'inset 0 1px $colors$accentInactive, inset -1px 0 $colors$accentInactive, inset 0 -1px $colors$accentInactive',
      '&:focus-within': {
        boxShadow:
          'inset 0px 0px 0px 1px $colors$accentInput, 0px 0px 0px 1px $colors$accentInput',
      },
    },
  },
})

ControlGroup.toString = () => `.${ControlGroupBase.className}`
