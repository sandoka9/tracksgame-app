// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

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

document.addEventListener('deviceready', onDeviceReady, false)

/* eslint-disable */
function onDeviceReady () {
  window.tgLogger.log('Device is ready')
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

// eslint-disable-next-line no-new
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
