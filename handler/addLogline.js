const Log = require('../lib/Log')
const log = new Log()

module.exports = async (req, res, next) => {
  await log.add()
  res.setHeader('Content-Type', 'text/plain')
  res.sendStatus(200)
}
