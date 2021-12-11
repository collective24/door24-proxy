const SpreadSheetBackend = require('./SpreadSheetBackend')
const DateUtil = require('../util/DateUtil')
const { _getRows } = require('../util/PromisifiedFunctions')

class Whitelist extends SpreadSheetBackend {
  constructor() {
    super(0)
  }

  getRows(reject, worksheet, callback) {
    _getRows(reject, worksheet, callback)
  }

  /**
   * Add new rfid to whitelist. Does not allow duplicates.
   * @param {String} rfid
   */
  async add(rfid) {
    return this.request((resolve, reject, worksheet) => {
      this.getRows(reject, worksheet, async (rows) => {
        const exists = rows.find((row) => row.rfid === rfid)
        if (exists) {
          console.log('[Whitelist] Rfid already in whitelist:', rfid)
          // we don't need to inform the caller that the rfid exists, so we just return it
          return resolve(exists)
        }
        const newRow = { rfid, added_at: DateUtil.now() }
        console.log('[Whitelist] Adding new row: ', newRow)

        try {
          const row = await worksheet.addRow(newRow)
          console.log('[Whitelist] Row added: ', newRow)
          resolve(row)
        } catch (err) {
          console.error('[Whitelist] Error adding row:', err)
          reject(err)
        }
      })
    })
  }

  /**
   * Get rfid and name
   * @param {String} rfid
   * @param {Object} options - { compact: true } Get id and name as a comma joined string
   * */
  async get(rfid, options = {}) {
    return this.request((resolve, reject, worksheet) => {
      this.getRows(reject, worksheet, (rows) => {
        const row = rows.find((row) => row.rfid === rfid)
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
  async getAll(options = {}) {
    return this.request((resolve, reject, worksheet) => {
      this.getRows(reject, worksheet, (rows) => {
        let whitelist
        if (options.compact) {
          whitelist = rows.map((row) => row.rfid).join(',')
        } else {
          whitelist = rows
        }
        resolve(whitelist)
      })
    })
  }
}

module.exports = Whitelist
