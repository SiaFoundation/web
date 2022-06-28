function isDev() {
  return process.env.NODE_ENV === 'development'
}

// Used to bind vhosts and route requests.
export function getHostnames() {
  return {
    app: process.env.HOST_APP || (isDev() ? 'localhost' : 'sia.tech'),
    api: process.env.HOST_API || (isDev() ? 'api.localhost' : 'api.sia.tech'),
  }
}
