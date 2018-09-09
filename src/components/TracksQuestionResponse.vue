<template>
  <div class="content">
    <div class="content-title">  {{content.title}} </div>
    <div class="content-subtitle">{{content.shortDescription}}</div>
    <div class="content-description">{{content.stepDescription}}</div>
    <div class="content-img" v-if="content.stepImg !== ''">
      <img v-bind:src="content.stepImg" />
    </div>
    <div class="content-info">{{content.info}}</div>
    <div class="content-game">
    </div>
    <div class="content-response">
      <input class="response form-control" type="text" name="response" placeholder="Qui suis je ?" v-model="content.response" v-on:change="$emit('change', $event.target.value)"/>
    </div>
  </div>
</template>

<script>

export default {
  name: 'TracksQuestionResponse',
  props: {
    content: {},
    checkedNames: String
  },
  data () {
    return {
    }
  },
  /* eslint-disable */
  mounted () {
  },
  /* eslint-enable */
  methods: {
  },
  model: {
    event: 'change'
  }
}
</script>

<style scoped>

.content-game{
  width: 55%;
  margin-left:15%;
  margin-top:10%;
  font-size: 5vw;
}

.content-img img{
  width: 65vw;
  margin-left: 5vw;
}

.content-response {
  position: relative;
  z-index: 10;
}

</style>
