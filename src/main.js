// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import ImgCache from '@chrisben/imgcache.js'

/* eslint-disable no-new */
Vue.config.errorHandler = function (err, vm, info) {
  window.tgLogger.error(err + vm + info)
}

Vue.config.warnHandler = function (msg, vm, trace) {
  window.tgLogger.warn(msg + vm + trace)
}

window.onerror = function (messageOrEvent, source, noligne, nocolonne, erreur) {
  console.log('event on error', messageOrEvent)
  window.tgLogger.error(messageOrEvent + source + noligne + nocolonne + erreur)
}

if (typeof (cordova) !== 'undefined') {
  document.addEventListener('deviceready', onDeviceReady, false)
} else {
  initCache()
}

function onDeviceReady () {
  window.tgLogger.log('Device is ready')
  checkPermissions()
  initCache()
}

/* eslint-disable */
function checkPermissions () {
  cordova.plugins.diagnostic.isCameraAuthorized(
    function (authorized) {
      window.tgLogger.log('App is ' + (authorized ? 'authorized' : 'denied') + ' access to the camera')
      if (!authorized) {
        cordova.plugins.diagnostic.requestCameraAuthorization(
          function (status) {
            window.tgLogger.log('Authorization request for camera use was ' + (status === cordova.plugins.diagnostic.permissionStatus.GRANTED ? 'granted' : 'denied'))
          }, function (error) {
            window.tgLogger.error('The following error occurred: ' + error)
          }, {
              externalStorage: false
          }
        )
      }
    }, function (error) {
      window.tgLogger.error('The following error occurred: ' + error)
    }, {
      externalStorage: false
    }
  )
}
/* eslint-enable */

/* eslint-disable */
function initCache() {
  // write log to console
  ImgCache.options.debug = true
  // simple uri encoding failed for firebase urls
  ImgCache.options.skipURIencoding = true
  // increase allocated space on Chrome to 50MB, default was 10MB
  ImgCache.options.chromeQuota = 50 * 1024 * 1024
  // let browser manage clean cache if required
  ImgCache.options.usePersistentCache = false
  // Instead of using the PERSISTENT or TEMPORARY filesystems, use one of the
  // Cordova File plugin's app directories (https://github.com/apache/cordova-plugin-file#where-to-store-files).
  // ImgCache.options.cordovaFilesystemRoot = cordova.file.cacheDirectory
  ImgCache.init(function () {
    window.tgLogger.debug('ImgCache init: success!')
    // from within this function you're now able to call other ImgCache methods
    // or you can wait for the ImgCacheReady event
  }, function () {
    window.tgLogger.error('ImgCache init: error! Check the log for errors')
  })
}
/* eslint-enable */

// eslint-disable-next-line no-new
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
