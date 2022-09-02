import { styled } from '../config/theme'

export const Grid = styled('div', {
  boxSizing: 'border-box',
  display: 'grid',

  variants: {
    align: {
      start: {
        alignItems: 'start',
      },
      center: {
        alignItems: 'center',
      },
      end: {
        alignItems: 'end',
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
        justifyContent: 'start',
      },
      center: {
        justifyContent: 'center',
      },
      end: {
        justifyContent: 'end',
      },
      between: {
        justifyContent: 'space-between',
      },
    },
    flow: {
      row: {
        gridAutoFlow: 'row',
      },
      column: {
        gridAutoFlow: 'column',
      },
      dense: {
        gridAutoFlow: 'dense',
      },
      rowDense: {
        gridAutoFlow: 'row dense',
      },
      columnDense: {
        gridAutoFlow: 'column dense',
      },
    },
    columns: {
      1: {
        gridTemplateColumns: 'repeat(1, 1fr)',
      },
      2: {
        gridTemplateColumns: 'repeat(2, 1fr)',
      },
      3: {
        gridTemplateColumns: 'repeat(3, 1fr)',
      },
      4: {
        gridTemplateColumns: 'repeat(4, 1fr)',
      },
      5: {
        gridTemplateColumns: 'repeat(5, 1fr)',
      },
      6: {
        gridTemplateColumns: 'repeat(6, 1fr)',
      },
      7: {
        gridTemplateColumns: 'repeat(7, 1fr)',
      },
      8: {
        gridTemplateColumns: 'repeat(8, 1fr)',
      },
      9: {
        gridTemplateColumns: 'repeat(9, 1fr)',
      },
      10: {
        gridTemplateColumns: 'repeat(10, 1fr)',
      },
    },
    gap: {
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
    },
    gapX: {
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
    },
    gapY: {
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
    },
    debug: {
      true: {
        border: '1px solid $accent9',
        borderRadius: '$1',
      },
    },
  },
})
