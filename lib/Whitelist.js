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
        const newRow = { rfid, added_at: new Date() }
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
   * @param {Object} options - { compact: true } Get id and name as a comma joined string
   * */
  async get (rfid, options = {}) {
    return this.request((resolve, reject, worksheet) => {
      this.getRows(reject, worksheet, rows => {
        const row = rows.find(row => row.rfid === rfid)
        let entry
        if (row) {
          if (options.compact) {
            entry = row.rfid + (row.name ? `,${row.name}` : '')
          } else {
            entry = row
          }
        }
        resolve(entry)
      })
    })
  }

  /**
   * Get full whitelist
   * @param {Object} options - { compact: true } Get ids as a comma joined string
   */
  async getAll (options = {}) {
    return this.request((resolve, reject, worksheet) => {
      this.getRows(reject, worksheet, rows => {
        let whitelist
        if (options.compact) {
          whitelist = rows.map(row => row.rfid).join(',')
        } else {
          whitelist = rows
        }
        resolve(whitelist)
      })
    })
  }
}

module.exports = Whitelist
