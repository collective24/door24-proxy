const GoogleSpreadsheet = require('google-spreadsheet')

let serviceAccountCredentials
if (process.env.NODE_ENV === 'production') {
  serviceAccountCredentials = process.env.DOOR24_KEY
} else {
  serviceAccountCredentials = require(process.env.KEY_FILE_PATH)
}

const { SHEET_ID } = process.env
const WHITELIST_WORKSHEET_NAME = 'whitelist'

class Whitelist {
  constructor () {
    this.spreadsheet = new GoogleSpreadsheet(SHEET_ID)
  }
  async getAll () {
    return new Promise((resolve, reject) => {
      this.spreadsheet.useServiceAccountAuth(serviceAccountCredentials, () => {
        this.spreadsheet.getInfo((err, info) => {
          if (err) {
            console.error('Error fething sheet:', err)
            reject(err)
          } else {
            const sheet = info.worksheets.find(sheet => sheet.title === WHITELIST_WORKSHEET_NAME)
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
