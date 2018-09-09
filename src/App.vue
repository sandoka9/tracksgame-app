/* eslint-disable */
<template>

  <div id="app">
    <!--<img src="./assets/logo.png">-->
    <header-component></header-component>
    <router-view/>
    <TracksLog></TracksLog>
  </div>
</template>

<script>
import HeaderComponent from './components/Header.vue'
import TracksLog from './components/TracksLog.vue'

window.tgLogger = require('./services/LogService.js')

export default {
  name: 'App',
  components: {
    HeaderComponent,
    TracksLog
  }
}
</script>

<style>
@import url(https://maxcdn.bootstrapcdn.com/twitter-bootstrap/4.1.1/css/bootstrap.css);
@import url(https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.css);
@import url(https://use.fontawesome.com/releases/v5.2.0/css/all.css);
</style>
