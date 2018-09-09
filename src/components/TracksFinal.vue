<template>
  <div class="content">
    <div class="content-title">  {{content.title}} </div>
    <div class="content-subtitle">{{content.shortDescription}}</div>
    <div class="content-description">{{content.stepDescription}}</div>
    <div class="content-info">{{content.info}}</div>
  </div>
</template>

<script>

export default {
  name: 'TracksIntro',
  props: ['content'],
  data () {
    return {
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
