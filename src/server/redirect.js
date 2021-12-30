import { redirects } from '../config/redirect.js'

export function setupRedirects(server) {
  redirects.forEach(({ from, to }) => {
    server.get(from, (req, res) => {
      res.redirect(to)
    })
  })
}
