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
                const whitelistData = rows.map(row => ({
                  rfid: row.rfid,
                  name: row.name
                }))
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
