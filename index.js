const express = require('express')
const asyncHandler = require('express-async-handler')

const getWhitelist = require('./handler/getWhitelist')

// heroku sets port
const PORT = process.env.PORT || 3000
const app = express()

// TODO: error handling middleware that works with async handler?
// app.use(function (err, req, res, next) {
//   console.error(err.stack)
//   res.status(500).send('Woops, something went wrong')
// })

app.get('/whitelist', asyncHandler(getWhitelist))

app.put('/whitelist', (req, res) => res.send('Hello World!'))
app.post('/whitelist', (req, res) => res.send('Hello World!'))

app.post('/log', (req, res) => res.send('Hello World!'))

app.listen(PORT, () => console.log(`Listening on port ${PORT}`))
