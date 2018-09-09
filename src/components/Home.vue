<template>
  <div class="home-content">
    <div class="content-game" v-for="item in game" :key="item.id">
      <router-link :to="{ name: 'DetailsGame', params: { gameId: item.id } }"><img :src="getImgPath(item.id)" /></router-link>
      <span class="content-game-title"> {{item.title}} </span>
    </div>
  </div>
</template>

<script>
import GameRepository from '../services/GameRepository.js'

export default {
  name: 'Home',
  data () {
    return {
      content: {},
      content2: {},
      game: {}
    }
  },
  created () {
    // clear local storage
    localStorage.clear()
    // init local storage
    localStorage.stepIndex = ''
    localStorage.tgId = ''
    localStorage.cluesFound = ''
    // tgame.json
    localStorage.json = ''
    // gmap
    localStorage.gmap = ''
    localStorage.marker = ''
    // Num Step Done
    localStorage.stepDone = JSON.stringify({})
    // Nb Step Done
    localStorage.stepDoneNb = 0
    // map
    localStorage.enigmaType = ''
    // json home/index
    localStorage.index = {}
    // get home json
    localStorage.color = ''
    localStorage.clues = {}
    localStorage.questions = {}
    this.fetchData()
  },
  computed: {
    // a computed getter
  },
  methods: {
    getImgPath: function (tgIg) {
      // `this` points to the vm instance
      return './' + tgIg + '/public/home/img_S.jpg'
    },
    fetchData: function () {
      // Add local storage json
      var that = this
      GameRepository.getGame('index').then(data => {
        // console.debug(data)
        that.game = data.game
        localStorage.index = JSON.stringify(that.game)
      })
        .catch(error => console.error('toto : ' + error))
    }
  }
}
</script>

<style scoped>

.home-content {
  background-color: black;
  height: 500vw;
}

.content-game {
  width:60vw;
  padding: 4vw;
}

.content-game img {
  width: 50vw;
  border: 0.5vw solid white;
}

.content-game-title {
  color: grey;
  font-weight: bold;
  color: #FBB50C;
}

</style>
