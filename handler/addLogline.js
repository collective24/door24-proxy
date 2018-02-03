const Log = require('../lib/Log')
const log = new Log()

module.exports = async (req, res, next) => {
  const rfid = req.body
  await log.add(rfid)
  res.setHeader('Content-Type', 'text/plain')
  res.send(200)
}
