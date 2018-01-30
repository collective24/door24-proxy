const express = require('express')
const bodyParser = require('body-parser')
const asyncHandler = require('express-async-handler')

const auth = require('./middleware/auth')

const getWhitelist = require('./handler/getWhitelist')
const addWhitelist = require('./handler/addWhitelist')

// heroku sets port
const PORT = process.env.PORT || 3000
const app = express()

app.use(auth)
app.use(bodyParser.text())

// TODO: error handling middleware that works with async handler?
// app.use(function (err, req, res, next) {
//   console.error(err.stack)
//   res.status(500).send('Woops, something went wrong')
// })

app.get('/whitelist', asyncHandler(getWhitelist))
app.post('/whitelist', asyncHandler(addWhitelist))

app.post('/log', (req, res) => res.send('TODO'))

app.listen(PORT, () => console.log(`Listening on port ${PORT}`))
