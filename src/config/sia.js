const current = process.env.SIA_CURRENT || '1.5.5'
const rc = process.env.SIA_RC || '1.5.5'

module.exports = {
  version: {
    current,
    rc,
  },
}
