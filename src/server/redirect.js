const { redirects } = require('../config/redirect')

function setupRedirects(server) {
  redirects.forEach(({ from, to }) => {
    server.get(from, (req, res) => {
      res.redirect(to)
    })
  })
}

module.exports = {
  setupRedirects,
}
