export function getApi(route: string) {
  return process.env['NODE_ENV'] === 'production'
    ? route
    : `http://localhost:8080${route}`
}
