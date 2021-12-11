async function _getRows(reject, worksheet, callback) {
  try {
    const rows = await worksheet.getRows()
    callback(rows)
  } catch (err) {
    console.error('[Whitelist] Error getting rows:', err)
    reject(err)
  }
}

module.exports = { _getRows }
