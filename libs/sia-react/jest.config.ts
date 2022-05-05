module.exports = {
  displayName: 'sia-react',

  transform: {
    '^.+\\.[tj]sx?$': 'babel-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../coverage/libs/sia-react',
  preset: '../../jest.preset.ts',
}
