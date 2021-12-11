const { GoogleSpreadsheet } = require('google-spreadsheet')

const serviceAccountCredentials =
  process.env.NODE_ENV === 'production'
    ? JSON.parse(process.env.DOOR24_KEY) // is a string, needs to be parsed to JS
    : require(process.env.KEY_FILE_PATH)

const { SHEET_ID } = process.env

class SpreadSheetBackend {
  // GID is found in the worksheet url
  constructor(worksheetGID) {
    this.spreadsheet = new GoogleSpreadsheet(SHEET_ID)
    this.worksheetGID = worksheetGID
    this.credentials = serviceAccountCredentials
  }

  request(callback) {
    console.log('[SpreadSheetBackend] Authenticating with Google Sheets API')
    return new Promise(async (resolve, reject) => {
      await this.spreadsheet.useServiceAccountAuth(this.credentials)
      // We need sheet info to find the worksheet
      console.log('[SpreadSheetBackend] Fetching sheet info')
      try {
        await this.spreadsheet.loadInfo()
        const worksheet = this.spreadsheet.sheetsById[this.worksheetGID]
        return callback(resolve, reject, worksheet)
      } catch (err) {
        console.error('[SpreadSheetBackend] Error fetching sheet:', err)
        reject(err)
      }
    })
  }
}

module.exports = SpreadSheetBackend
