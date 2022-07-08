export const routes = {
  home: {
    index: '/',
  },
  tx: {
    // index: '/txs',
    view: '/tx/[id]',
  },
  block: {
    // index: '/blocks',
    view: '/block/[id]',
  },
  address: {
    // index: '/addresses',
    view: '/address/[id]',
  },
  output: {
    view: '/output/[id]',
  },
}

export function getRouteHref(viewRoute: string, id: string) {
  return viewRoute.replace('[id]', id)
}
