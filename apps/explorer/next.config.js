const { composePlugins, withNx } = require('@nx/next');

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
}

const plugins = [
  withNx,
];

module.exports = composePlugins(...plugins)(nextConfig);
