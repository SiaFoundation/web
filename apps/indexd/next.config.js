const { composePlugins, withNx } = require('@nx/next')

/**
 * @type {import('@nx/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfigServe = {
  // Use downstream webserver compression in production
  compress: process.env.NODE_ENV === 'development',
  images: {
    unoptimized: true,
  },
  nx: {
    // Set this to true if you would like to to use SVGR
    // See: https://github.com/gregberge/svgr
    svgr: false,
  },
  output: 'standalone',
}

/**
 * @type {import('@nx/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfigExport = {
  images: {
    unoptimized: true,
  },
  nx: {
    // Set this to true if you would like to to use SVGR
    // See: https://github.com/gregberge/svgr
    svgr: false,
  },
  output: 'export',
}

const nextConfig =
  process.env.NX_TASK_TARGET_CONFIGURATION === 'export'
    ? nextConfigExport
    : nextConfigServe

const plugins = [withNx]

module.exports = composePlugins(...plugins)(nextConfig)
