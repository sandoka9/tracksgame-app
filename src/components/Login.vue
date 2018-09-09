<!-- Not used -->
<template>
  <div class="login-container">
    <img src="img/login.png" />
    <form>
      <div class="input-group">
        <input type="text" class="form-control" placeholder="Pseudo" aria-describedby="basic-addon1">
      </div>
      <div class="input-group">
        <input type="text" class="form-control" id="gameId" placeholder="Game Id" aria-describedby="basic-addon1" @blur="getId()">
      </div>
      <div class="input-group">
        <button class="form-control" aria-describedby="basic-addon1" value="GO !" type="submit" @click="getId()">
          <router-link :to="{ name: 'Steps', params: { gameId: fbGameId } }">
           GO !
          </router-link>
        </button>
      </div>
    </form>
  </div>
</template>

<script>

export default {
  name: 'Login',
  data () {
    return {
      msg: 'Bienvenu sur la page Login',
      fbGameId: '',
      defaultGame: 'rBnjvYj5K'
    }
  },
  methods: {
    getId: function () {
      var gameChoice = document.getElementById('gameId')
      this.fbGameId = gameChoice.value
      if (this.fbGameId === '') {
        this.fbGameId = this.defaultGame
        window.tgLogger.info('Game Id empty => Default Game')
      }
    }
  },
  mounted: function () {
    this.$nextTick(function () {
      // Code that will run only after the
      // entire view has been rendered
      window.tgLogger.info('Login')
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

img {
  max-height: 70vh;
}

.input-group{
  background-color: white;
  opacity:0.8;
  text-align: center;
}

.login-container{
  background-color: #aeaf9f;
  min-height: 100vh;
  background-color: 0 0 255 0.5;
}

.input-group > .form-control {
    font-size: large;
    font-weight: bold;
}

</style>
