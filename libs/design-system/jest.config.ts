/* eslint-disable */
export default {
  displayName: 'design-system',

  transform: {
    '^.+\\.[tj]sx?$': ['babel-jest', { presets: ['@nrwl/react/babel'] }],
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../coverage/libs/design-system',
  preset: '../../jest.preset.js',
}
