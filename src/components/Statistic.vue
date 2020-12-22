<template>
  <p>{{ a }}</p>
  <p>jäseniä: {{ members.length }}</p>
</template>

<script>
import { ref } from 'vue'
export default {
  props: {
    members: Array,
  },
  setup(props) {
    const a = ref('other text')
    console.log(props.members.length)
    console.log(a)
    // const foo = ref('foo')
    return {
      a
    }
  }
}
</script>

<style>
</style>
