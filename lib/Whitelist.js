const SpreadSheetBackend = require('./SpreadSheetBackend')

class Whitelist extends SpreadSheetBackend {
  constructor () {
    super('whitelist')
  }

  getRows (reject, worksheet, callback) {
    worksheet.getRows({}, (err, rows) => {
      if (err) {
        console.error('Error getting rows:', err)
        reject(err)
      } else {
        callback(rows)
      }
    })
  }

  /**
   * Add new rfid to whitelist. Does not allow duplicates.
   * @param {String} rfid
   */
  async add (rfid) {
    return this.request((resolve, reject, worksheet) => {
      this.getRows(reject, worksheet, rows => {
        const exists = rows.find(row => row.rfid === rfid)
        if (exists) {
          console.log('Rfid already in whitelist:', rfid)
          // we don't need to inform the caller that the rfid exists, so we just return it
          return resolve(exists)
        }
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
    })
  }

  /**
   * Get rfid and name
   * @param {String} rfid
   */
  async get (rfid) {
    return this.request((resolve, reject, worksheet) => {
      this.getRows(reject, worksheet, rows => {
        const row = rows.find(row => row.rfid === rfid)
        let result
        if (row) {
          result = row.rfid + (row.name ? `,${row.name}` : '')
        }
        resolve(result)
      })
    })
  }

  /**
   * Get all ids as a comma joined string
   */
  async getAll () {
    return this.request((resolve, reject, worksheet) => {
      this.getRows(reject, worksheet, rows => {
        const whitelistData = rows.map(row => row.rfid).join(',')
        resolve(whitelistData)
      })
    })
  }
}

module.exports = Whitelist
