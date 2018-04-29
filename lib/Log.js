const SpreadSheetBackend = require('./SpreadSheetBackend')

class Log extends SpreadSheetBackend {
  constructor () {
    super('log')
  }

  add (rfid) {
    return this.request((resolve, reject, worksheet) => {
      const newRow = { rfid, timestamp: new Date() }
      worksheet.addRow(newRow, (err, row) => {
        if (err) {
          console.error('[Log] Error adding log row:', err)
          reject(err)
        } else {
          console.log('[Log] Log row added: ', newRow)
          resolve(row)
        }
      })
    })
  }
}

module.exports = Log
