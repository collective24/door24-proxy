const GoogleSpreadsheet = require('google-spreadsheet')

const serviceAccountCredentials = process.env.NODE_ENV === 'production'
  ? JSON.parse(process.env.DOOR24_KEY) // is a string, needs to be parsed to JS
  : require(process.env.KEY_FILE_PATH)

const { SHEET_ID } = process.env
const WHITELIST_WORKSHEET_NAME = 'whitelist'

class Whitelist {
  constructor () {
    this.spreadsheet = new GoogleSpreadsheet(SHEET_ID)
  }

  async add (rfid) {
    return new Promise((resolve, reject) => {
      this.spreadsheet.useServiceAccountAuth(serviceAccountCredentials, () => {
        // We need sheet info to find the worksheet index
        console.log('Fetching sheet info')
        this.spreadsheet.getInfo((err, info) => {
          if (err) {
            console.error('Error fething sheet:', err)
            reject(err)
          } else {
            const newRow = { rfid }

            let worksheetIndex
            for (let i = 0; i < info.worksheets.length; i++) {
              if (info.worksheets[i].title === WHITELIST_WORKSHEET_NAME) {
                worksheetIndex = i + 1 // worksheet index starts at 1
                break
              }
            }

            console.log('Adding new row: ', newRow)
            this.spreadsheet.addRow(worksheetIndex, newRow, (err, row) => {
              if (err) {
                console.error('Error adding row:', err)
                reject(err)
              } else {
                console.log('Row added: ', newRow)
                resolve(row)
              }
            })
          }
        })
      })
    })
  }

  async getAll () {
    return new Promise((resolve, reject) => {
      console.log('Authenticating with Google Sheets API')
      this.spreadsheet.useServiceAccountAuth(serviceAccountCredentials, () => {
        console.log('Fetching sheet')
        this.spreadsheet.getInfo((err, info) => {
          if (err) {
            console.error('Error fething sheet:', err)
            reject(err)
          } else {
            const sheet = info.worksheets.find(sheet => sheet.title === WHITELIST_WORKSHEET_NAME)
            console.log('Fetching rows')
            sheet.getRows({}, (err, rows) => {
              if (err) {
                console.error('Error getting rows:', err)
                reject(err)
              } else {
                const whitelistData = rows.map(row => row.rfid).join(',')
                resolve(whitelistData)
              }
            })
          }
        })
      })
    })
  }
}

module.exports = Whitelist
