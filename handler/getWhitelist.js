module.exports = whitelist => async (req, res, next) => {
  const list = await whitelist.getAll({ compact: true })
  res.setHeader('Content-Type', 'text/plain')
  res.send(list)
}
