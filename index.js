const express = require('express')
const asyncHandler = require('express-async-handler')

const getWhitelist = require('./handler/getWhitelist')

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

app.listen(3000, () => console.log('Example app listening on port 3000!'))
