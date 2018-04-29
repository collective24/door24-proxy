const GarbageCollector = require('../lib/GarbageCollector')

module.exports = whitelist => async (req, res, next) => {
  const gc = new GarbageCollector(whitelist)
  await gc.cleanup()
  res.setHeader('Content-Type', 'text/plain')
  res.sendStatus(200)
}
