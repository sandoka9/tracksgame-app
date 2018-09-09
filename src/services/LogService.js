const tgLogger = {
  logMessage: 'start',
  logDate: new Date(),
  stackMessage: [],
  isDebbugActive: function () {
    if (process.env.NODE_ENV === '"production"') {
      return false
    }
    if (process.env.DEBUG === 'false') {
      return false
    }
    return true
  },
  debug: function (message) {
    if (!this.isDebbugActive() || process.env.LOG_LEVEL > 0) {
      return '' // Do nothing
    }
    console.debug('messDebug', message)
    this.log('debug', message)
  },
  info: function (message) {
    if (!this.isDebbugActive() || process.env.LOG_LEVEL > 1) {
      return '' // Do nothing
    }
    console.info('messInfo', message)
    this.log('info', message)
  },
  warn: function (message) {
    if (!this.isDebbugActive() || process.env.LOG_LEVEL > 2) {
      return '' // Do nothing
    }
    console.warn('messWarn', message)
    this.log('warn', message)
  },
  error: function (message) {
    if (!this.isDebbugActive() || process.env.LOG_LEVEL > 3) {
      return '' // Do nothing
    }
    console.error('messError', message)
    this.log('erro', message)
  },
  critical: function (message) {
    if (!this.isDebbugActive() || process.env.LOG_LEVEL > 4) {
      return '' // Do nothing
    }
    console.log('messCritic', message)
    this.log('crit', message)
  },
  show: function () {
    return this.stackMessage
  },
  log: function (type, msg) {
    this.logMessage = msg
    this.stackMessage.push(type + ' ' + this.logDate.getHours() + ':' + this.logDate.getMinutes() + ' > ' + this.logMessage)
    this.logMessage = ''
  },
  send: function (msg) {
  }
}
module.exports = tgLogger
