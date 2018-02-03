const express = require('express')
const bodyParser = require('body-parser')
const asyncHandler = require('express-async-handler')

const auth = require('./middleware/auth')

const getWhitelist = require('./handler/getWhitelist')
const addWhitelist = require('./handler/addWhitelist')
const addLogline = require('./handler/addLogline')

// heroku sets port
const PORT = process.env.PORT || 3000
const app = express()

app.use(auth)
app.use(bodyParser.text())

app.get('/whitelist', asyncHandler(getWhitelist))
app.post('/whitelist', asyncHandler(addWhitelist))
app.post('/log', asyncHandler(addLogline))

app.listen(PORT, () => console.log(`Listening on port ${PORT}`))
