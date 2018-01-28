const express = require('express')
const GoogleSpreadsheet = require('google-spreadsheet')

const app = express()
const SHEET_ID = process.env.SHEET_ID
const WHITELIST_WORKSHEET = 'whitelist'
const serviceAccountCredentials = require(process.env.KEY_FILE_PATH)
const doc = new GoogleSpreadsheet(SHEET_ID)

app.get('/whitelist', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  doc.useServiceAccountAuth(serviceAccountCredentials, () => {
    doc.getInfo((err, info) => {
      const sheet = info.worksheets[0]
      sheet.getRows({}, (err, rows) => {
        const json = rows.map(row => ({
          rfid: row.rfid,
          name: row.name
        }))
        res.send(JSON.stringify(json))
      })
    })
  })
})

app.put('/whitelist', (req, res) => res.send('Hello World!'))
app.post('/whitelist', (req, res) => res.send('Hello World!'))

app.post('/log', (req, res) => res.send('Hello World!'))

app.listen(3000, () => console.log('Example app listening on port 3000!'))
