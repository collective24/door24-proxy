const express = require('express')
const GoogleSpreadsheet = require('google-spreadsheet')

const app = express()
const { SHEET_ID, KEY_FILE_PATH } = process.env
const WHITELIST_WORKSHEET_NAME = 'whitelist'
const serviceAccountCredentials = require(KEY_FILE_PATH)
const doc = new GoogleSpreadsheet(SHEET_ID)

app.get('/whitelist', (req, res) => {
  res.setHeader('Content-Type', 'application/json')
  doc.useServiceAccountAuth(serviceAccountCredentials, () => {
    doc.getInfo((err, info) => {
      if (err) {
        console.error('Error fething sheet:', err)
      } else {
        const sheet = info.worksheets.find(sheet => sheet.title === WHITELIST_WORKSHEET_NAME)
        sheet.getRows({}, (err, rows) => {
          if (err) {
            console.error('Error getting rows:', err)
          } else {
            const json = rows.map(row => ({
              rfid: row.rfid,
              name: row.name
            }))
            res.send(JSON.stringify(json))
          }
        })
      }
    })
  })
})

app.put('/whitelist', (req, res) => res.send('Hello World!'))
app.post('/whitelist', (req, res) => res.send('Hello World!'))

app.post('/log', (req, res) => res.send('Hello World!'))

app.listen(3000, () => console.log('Example app listening on port 3000!'))
