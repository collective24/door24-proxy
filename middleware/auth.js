module.exports = function (req, res, next) {
  if (req.headers.authorization === process.env.AUTH_TOKEN) {
    next()
  } else {
    res.send(401)
  }
}
