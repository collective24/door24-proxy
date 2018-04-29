const express = require('express')
const bodyParser = require('body-parser')
const asyncHandler = require('express-async-handler')

const auth = require('./middleware/auth')

const Whitelist = require('./lib/Whitelist')
const whitelist = new Whitelist()

const getWhitelist = require('./handler/getWhitelist')(whitelist)
const getWhitelistEntry = require('./handler/getWhitelistEntry')(whitelist)
const addWhitelist = require('./handler/addWhitelist')(whitelist)
const addLogline = require('./handler/addLogline')
const cleanup = require('./handler/cleanup')(whitelist)

// heroku sets port
const PORT = process.env.PORT || 3000
const app = express()

app.use(auth)
app.use(bodyParser.text())

app.get('/whitelist', asyncHandler(getWhitelist))
app.get('/whitelist/:rfid', asyncHandler(getWhitelistEntry))
app.post('/whitelist', asyncHandler(addWhitelist))
app.post('/log', asyncHandler(addLogline))
app.post('/cleanup', asyncHandler(cleanup))

app.listen(PORT, () => console.log(`[index.js] Listening on port ${PORT}`))
