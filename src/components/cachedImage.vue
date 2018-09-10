<template>
  <div class="content">
  <img id="imageId" :src="targetSrc" />
  </div>
</template>

<script>
export default {
  name: 'cachedImage',
  props: {
    targetSrc: String
  },
  data () {
    return {
    }
  },
  /* eslint-disable */
  created () {
    useCachedImage()
  },
  mounted () {
  },
  /* eslint-enable */
  methods: {
    useCachedImage: function() {
      let target = document.getElementById('imageId')
      // ImgCache.isCached(target.attr('src'), function(path, success) {
      ImgCache.isCached(this.targetSrc, function(path, success) {
        if (success) {
          // already cached
          ImgCache.useCachedFile(target);
        } else {
          // not there, need to cache the image
          // ImgCache.cacheFile(target.attr('src'), function () {
          ImgCache.cacheFile(this.targetSrc, function () {
            ImgCache.useCachedFile(target);
          })
        }
      })
    }
  },
  model: {
  }
}
</script>

<style scoped>
</style>
