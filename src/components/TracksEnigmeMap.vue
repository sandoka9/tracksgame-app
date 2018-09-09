<template>
  <div class="content">
    <div class="content-title">  {{content.title}} </div>
    <div class="content-subtitle">{{content.shortDescription}}</div>
    <div class="content-description">{{content.stepDescription}}</div>
    <div class="content-game" v-for="item in content.info" :key="item.indice" >
            <img :src="cluesFound[item.indice]" />
    </div>
    <div  class="content-response"> <!--  v-if="stepIndex == 6 || stepIndex == 7 " -->
      <button type="button" class="content-response-button form-control"
      v-bind:class="{disabled:isActive()}" :disabled="isActive()" v-on:click="$emit('moreIndex')">
              {{content.nextText}}
      </button>
    </div>
  </div>
</template>

<script>

export default {
  name: 'TracksEnigmeMap',
  props: {
    content: Object,
    cluesFound: Object,
    cluesKey: String,
    stepIndexEnd: Boolean
  },
  data () {
    return {
      msg: 'Bienvenue sur la map',
      showclues: false,
      gmap: null,
      latitude: 0,
      longitude: 0,
      center: {lat: 48.861088, lng: 2.337513}, // this.content.lat, this.content.lng
      markers: [{position: {lat: 48.861088, lng: 2.337513}}],
      mapLoaded: false,
      placeFound: false,
      x: this.content.lat,
      y: this.content.long
    }
  },
  /* eslint-disable */
  mounted () {
    this.getLocation()
    this.cluesFound = JSON.parse(localStorage.cluesFound)
  },
  /* eslint-enable */
  methods: {
    isActive: function () {
      if (this.cluesKey !== '' && this.stepIndexEnd === false) {
        return false
      } else {
        return true
      }
    },
    /* eslint-disable */
    markCurrentPosition: function () {
      console.log(this.latitude, this.x+0.001, this.longitude,this.y+0.001)
      console.log(this.latitude > this.x - 0.1, this.latitude < this.x + 0.1, this.longitude > this.y - 0.1, this.longitude < this.y + 0.1)
      if (this.latitude > this.x - 0.1 && this.latitude < this.x + 0.1 && this.longitude > this.y - 0.1 && this.longitude < this.y + 0.1){
        console.log('WIN')
        this.content.response = true
        this.$emit('nextStep')
      }
    },
    getLocation: function () {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.showPosition);
        } else {
            x.innerHTML = "Geolocation is not supported by this browser.";
        }
    },
    showPosition: function (position) {
        this.latitude = position.coords.latitude
        this.longitude = position.coords.longitude
        this.markCurrentPosition()
    }
  },
  model: {
    event: 'change'
  }
}
</script>

<style scoped>
#gmap {
  width: 0.1;
  height: 0.1;
  background-color: grey;
}

.content-game{
  margin: 0.25vh;
  list-style: none;
  display: inline;
  font-size: 5vw;
}

.content-game img{
  width: 31%;
  height: 10vh;
  margin-top: 0.2vh;
}

.content-response{
  margin-top: 20%
}

.content-response-button{
  background-color: #93329E; /* Violet */
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 4vw;
  width: 100%;
  border-radius: 2px;
  -webkit-transition-duration: 0.4s; /* Safari */
  transition-duration: 0.4s;
}

.content-response-button:hover{
  background-color: grey; /* Green */
  color: white;
}

.disabled {
    opacity: 0.6;
    cursor: not-allowed;
}

</style>
