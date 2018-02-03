const SpreadSheetBackend = require('./SpreadSheetBackend')

class Whitelist extends SpreadSheetBackend {
  constructor () {
    super('whitelist')
  }

  async add (rfid) {
    return this.request((resolve, reject, worksheet) => {
      const newRow = { rfid }
      console.log('Adding new row: ', newRow)
      worksheet.addRow(newRow, (err, row) => {
        if (err) {
          console.error('Error adding row:', err)
          reject(err)
        } else {
          console.log('Row added: ', newRow)
          resolve(row)
        }
      })
    })
  }

  async getAll () {
    return this.request((resolve, reject, worksheet) => {
      worksheet.getRows({}, (err, rows) => {
        if (err) {
          console.error('Error getting rows:', err)
          reject(err)
        } else {
          const whitelistData = rows.map(row => row.rfid).join(',')
          resolve(whitelistData)
        }
      })
    })
  }
}

module.exports = Whitelist
