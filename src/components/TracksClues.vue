<template>
  <div class="content">
    <div class="content-title">  {{content.title}} </div>
    <div class="content-subtitle">{{content.shortDescription}}</div>
    <div class="content-description">{{content.stepDescription}}</div>
    <div class="content-img" v-if="content.stepImg !== ''">{{content.stepImg}}</div>
    <div class="content-game">
      <QrcodeReader @decode="onDecode" @init="onInit" >
        <div class="decoded-content"></div>
      </QrcodeReader>
      <div id="qrcode">
      </div>
    </div>
    <div class="content-info">{{content.info}}</div>
    <div class="content-generator">
      <vue-qr :bgSrc='src' :logoSrc="src2" :text="qrcodeMsg" :size="200"></vue-qr>
      <!-- <vue-qr :text="qrcodeMsg" :callback="test" qid="testid"></vue-qr> -->
    </div>
    <div class="content-response">
      <input class="response form-control" type="hidden" name="response" placeholder="content.info" v-model="contentCode" v-on:change="saveNewClues(contentCode)"/><!-- v-on:change="$emit('change', $event.target.value)" -->
      <span>{{content.winMsg}}</span>
    </div>

  </div>
</template>

<script>
import { QrcodeReader } from 'vue-qrcode-reader'
import VueQr from 'vue-qr'

export default {
  name: 'TracksClues',
  props: {
    content: {}
  },
  /* mixins: [ InitHandler ], */
  data () {
    return {
      msg: 'Bienvenue sur la map',
      contentCode: '',
      qrcodeMsg: ''
    }
  },
  /* eslint-disable */
  mounted: function () {
    this.qrcodeMsg = localStorage.cluesFound
  },
  /* eslint-enable */
  methods: {
    codeArrived (event) {
    },
    onDecode (contentCode) {
      this.contentCode = contentCode
      this.saveNewClues(this.contentCode)
    },
    async onInit (promise) {
    // show loading indicator

      try {
        await promise

        // successfully initialized
      } catch (error) {
        if (error.name === 'NotAllowedError') {
          // user denied camera access permisson
        } else if (error.name === 'NotFoundError') {
          // no suitable camera device installed
        } else if (error.name === 'NotSupportedError') {
          // page is not served over HTTPS (or localhost)
        } else if (error.name === 'NotReadableError') {
          // maybe camera is already in use
        } else if (error.name === 'OverconstrainedError') {
          // passed constraints don't match any camera. Did you requested the front camera although there is none?
        } else {
          // browser is probably lacking features (WebRTC, Canvas)
        }
      } finally {
        // hide loading indicator
      }
    },
    test (dataUrl, id) {
      // console.log('localStorage.cluesFound' + localStorage.cluesFound)
    },
    saveNewClues (msg) {
      if (typeof (msg) === 'undefined') {
        return
      }
      let cluesAlreadyFound = JSON.parse(localStorage.cluesFound)
      let cluesNew = JSON.parse(msg)
      for (var prop1 in cluesNew) {
        if (typeof (cluesAlreadyFound[prop1]) === 'undefined') {
          cluesAlreadyFound[prop1] = cluesNew[prop1]
        }
      }
      localStorage.cluesFound = JSON.stringify(cluesAlreadyFound)
    }
  },
  model: {
    event: 'change'
  },
  components: {
    QrcodeReader,
    VueQr
  }
}
</script>

<style scoped>

.content-game {
    width: 70vw;
    margin-left: 10vw;
    font-size: 5vw;
}

.decoded-content {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  width: 320;
  max-width: 100%;
  padding: 0px 20px;
  color: #fff;
  font-weight: bold;
  padding: 10px;
  background-color: rgba(0,0,0,.5);
}

.qrcode-reader {
  display: block;
  width: 40vw;
}

.qrcode-reader__tracking-layer {
    z-index: 20;
    font-size: 10vw;
    font-weight: bold;
}

.radiobtn {
    top: 0;
    left: 0;
    width: 40px;
    height: 40px;
    background-color: #eee;
    border-radius: 50%;
}

.content-generator {
  margin-left: 8vw;
  width: 40vw;
}

.content-response{

}

.form-control-sm {
  max-height: 0.5vh;
  max-width: 100%;
}

.form-control {
  max-width: 50vh;
  margin-top: 5vh;
  margin-left: 8vh;
}

.response {
  margin-right: 5vh;
  max-width: 35vh;
  font-size: 1rem;
}

</style>
