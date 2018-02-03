const SpreadSheetBackend = require('./SpreadSheetBackend')

class Log extends SpreadSheetBackend {
  constructor () {
    super('log')
  }

  add (rfid) {
    return this.request((resolve, reject, worksheet) => {
      const newRow = { rfid, timestamp: new Date() }
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
}

module.exports = Log
