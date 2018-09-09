<template>
  <div>
    <input type="checkbox" v-bind:checked="checked" v-on:change="$emit('change', $event.target.checked)" >
  </div>
</template>

<script>
export default {
  name: 'baseCheckbox',
  model: {
    prop: 'checked',
    event: 'change'
  },
  props: {
    checked: Boolean
  }
}
</script>

<style>

.radiobtn {
    top: 0;
    left: 0;
    width: 40px;
    height: 40px;
    background-color: #eee;
    border-radius: 50%;
}
</style>
