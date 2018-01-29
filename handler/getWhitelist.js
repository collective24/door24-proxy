const Whitelist = require('../lib/Whitelist')
const whitelist = new Whitelist()

module.exports = async (req, res, next) => {
  const list = await whitelist.getAll()
  res.setHeader('Content-Type', 'application/json')
  res.json(list)
}
