const { composePlugins, withNx } = require('@nx/next')

const runningTargetConfiguration = process.env.NX_TASK_TARGET_CONFIGURATION

/**
 * @type {import('@nx/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  // Use downstream webserver compression in production
  compress: process.env.NODE_ENV === 'development',
  nx: {
    // Set this to true if you would like to to use SVGR
    // See: https://github.com/gregberge/svgr
    svgr: false,
  },
  output: 'standalone',
  // Use the Nx target name for the dist directory
  distDir: runningTargetConfiguration?.includes('development')
    ? `.next-${runningTargetConfiguration}`
    : '.next',
}

const plugins = [withNx]

module.exports = composePlugins(...plugins)(nextConfig)
