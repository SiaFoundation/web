import { styled } from '../config/theme'
import { Button } from './Button'
import { TextField } from './TextField'
import { Select } from './Select'
import { IconButton } from './IconButton'

export const ControlGroup = styled('div', {
  display: 'flex',

  // Make sure ControlGroup and its children don't affect normal stacking order
  position: 'relative',
  zIndex: 0,

  [`& ${Button}`]: {
    marginLeft: '1px',
    borderRadius: 0,
    '&:focus': {
      zIndex: 1,
    },
    '&:first-child': {
      marginLeft: 0,
      borderTopLeftRadius: '$1',
      borderBottomLeftRadius: '$1',
    },
    '&:last-child': {
      borderTopRightRadius: '$1',
      borderBottomRightRadius: '$1',
    },
  },
  [`& ${IconButton}`]: {
    marginLeft: '1px',
    borderRadius: 0,
    '&:first-child': {
      marginLeft: 0,
      borderTopLeftRadius: '$1',
      borderBottomLeftRadius: '$1',
    },
    '&:last-child': {
      borderTopRightRadius: '$1',
      borderBottomRightRadius: '$1',
    },
  },
  [`& ${TextField}`]: {
    borderRadius: 0,
    marginLeft: '1px',
    '&:focus': {
      zIndex: 1,
    },
    '&:first-child': {
      marginLeft: 0,
      borderTopLeftRadius: '$1',
      borderBottomLeftRadius: '$1',
    },
    '&:last-child': {
      borderTopRightRadius: '$1',
      borderBottomRightRadius: '$1',
    },
  },
  [`& ${Select}`]: {
    borderRadius: 0,
    marginLeft: '1px',
    '&:first-child': {
      marginLeft: 0,
      borderTopLeftRadius: '$1',
      borderBottomLeftRadius: '$1',
    },
    '&:last-child': {
      borderTopRightRadius: '$1',
      borderBottomRightRadius: '$1',
    },
  },
})
