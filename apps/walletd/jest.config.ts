/* eslint-disable */
export default {
  displayName: 'walletd',
  preset: '../../jest.preset.js',
  transform: {
    '^(?!.*\\.(js|jsx|ts|tsx|css|json)$)': '@nrwl/react/plugins/jest',
    '^.+\\.[tj]sx?$': ['babel-jest', { presets: ['@nrwl/next/babel'] }],
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../coverage/apps/walletd',
  moduleNameMapper: {
    '^d3-(.*)$': `d3-$1/dist/d3-$1`,
  },
}