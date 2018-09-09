<template>
  <div class="content">
    <div class="content-title">  {{content.title}} </div>
    <div class="content-subtitle">{{content.shortDescription}}</div>
    <div class="content-description">{{content.stepDescription}}</div>
    <div class="content-info">{{content.info}}</div>
    <div class="content-game">
        <div>
          <draggable class="list-group-up" element="ul" v-model="content.puzzleImage" :options="dragOptions" :move="onMove">
            <transition-group name="no" tag="ul">
              <li class="randomImg" v-for="element in content.puzzleImage" :key="element.order" >
                <img :src="element.image" />
              </li>
            </transition-group>
          </draggable>
        </div>
        <div>
          <draggable class="list-group" element="ul" v-model="puzzles" :options="dragOptions" :move="onMove" @start="isDragging=true" @end="isDragging=false">
            <transition-group type="transition" :name="'flip-list'">
              <li class="randomImg" v-for="item in puzzles" :key="item.order">
                <img :src="item.image" />
              </li>
            </transition-group>
          </draggable>
        </div>
    </div>
  </div>
</template>

<script>
import draggable from 'vuedraggable'

export default {
  name: 'TracksQcm',
  props: ['content'],
  data () {
    return {
      msg: 'Bienvenue sur la map',
      puzzles: [],
      editable: true,
      isDragging: false,
      delayedDragging: false
    }
  },
  /* eslint-disable */
  mounted () {
  },
  /* eslint-enable */
  methods: {
    orderList () {
      this.puzzles = this.puzzles.sort((one, two) => { return one.order - two.order })
    },
    onMove ({relatedContext, draggedContext}) {
      const relatedElement = relatedContext.element
      const draggedElement = draggedContext.element
      return (!relatedElement || !relatedElement.fixed) && !draggedElement.fixed
    }
  },
  computed: {
    dragOptions () {
      return {
        animation: 0,
        group: 'description',
        disabled: !this.editable,
        ghostClass: 'ghost'
      }
    },
    watch: {
      isDragging (newValue) {
        if (newValue) {
          this.delayedDragging = true
          return
        }
        this.$nextTick(() => {
          this.delayedDragging = false
        })
      },
      get () {
        return ''
      }
    }
  },
  components: {
    draggable
  }
}
</script>

<style scoped>

.flip-list-move {
  transition: transform 0.5s;
}

.ghost {
  opacity: .5;
  background: #C8EBFB;
}

.list-group-up{
  margin-left:-15%;
}

.list-group-item {
  cursor: move;
  list-style: none;
}

.list-group-item i{
  cursor: pointer;
}

.list-unstyled {
  padding-top: 1vh;
}

.no-move {
  transition: transform 0s;
}

.randomImg {
  margin: 0.25vh;
  list-style: none;
  display: inline;
}

.randomImg img{
  width: 31%;
  height: 10vh;
  margin-top: 0.2vh;
}
</style>
