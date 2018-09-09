<template>
  <div class="content">
    <div class="content-title">  {{content.title}} </div>
    <div class="content-subtitle">{{content.shortDescription}}</div>
    <div class="content-description">{{content.stepDescription}}</div>
    <div class="content-info">{{content.info}}</div>
    <div class="content-game">
      <video width="290" height="240" controls>
        <!-- <source :src="content.src" type="video/mp4"> -->
          <!-- Exemple : -->
          <source src="../../static/rBnjvYj5K/public/MOV_1109.mp4" type="video/mp4">
        <!--<source src={{this.content.src}} type="video/ogg">-->
        Your browser does not support the video tag.
      </video>
        <div class="content-response">
        <input class="response form-control" type="text" name="response" placeholder="Qui suis je ?" v-model="content.response" v-on:change="$emit('change', $event.target.value)"/>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'TracksQcm',
  props: {
    content: {}
  },
  data () {
    return {
      msg: 'Bienvenue sur la map',
      playerOptions: {
        // videojs options
        muted: true,
        language: 'en',
        playbackRates: [0.7, 1.0, 1.5, 2.0],
        sources: [{
          type: 'video/mp4',
          src: this.content.src
        }],
        poster: this.content.poster
      }
    }
  },
  components: {
  },
  computed: {
  },
  methods: {
  },
  watch: {
  },
  model: {
    event: 'change'
  }
}
</script>

<style scoped>

html {
  box-sizing: border-box;
}
*, *:before, *:after {
  box-sizing: inherit;
}

button {
  margin-top: 6em;
  margin-left: 10em;
}

.content-game{
  margin-top: -30vw;
  font-size: 5vw;
}

.content-response{
  margin-top: 10%;
}

.form-control-sm {
  max-height: 0.5vh;
  max-width: 100%;
}

.form-control {
  max-width: 50vh;
  margin-left: 8vh;
}

.response {
  margin-right: 5vh;
  max-width: 35vh;
  font-size: 1rem;
}

</style>
