const SpreadSheetBackend = require('./SpreadSheetBackend')
const DateUtil = require('../util/DateUtil')

class Log extends SpreadSheetBackend {
  constructor () {
    super(990867482)
  }

  add () {
    return this.request(async (resolve, reject, worksheet) => {
      const newRow = { timestamp: DateUtil.now() }

      try {
        const row = await worksheet.addRow(newRow)
        console.log('[Log] Log row added: ', newRow)
        resolve(row)
      } catch (err) {
        console.error('[Log] Error adding log row:', err)
        reject(err)
      }
    })
  }
}

module.exports = Log
