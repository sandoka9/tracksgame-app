<template>
  <div class="content">
    <div class="content-title">  {{content.title}} </div>
    <div class="content-subtitle">{{content.shortDescription}}</div>
    <div class="content-description">{{content.stepDescription}}</div>
    <div class="content-game">{{content.info}}</div>
  </div>
</template>

<script>

export default {
  name: 'TracksMapIn',
  props: ['content'],
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
  }
}
</script>

<style>
.fa-map-marked-alt {
  color: black;
}

</style>
