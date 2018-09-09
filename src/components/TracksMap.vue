<template>
    <div id="gmap"></div>
</template>

<script>
export default {
  name: 'tracksmap',
  props: ['content'],
  data () {
    return {
      msg: 'Bienvenue sur la map',
      gmap: null,
      latitude: 0,
      longitude: 0,
      center: {lat: this.content.lat, lng: this.content.lng},
      markers: [{position: {lat: this.content.lat, lng: this.content.lng}}],
      mapLoaded: false
    }
  },
  /* eslint-disable */
  mounted () {
    let script = document.createElement('script')
    script.onload = () => {
      //var uluru = {lat: 48.861088, lng: 2.337513}
      console.log('localStorage.gmap ', localStorage.gmap)
      if ( localStorage.gmap === '') {
        this.gmap = new google.maps.Map(document.getElementById('gmap'), {zoom: 12, center: this.center})
        var marker = new google.maps.Marker({position: this.center, title: 'Le Louvre'})
        console.log('marker ini', marker)
        marker.setMap(this.gmap)
        this.geolocate(this.markCurrentPosition)
        let parsedGmap = JSON.stringify(this.gmap);
        localStorage.setItem('gmap', parsedGmap);
        let parsedMarker = JSON.stringify(this.marker);
        localStorage.setItem('marker', parsedMarker);
      } else {
        this.gmap = JSON.parse(localStorage.getItem('gmap'));
        var marker = JSON.parse(localStorage.getItem('marker'));
        console.log('marker loc', marker)
        marker.setMap(this.gmap)
        this.geolocate(this.markCurrentPosition)
      }
    }
    script.async = true
    script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyCxzWsnaV3IY6AfRC3JAv4rsCraKb1T4cM'
    document.head.appendChild(script)
  },
  /* eslint-enable */
  methods: {
    geolocate: function (callback) {
      navigator.geolocation.getCurrentPosition(position => {
        this.latitude = position.coords.latitude
        this.longitude = position.coords.longitude
        callback()
      })
    },
    /* eslint-disable */
    markCurrentPosition: function () {
      var mymarker = new google.maps.Marker({
        icon: 'http://maps.google.com/mapfiles/ms/icons/yellow-dot.png',
        position: {lat: this.latitude, lng: this.longitude},
        title: 'You'})
      mymarker.setMap(this.gmap)
    }
    /* eslint-enable */
  }
}
</script>

<style scoped>
 #gmap {
   width: 90%;
    height: 80vh;
    background-color: grey;
    margin-left: 5%;
 }
</style>
