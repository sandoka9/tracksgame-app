// Firebase App is always required and must be first
var firebase = require('firebase/app')
require('firebase/storage')

// var _ = require('lodash')

var config = {
  apiKey: process.env.FIREBASE_API_KEY,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET
}

firebase.initializeApp(config)

// TODO : externalise firebase access

const GAME_DEF_FILE = 'tgame.json'

function GameRepository (storage) {
  this.storage = storage
  this.env = process.env.FIREBASE_ENV || 'dev'
  console.debug('Using ' + this.env + ' firebase environment')
  window.tgLogger.info('Using ' + this.env + ' firebase environment')
  this.storage_env = process.env.STORAGE_ENV || 'loc'
  console.debug('Using ' + this.storage_env + 'storage environment')
  window.tgLogger.info('Using ' + this.storage_env + 'storage environment')
}

GameRepository.prototype.getRootLocalUrl = function getRootLocalUrl () {
  var host = location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : '')
  return host
}

GameRepository.prototype.getLocalResourceUrl = function getLocalResourceUrl (tgId, url) {
  return new Promise((resolve) => {
    var base = tgId + '/public/'
    var resourceUrl = base + url
    resolve(resourceUrl)
  })
}

GameRepository.prototype.getLocalTgDef = function getLocalTgDef (tgId) {
  return new Promise((resolve) => {
    var host = this.getRootLocalUrl()
    var tgDefUrl = host + '/' + tgId + '/public/' + GAME_DEF_FILE
    resolve(tgDefUrl)
  })
}

GameRepository.prototype.getResourceUrl = function getResourceUrl (tgId, url) {
  if (this.storage_env === 'loc') {
    return this.getLocalResourceUrl(tgId, url)
  } else {
    var tgPublicRef = this.getGamePublicRef(tgId)
    var downloadUrl = tgPublicRef.child(url).getDownloadURL()
    return downloadUrl
  }
}

GameRepository.prototype.getResourcesToRewrite = function getResourcesToRewrite (json) {
  let pattern = /"([^"]+(?:jpg|gif|png|mp3|mp4))"/g
  let resources = []
  let match = {}
  // eslint-disable-next-line no-cond-assign
  while (match = pattern.exec(json)) {
    resources.push(match[1])
  }
  return resources
}

GameRepository.prototype.getResourcesToCache = function getResourcesToCache (json) {
  let pattern = /"([^"]+firebasestorage[^"]+)"/g
  let resources = []
  let match = {}
  // eslint-disable-next-line no-cond-assign
  while (match = pattern.exec(json)) {
    resources.push(match[1])
  }
  return resources
}

GameRepository.prototype.resolveUrl = function resolveUrl (tgId, url) {
  return this.getResourceUrl(tgId, url)
    .then(function (newUrl) {
      return new Promise(function (resolve) {
        let replacement = { oldValue: url, newValue: newUrl }
        resolve(replacement)
      })
    })
    .catch(function (error) {
      console.error(error)
      window.tgLogger.error(error)
    })
}

GameRepository.prototype.rewriteUrls = function rewriteUrls (tgId, data) {
  // get static resource whom url is to rewrite
  let json = JSON.stringify(data)
  let resources = this.getResourcesToRewrite(json)
  window.tgLogger.info(resources)
  // get static resources urls; urls is dict with resource name (i.e. as in json) and url
  let urls = resources.map(r => this.resolveUrl(tgId, r))
  return new Promise(function (resolve) {
    return Promise.all(urls).then(function (replacements) {
      window.tgLogger.info('Rewriting urls...')
      replacements.forEach(function (r) {
        if (r !== undefined) {
          // window.tgLogger.info(r.oldValue + ' : ' + r.newValue)
          json = json.replace(r.oldValue, r.newValue)
        }
      })
      window.tgLogger.info('Urls rewrited')
      let data = JSON.parse(json)
      resolve(data)
    })
  })
}

GameRepository.prototype.getJSON = function getJSON (url) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.responseType = 'json'
    xhr.onload = function (event) {
      var json = xhr.response
      resolve(json)
    }
    xhr.onerror = () => reject(xhr.statusText)
    xhr.open('GET', url)
    xhr.send()
  })
}

GameRepository.prototype.getGamePublicRef = function getGamePublicRef (tgId) {
  var envPath = this.env === 'prd' ? this.env : this.env + '/'
  var tgPath = envPath + 'tg' + '/' + tgId
  // get a reference to the desired tracksgame
  var storageRef = this.storage.ref()
  var tgRef = storageRef.child(tgPath)
  var tgPublicRef = tgRef.child('public')
  return tgPublicRef
}

GameRepository.prototype.getTgDefUrl = function getTgDefUrl (tgId) {
  if (this.storage_env === 'loc') {
    return this.getLocalTgDef(tgId)
  } else {
    var tgPublicRef = this.getGamePublicRef(tgId)
    var downloadUrl = tgPublicRef.child(GAME_DEF_FILE).getDownloadURL()
    return downloadUrl
  }
}

GameRepository.prototype.getGame = function getGame (tgId) {
  return new Promise((resolve, reject) => {
    console.debug('Fetching data for game ' + tgId)
    window.tgLogger.info('Fetching data for game ' + tgId)
    var that = this
    return this.getTgDefUrl(tgId)
      .then(url => that.getJSON(url))
      .then(json => this.rewriteUrls(tgId, json))
      .then(data => resolve(data))
      .catch(error => reject(error))
  })
}

GameRepository.prototype.preLoadGameResources = function getGame (tgId) {
  window.tgLogger.info('Preloading resources for game ' + tgId)
  var that = this
  this.getTgDefUrl(tgId)
    .then(url => that.getJSON(url))
    .then(json => that.rewriteUrls(tgId, json))
    .then(function (data) {
      let newJson = JSON.stringify(data)
      window.tgLogger.info(newJson)
      let resources = that.getResourcesToCache(newJson)
      window.tgLogger.info('Resources to preload ' + resources)
      for (var r of resources) {
        if (r.includes('mp3') > 0) {
          window.tgLogger.info('Preloading media ' + r)
          preloadMedia(r)
        } else {
          window.tgLogger.info('Preloading image ' + r)
          new Image().src = r
        }
      }
    })
}

GameRepository.prototype.getGameResources = function getGame (tgId) {
  window.tgLogger.info('Get resources urls for game ' + tgId)
  var that = this
  return this.getTgDefUrl(tgId)
    .then(url => that.getJSON(url))
    .then(json => that.rewriteUrls(tgId, json))
    .then(function (data) {
      let newJson = JSON.stringify(data)
      return that.getResourcesToRewrite(newJson)
    })
}

function preloadMedia (mediaUrl) {
  var req = new XMLHttpRequest()
  req.open('GET', mediaUrl, true)
  req.responseType = 'blob'

  req.onload = function () {
    // Onload is triggered even on 404
    // so we need to check the status code
    if (this.status === 200) {
      var mediaBlob = this.response
      var mediaId = URL.createObjectURL(mediaBlob) // IE10+
      window.tgLogger.info('Object url ' + mediaId + ' created for media ' + mediaUrl)
      // Video is now downloaded
      // and we can set it as source on the video element
      var video = document.createElement('video')
      video.src = mediaId
      var audio = document.createElement('audio')
      audio.src = mediaId
    }
  }
  req.onerror = function (error) {
    window.tgLogger.error('preload of media ' + mediaUrl + 'failed : ' + error)
  }
  req.send()
}

export default new GameRepository(firebase.app().storage())
