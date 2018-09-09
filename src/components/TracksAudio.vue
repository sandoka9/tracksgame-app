<template>
  <div class="content">
    <div class="content-title">  {{content.title}} </div>
    <div class="content-subtitle">{{content.shortDescription}}</div>
    <div class="content-description">{{content.stepDescription}}</div>
    <div class="content-info">{{content.info}}</div>
    <div class="content-game" >
      <label>
        <audio class="content-game-audio" controls>
          <source src="horse.ogg" type="audio/ogg">
          <source :src="content.src" type="audio/mpeg">
        Your browser does not support the audio element.
        </audio>
      </label>
    </div>
    <div class="content-response">
      <input class="response form-control" type="text" name="response" placeholder="Qui suis je ?" v-model="content.response" v-on:change="$emit('change', $event.target.value)"/>
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
      msg: 'Bienvenue sur la map'
    }
  },
  /* eslint-disable */
  mounted () {
  },
  /* eslint-enable */
  methods: {
    playSound (sound) {
      if (sound) {
        var audio = new Audio(sound)
        audio.play()
      }
    }
  },
  model: {
    event: 'change'
  }
}
</script>

<style scoped>

.audio {
  margin-top: 10vh;
}

.content-game{
  width: 100%;
  margin-top:10%;
  font-size: 5vw;
}

.content-game-audio{
  margin-left: 7vw;
  margin-top: 10vw;
  width: 230px;

}

.form-control-sm {
  max-height: 0.5vh;
  max-width: 100%;
}

.form-control {
  max-width: 50vh;
  margin-top: 10vh;
  margin-left: 8vh;
}

.content-response {
  margin-top: -10vw;
}
.response {
  margin-right: 5vh;
  max-width: 35vh;
  font-size: 1rem;
}

</style>
