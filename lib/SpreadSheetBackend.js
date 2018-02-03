const GoogleSpreadsheet = require('google-spreadsheet')

const serviceAccountCredentials = process.env.NODE_ENV === 'production'
  ? JSON.parse(process.env.DOOR24_KEY) // is a string, needs to be parsed to JS
  : require(process.env.KEY_FILE_PATH)

const { SHEET_ID } = process.env

class SpreadSheetBackend {
  constructor (worksheetName) {
    this.spreadsheet = new GoogleSpreadsheet(SHEET_ID)
    this.worksheetName = worksheetName
    this.credentials = serviceAccountCredentials
  }

  request (callback) {
    console.log('Authenticating with Google Sheets API')
    return new Promise((resolve, reject) => {
      this.spreadsheet.useServiceAccountAuth(this.credentials, () => {
        // We need sheet info to find the worksheet
        console.log('Fetching sheet info')
        this.spreadsheet.getInfo((err, info) => {
          if (err) {
            console.error('Error fething sheet:', err)
            reject(err)
          } else {
            const worksheet = info.worksheets.find(sheet => sheet.title === this.worksheetName)
            return callback(resolve, reject, worksheet)
          }
        })
      })
    })
  }
}

module.exports = SpreadSheetBackend
