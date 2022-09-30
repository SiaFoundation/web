import { styled } from '../config/theme'

export const Flex = styled('div', {
  boxSizing: 'border-box',
  display: 'flex',

  variants: {
    direction: {
      row: {
        flexDirection: 'row',
      },
      column: {
        flexDirection: 'column',
      },
      rowReverse: {
        flexDirection: 'row-reverse',
      },
      columnReverse: {
        flexDirection: 'column-reverse',
      },
    },
    align: {
      start: {
        alignItems: 'flex-start',
      },
      center: {
        alignItems: 'center',
      },
      end: {
        alignItems: 'flex-end',
      },
      stretch: {
        alignItems: 'stretch',
      },
      baseline: {
        alignItems: 'baseline',
      },
    },
    justify: {
      start: {
        justifyContent: 'flex-start',
      },
      center: {
        justifyContent: 'center',
      },
      end: {
        justifyContent: 'flex-end',
      },
      between: {
        justifyContent: 'space-between',
      },
    },
    wrap: {
      noWrap: {
        flexWrap: 'nowrap',
      },
      wrap: {
        flexWrap: 'wrap',
      },
      wrapReverse: {
        flexWrap: 'wrap-reverse',
      },
    },
    gap: {
      0: {
        gap: '$0',
      },
      '0-5': {
        gap: '$0-5',
      },
      1: {
        gap: '$1',
      },
      '1-5': {
        gap: '$1-5',
      },
      2: {
        gap: '$2',
      },
      '2-5': {
        gap: '$2-5',
      },
      3: {
        gap: '$3',
      },
      '3-5': {
        gap: '$3-5',
      },
      4: {
        gap: '$4',
      },
      5: {
        gap: '$5',
      },
      6: {
        gap: '$6',
      },
      7: {
        gap: '$7',
      },
      8: {
        gap: '$8',
      },
      9: {
        gap: '$9',
      },
      10: {
        gap: '$10',
      },
      11: {
        gap: '$11',
      },
      12: {
        gap: '$12',
      },
      13: {
        gap: '$13',
      },
      14: {
        gap: '$14',
      },
      15: {
        gap: '$15',
      },
      16: {
        gap: '$16',
      },
    },
    gapY: {
      0: {
        rowGap: '$0',
      },
      '0-5': {
        rowGap: '$0-5',
      },
      1: {
        rowGap: '$1',
      },
      '1-5': {
        rowGap: '$1-5',
      },
      2: {
        rowGap: '$2',
      },
      '2-5': {
        rowGap: '$2-5',
      },
      3: {
        rowGap: '$3',
      },
      '3-5': {
        rowGap: '$3-5',
      },
      4: {
        rowGap: '$4',
      },
      5: {
        rowGap: '$5',
      },
      6: {
        rowGap: '$6',
      },
      7: {
        rowGap: '$7',
      },
      8: {
        rowGap: '$8',
      },
      9: {
        rowGap: '$9',
      },
      10: {
        rowGap: '$10',
      },
      11: {
        rowGap: '$11',
      },
      12: {
        rowGap: '$12',
      },
      13: {
        rowGap: '$13',
      },
      14: {
        rowGap: '$14',
      },
      15: {
        rowGap: '$15',
      },
      16: {
        rowGap: '$16',
      },
    },
    gapX: {
      0: {
        columnGap: '$0',
      },
      '0-5': {
        columnGap: '$0-5',
      },
      1: {
        columnGap: '$1',
      },
      '1-5': {
        columnGap: '$1-5',
      },
      2: {
        columnGap: '$2',
      },
      '2-5': {
        columnGap: '$2-5',
      },
      3: {
        columnGap: '$3',
      },
      '3-5': {
        columnGap: '$3-5',
      },
      4: {
        columnGap: '$4',
      },
      5: {
        columnGap: '$5',
      },
      6: {
        columnGap: '$6',
      },
      7: {
        columnGap: '$7',
      },
      8: {
        columnGap: '$8',
      },
      9: {
        columnGap: '$9',
      },
      10: {
        columnGap: '$10',
      },
      11: {
        columnGap: '$11',
      },
      12: {
        columnGap: '$12',
      },
      13: {
        columnGap: '$13',
      },
      14: {
        columnGap: '$14',
      },
      15: {
        columnGap: '$15',
      },
      16: {
        columnGap: '$16',
      },
    },
    debug: {
      true: {
        border: '1px solid $accent9',
        borderRadius: '$1',
      },
    },
  },
  defaultVariants: {
    direction: 'row',
    align: 'stretch',
    justify: 'start',
    wrap: 'noWrap',
  },
})
