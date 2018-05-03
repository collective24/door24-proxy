const moment = require('moment')
require('moment-timezone')

// normally you would store time in UTC
// but since it's stored in a google spreadsheet it's
// much more user friendly to use local time
// and potential issues with that are low risk.
const TIMEZONE = 'Europe/Stockholm'
// This format is supported by google spreadsheets
moment.defaultFormat = 'YYYY-MM-DD HH:mm:ss'
// generally bad practice to override this function
// but toString() is automatically called before
// data is converted to a json string. This will ensure
// the right format.
moment.fn.toString = function () {
  return this.format()
}

class DateUtil {
  /**
   * Get local time
   */
  static now () {
    return moment().tz(TIMEZONE)
  }

  /**
   * Parse local time string
   * @param {String} time - Assumes local timezone
   */
  static parse (time) {
    return moment.tz(time, TIMEZONE)
  }
}

module.exports = DateUtil
