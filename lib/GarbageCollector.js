const cron = require('node-cron')
const DateUtil = require('../util/DateUtil')

// Expiry time for un-named added cards
const TTL_HOURS = 12

class GarbageCollector {
  constructor (whitelist) {
    this.whitelist = whitelist
  }

  /**
   * Schedule a cleanup cron
   */
  start () {
    console.log('[GarbageCollector] Scheduling periodical whitelist cleanup')
    // run every 3 hours
    cron.schedule('0 0 0/3 * * * *', this.cleanup.bind(this))
  }

  /**
   * Clean up invalid whitelist entries
   * @param {String} timenow Optional - Use in test to set time manually
   */
  async cleanup (timenow = undefined) {
    console.log('[GarbageCollector] Running whitelist cleanup')
    const list = await this.whitelist.getAll()
    if (list && list.length) {
      const now = timenow ? DateUtil.parse(timenow) : DateUtil.now()
      list.forEach(item => {
        const addedAt = DateUtil.parse(item.addedat)
        if (!item.name && addedAt.isValid() && now.diff(addedAt, 'hours') > TTL_HOURS) {
          console.log(`[GarbageCollector] Whitelist entry with id ${item.rfid} has no name attached and was added > 6 hours ago (${item.addedat})`)
          console.log(`[GarbageCollector] Deleting whitelist entry ${item.rfid}`)
          item.del()
        }
      })
    }
  }
}

module.exports = GarbageCollector
