module.exports = {
  displayName: 'design-system',

  transform: {
    '^.+\\.[tj]sx?$': 'babel-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../coverage/libs/design-system',
  preset: '../../jest.preset.ts',
}
