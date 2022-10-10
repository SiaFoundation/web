/* eslint-disable */
export default {
  displayName: 'sia-react',

  transform: {
    '^.+\\.[tj]sx?$': ['babel-jest', { presets: ['@nrwl/react/babel'] }],
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../coverage/libs/sia-react',
  preset: '../../jest.preset.js',
}
