const express = require('express')
const asyncHandler = require('express-async-handler')
const { Whitelist } = require('./lib/Whitelist')

const app = express()
const whitelist = new Whitelist()

// TODO: error handling middleware

app.get('/whitelist', asyncHandler(async (req, res, next) => {
  const list = await whitelist.getAll()
  res.setHeader('Content-Type', 'application/json')
  res.json(list)
}))

app.put('/whitelist', (req, res) => res.send('Hello World!'))
app.post('/whitelist', (req, res) => res.send('Hello World!'))

app.post('/log', (req, res) => res.send('Hello World!'))

app.listen(3000, () => console.log('Example app listening on port 3000!'))
