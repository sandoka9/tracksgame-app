<template>
  <div class="content">
    <div class="content-title">  {{content.title}} </div>
    <div class="content-subtitle">{{content.shortDescription}}</div>
    <div class="content-description">{{content.stepDescription}}</div>
    <div class="content-game"  v-for="item in content.info" :key="item.indice" >
      {{item.text}}
      <!-- {{cluesFound[item.indice]}} -->
      <input type="text" class="input-solution" name="btn-item.indice" v-model="cluesFound[item.indice]" />
      <!-- <input type="text" class="input-solution" name="item.indice" v-if="typeof(cluesFound.key) !== 'undefined'"  v-model="cluesFound.key"  />
      <input type="text" class="input-solution" name="item.indice" v-else  /> -->
    </div>
    <div class="content-response">
      <input class="response form-control" type="text" name="response" placeholder="Qui suis je ?" v-model="content.response" v-on:change="$emit('change', $event.target.value)"/>
      <button type="button" class="content-response-button form-control"
      v-bind:class="{disabled:isActive()}" :disabled="isActive()" v-on:click="$emit('moreIndex')">
              Découvrir de nouveaux indices
      </button>
    </div>
  </div>
</template>

<script>

export default {
  name: 'TracksIntro',
  props: {
    content: Object,
    cluesFound: Object,
    cluesKey: String,
    stepIndexEnd: Boolean
  },
  data () {
    return {
      msg: 'Bienvenue sur la map',
      showclues: false
    }
  },
  /* eslint-disable */
  mounted () {
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
    }
  },
  model: {
    event: 'change'
  }
}
</script>

<style scoped>

.content-game{
  margin: 0.25vh;
  list-style: none;
  display: inline;
  line-height: 10vw;
  font-size: 5vw;
}

.content-game img{
  width: 31%;
  height: 10vh;
  margin-top: 0.2vh;
}

.form-control-sm {
  max-height: 0.5vh;
  max-width: 100%;
}

.form-control {
  margin-left: 8vh;
  margin-bottom: 2%;
  margin-top: 5%
}

.response {
  margin-right: 5vh;
  max-width: 35vh;
  font-size: 1rem;
}

input.input-solution {
  border: none;
  font-size: 4vw;
  background-color: rgba(251, 181, 12, 0.5);
  font-weight: bold;
  text-align: center;
  vertical-align: sub;
  max-height: 8vw;
}

.content-response{
  margin-top: 5%
}

.content-response-button{
  background-color: rgba(3, 215, 249, 0.37);
  border: none;
  /* padding: 15px 32px; */
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 4vw;
  width: 55%;
  border-radius: 4px;
  -webkit-transition-duration: 0.4s;
  transition-duration: 0.4s;
  font-weight: bold;
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
