import { buildChartTheme } from '@visx/xychart'
import { colors } from '../../config/colors'

export const lightTheme = buildChartTheme({
  backgroundColor: colors.white,
  colors: [],
  gridColor: colors.gray[700],
  gridColorDark: 'transparent',
  svgLabelBig: { fill: '#1d1b38' },
  tickLength: 12,
  xTickLineStyles: {
    fill: 'transparent',
    stroke: 'transparent',
  },
})

export const darkTheme = buildChartTheme({
  backgroundColor: colors.graydark[300],
  colors: [],
  gridColor: colors.graydark[700],
  gridColorDark: 'transparent',
  svgLabelBig: { fill: '#1d1b38' },
  tickLength: 12,
  xTickLineStyles: {
    fill: 'transparent',
    stroke: 'transparent',
  },
})
