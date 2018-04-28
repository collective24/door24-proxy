const cron = require('node-cron')
const moment = require('moment')

const DATE_RFC2822_FORMAT = 'ddd MMM DD YYYY HH:mm:ss ZZ'

class GarbageCollector {
  constructor (whitelist) {
    this.whitelist = whitelist
  }
  start () {
    console.log('Scheduling periodical whitelist cleanup')
    // run every 3 hours
    cron.schedule('0 0 0/3 * * * *', this.cleanup.bind(this))
  }

  async cleanup () {
    console.log('Running whitelist cleanup')
    const list = await this.whitelist.getAll()
    list.forEach(item => {
      const addedAt = moment(item.addedat, DATE_RFC2822_FORMAT)
      if (!item.name && addedAt.isValid() && moment().diff(addedAt, 'hours') > 6) {
        console.log(`Whitelist entry with id ${item.rfid} has no name attached and was added > 6 hours ago (${item.addedat})`)
        console.log(`Deleting whitelist entry ${item.rfid}`)
        item.del()
      }
    })
  }
}

module.exports = GarbageCollector
