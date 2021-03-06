var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  DEBUG: true,
  LOG_LEVEL: 0,
  FIREBASE_ENV: '"dev"',
  STORAGE_ENV: '"dev"' // 'dev' for firebase | 'loc' for static
})
