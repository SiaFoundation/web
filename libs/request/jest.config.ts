import type { Config } from 'jest'

const config: Config = {
  displayName: 'request',
  preset: '../../jest.preset.js',
  transform: {
    '^(?!.*\\.(js|jsx|ts|tsx|css|json)$)': '@nx/react/plugins/jest',
    '^.+\\.[tj]sx?$': [
      'babel-jest',
      {
        presets: ['@nx/next/babel'],
        plugins: ['@babel/plugin-transform-private-methods'],
      },
    ],
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../coverage/libs/request',
}

export default config
