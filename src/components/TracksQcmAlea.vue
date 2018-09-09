<template>
  <div class="content">
    <div class="content-title">  {{content.title}} </div>
    <div class="content-subtitle">{{content.shortDescription}}</div>
    <div class="content-description">{{content.stepDescription}}</div>
    <div class="content-info">{{content.info}}</div>
    <div class="content-game">
        <div v-for="item in content.qcm" :key="item.key" >
          <label class="content-game-checkcontainer">{{ item.name }}
            <input class="content-game-radiobtn" type="radio" name="checkedNames" v-bind:value="item.key" v-on:change="$emit('change', $event.target.value)" />
            <span class="radiobtn"></span>
          </label>
        </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'TracksQcm',
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

.content-game-checkcontainer{
  display: block;
  position: relative;
  padding-left: 10vw;
  margin-bottom: 4vw;
  cursor: pointer;
  font-size: 5vw;
  -webkit-user-select: none;
  width: 100vw;
}

.content-game-checkcontainer input {
  position: absolute;
  opacity: 80%;
  cursor: pointer;
}

.content-game-radiobtn{
  position: absolute;
  top: 0;
  left: 0;
  height: 25px;
  width: 25px;
  background-color: #eee;
  border-radius: 50%;
}

</style>
