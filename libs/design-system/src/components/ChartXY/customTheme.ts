import { buildChartTheme } from '@visx/xychart'

export const lightTheme = buildChartTheme({
  backgroundColor: 'var(--colors-panel)',
  colors: ['var(--colors-accent9)', '#6078EA', '#F02FC2'],
  gridColor: 'var(--colors-slate8)',
  gridColorDark: 'transparent',
  svgLabelBig: { fill: '#1d1b38' },
  tickLength: 12,
  xTickLineStyles: {
    fill: 'transparent',
    stroke: 'transparent',
  },
})

export const darkTheme = buildChartTheme({
  backgroundColor: 'var(--colors-panel)',
  colors: ['var(--colors-accent9)', '#6078EA', '#F02FC2'],
  gridColor: 'var(--colors-slate8)',
  gridColorDark: 'transparent',
  svgLabelBig: { fill: '#1d1b38' },
  tickLength: 12,
  xTickLineStyles: {
    fill: 'transparent',
    stroke: 'transparent',
  },
})
