<template>
  <div class="content">
    <div class="content-title"></div>
    <div class="content-subtitle"></div>
    <div class="content-description">
      <span> Début : </span><span class="content-description-info">{{startDate}}</span>
      <span> Etapes réussies: </span><span class="content-description-info"> {{stepDoneNb}}/{{stepIndexMax}} </span>
      <span> Indices obtenus </span><span class="content-description-info" v-for="item in cluesFound" :key="item" v-if="enigmaType === 'map'"><img :src="item" /></span>
    </div>
    <div class="content-game"></div>
  </div>
</template>

<script>

export default {
  name: 'Info',
  props: {},
  data () {
    return {
      startDate: '',
      stepDone: '',
      stepIndexMax: '',
      cluesFound: '',
      enigmaType: ''
    }
  },
  /* eslint-disable */
  created () {
    // Start game Time
    this.startDate = localStorage.startDate
    // Nb of step already done
    this.stepDoneNb = localStorage.stepDoneNb
    // Total step nb
    this.stepIndexMax = localStorage.stepIndexMax
    // To show clues found
    this.cluesFound = JSON.parse(localStorage.cluesFound)
    // if it is map or question enigme type 
    this.enigmaType = localStorage.enigmaType
  },
  mounted () {
  },
  /* eslint-enable */
  methods: {
  }
}
</script>

<style scoped>

.content-description {
  width: 70vw;
}

.content-description span {
  width: 35vw;
  margin-right: 5vw;
  margin-left: 10vw;
}

.content-description img {
  width: 15vw;
  float: right;
}

</style>
