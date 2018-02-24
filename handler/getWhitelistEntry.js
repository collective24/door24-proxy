module.exports = whitelist => async (req, res, next) => {
  const entry = await whitelist.get(req.params.rfid)
  res.setHeader('Content-Type', 'text/plain')
  res.send(entry || 404)
}
