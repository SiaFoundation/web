import type { Config } from 'jest'

const config: Config = {
  displayName: 'data-sources',

  globals: {},
  testEnvironment: 'node',
  transform: {
    '^.+\\.[tj]sx?$': [
      'ts-jest',
      {
        tsconfig: '<rootDir>/tsconfig.spec.json',
      },
    ],
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../coverage/libs/data-sources',
  preset: '../../jest.preset.js',
}

export default config
