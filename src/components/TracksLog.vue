<template>
  <div class="content" v-if="isDevMode()">
    <button type="content-button" class="content-button form-control" v-on:click="change()">
            Log
    </button>
    <div class="content-log" v-bind:class="{ active: isActive }"
                              v-on:click="change()">
      <p v-for="(element, index) in logMess" v-bind:key="index">
        <span :class="logStyle(element)">{{element}}</span> <!-- {{errorComp(element)}} -->
      </p>
    </div>
  </div>
</template>

<script>

export default {
  name: 'TracksLog',
  props: [],
  data () {
    return {
      logMess: '',
      isActive: false
    }
  },
  /* eslint-disable */
  created () {
    this.showLog()
  },
  computed: {
  },
  /* eslint-enable */
  methods: {
    change: function () {
      this.isActive = !this.isActive
      this.showLog()
    },
    isDevMode: function () {
      if (process.env.NODE_ENV === '"production"') {
        return false
      }
      return true
    },
    logStyle: function (element) {
      return 'content-log-' + element.substring(0, 4) // Get error type info, warn, erro, crit
    },
    showLog: function () {
      this.logMess = window.tgLogger.show()
      setInterval(this.showLog, 100000)
    }
  }
}
</script>

<style scoped>

.content-button{
  width: 20%;
  position: absolute;
  top: 96%;
  /*
  float: right;
  left: 86%;
  width: 20%;
  position: absolute;
  */
  /*
  top: 60%;
  writing-mode: horizontal-tb;
  transform: rotate(90deg);
  */
}

.content-log{
  display: none;
}

.active{
  z-index: 999;
  background-color: black; /* Yellow violet #93329E*/
  color: grey;
  font-size: 2vw;
  font-family: courier, serif;
  min-height: 15%;
  width: 100%;
  float: left;
  padding: 2%;
  top: 85%;
  position: absolute;
  opacity: 0.9;
  display: block;
  margin: -5%;
}

.content-log-info{
  color: grey;
}

.content-log-warn{
  color: yellow;
}

.content-log-erro{
  color: red;
}

.content-log-crit{
  color: red;
}

</style>
