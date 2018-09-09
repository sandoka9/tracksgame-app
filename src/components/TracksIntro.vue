<template>
  <div class="content">
    <div class="content-title">  {{content.title}} </div>
    <div class="content-subtitle">{{content.shortDescription}}</div>
    <div class="content-description">{{content.stepDescription}}</div>
    <div class="content-game">{{content.info}}</div>
  </div>
</template>

<script>

window.tgLogger.log('Step Intro')

export default {
  name: 'TracksIntro',
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

<style scoped>

</style>
