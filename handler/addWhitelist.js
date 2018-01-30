const Whitelist = require('../lib/Whitelist')
const whitelist = new Whitelist()

module.exports = async (req, res, next) => {
  const newRfid = req.body
  const { rfid } = await whitelist.add(newRfid)
  res.setHeader('Content-Type', 'text/plain')
  res.send(rfid)
}
