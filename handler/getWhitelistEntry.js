const Whitelist = require('../lib/Whitelist')
const whitelist = new Whitelist()

module.exports = async (req, res, next) => {
  const entry = await whitelist.get(req.params.rfid)
  res.setHeader('Content-Type', 'text/plain')
  res.send(entry || 404)
}
