export function getAssetUrl(path: string): string {
  const hostname = process.env['ASSET_HOST'] || 'https://sia.tech/'
  return `${hostname}${path}`
}

export const backgrounds = {
  bamboo: getAssetUrl('assets/backgrounds/bamboo.png'),
  jungle: getAssetUrl('assets/backgrounds/jungle.png'),
  leaves: getAssetUrl('assets/backgrounds/leaves.png'),
  light: getAssetUrl('assets/backgrounds/light.png'),
  mountain: getAssetUrl('assets/backgrounds/mountain.png'),
  nateBridge: getAssetUrl('assets/backgrounds/nate-bridge.png'),
  natePath: getAssetUrl('assets/backgrounds/nate-path.png'),
  nateSnow: getAssetUrl('assets/backgrounds/nate-snow.png'),
  nateTrickle: getAssetUrl('assets/backgrounds/nate-trickle.png'),
  nateWaterfall: getAssetUrl('assets/backgrounds/nate-waterfall.png'),
  ocean: getAssetUrl('assets/backgrounds/ocean.png'),
  path: getAssetUrl('assets/backgrounds/path.png'),
  steps: getAssetUrl('assets/backgrounds/steps.png'),
  tree: getAssetUrl('assets/backgrounds/tree.png'),
  waterfall: getAssetUrl('assets/backgrounds/waterfall.png'),
}

export const previews = {
  bamboo: getAssetUrl('assets/previews/bamboo.png'),
  jungle: getAssetUrl('assets/previews/jungle.png'),
  leaves: getAssetUrl('assets/previews/leaves.png'),
  light: getAssetUrl('assets/previews/light.png'),
  mountain: getAssetUrl('assets/previews/mountain.png'),
  nateBridge: getAssetUrl('assets/previews/nate-bridge.png'),
  natePath: getAssetUrl('assets/previews/nate-path.png'),
  nateSnow: getAssetUrl('assets/previews/nate-snow.png'),
  nateTrickle: getAssetUrl('assets/previews/nate-trickle.png'),
  nateWaterfall: getAssetUrl('assets/previews/nate-waterfall.png'),
  ocean: getAssetUrl('assets/previews/ocean.png'),
  path: getAssetUrl('assets/previews/path.png'),
  steps: getAssetUrl('assets/previews/steps.png'),
  tree: getAssetUrl('assets/previews/tree.png'),
  waterfall: getAssetUrl('assets/previews/waterfall.png'),
  hostd: getAssetUrl('assets/previews/hostd.png'),
  renterd: getAssetUrl('assets/previews/renterd.png'),
  walletd: getAssetUrl('assets/previews/walletd.png'),
}

export const patterns = {
  bamboo: getAssetUrl('assets/patterns/bamboo.png'),
  jungle: getAssetUrl('assets/patterns/jungle.png'),
  leaves: getAssetUrl('assets/patterns/leaves.png'),
  light: getAssetUrl('assets/patterns/light.png'),
  mountain: getAssetUrl('assets/patterns/mountain.png'),
  nateBridge: getAssetUrl('assets/patterns/nate-bridge.png'),
  natePath: getAssetUrl('assets/patterns/nate-path.png'),
  nateSnow: getAssetUrl('assets/patterns/nate-snow.png'),
  nateTrickle: getAssetUrl('assets/patterns/nate-trickle.png'),
  nateWaterfall: getAssetUrl('assets/patterns/nate-waterfall.png'),
  ocean: getAssetUrl('assets/patterns/ocean.png'),
  path: getAssetUrl('assets/patterns/path.png'),
  steps: getAssetUrl('assets/patterns/steps.png'),
  tree: getAssetUrl('assets/patterns/tree.png'),
  waterfall: getAssetUrl('assets/patterns/waterfall.png'),
}
