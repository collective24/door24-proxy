module.exports = whitelist => async (req, res, next) => {
  const entry = await whitelist.get(req.params.rfid, { compact: true })
  res.setHeader('Content-Type', 'text/plain')
  res.send(entry || 404)
}
