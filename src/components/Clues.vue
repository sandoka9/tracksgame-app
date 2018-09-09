<template>
  <div class="content">
    <div class="content-title"></div>
    <div class="content-subtitle"></div>
    <div class="content-description"></div>
    <div class="content-game"></div>
  </div>
</template>

<script>

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
