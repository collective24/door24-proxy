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

const GarbageCollector = require('./lib/GarbageCollector')
const gc = new GarbageCollector(whitelist)
gc.start()

// heroku sets port
const PORT = process.env.PORT || 3000
const app = express()

app.use(auth)
app.use(bodyParser.text())

app.get('/whitelist', asyncHandler(getWhitelist))
app.get('/whitelist/:rfid', asyncHandler(getWhitelistEntry))
app.post('/whitelist', asyncHandler(addWhitelist))
app.post('/log', asyncHandler(addLogline))

app.listen(PORT, () => console.log(`Listening on port ${PORT}`))
