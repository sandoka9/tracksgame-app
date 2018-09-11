<template>
  <div class="content">
  <img ref="img" :src="targetSrc" />
  </div>
</template>

<script>
import ImgCache from '@chrisben/imgcache.js'

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
  },
  mounted () {
    this.imgElt = this.$refs.img
    this.useCachedImage()
  },
  /* eslint-enable */
  methods: {
    useCachedImage: function () {
      // ImgCache.isCached(target.attr('src'), function(path, success) {
      let imgElt = this.imgElt
      let that = this
      ImgCache.isCached(this.targetSrc, function (path, success) {
        if (success) {
          window.tgLogger.debug('Image found in cache : ' + path)
          // that.targetSrc = ImgCache.getCachedFileUrl(that.targetSrc)
          ImgCache.useCachedFile(imgElt)
        } else {
          window.tgLogger.error('Image not found in cache : ' + that.targetSrc)
          ImgCache.cacheFile(that.targetSrc, function () {
            // that.targetSrc = ImgCache.getCachedFileUrl(that.targetSrc)
            ImgCache.useCachedFile(imgElt)
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
