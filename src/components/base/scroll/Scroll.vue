<template>
  <div ref="rootRef">
    <slot />
  </div>
</template>

<script>
import useScroll from './use-scroll'
import { ref } from 'vue'

export default {
  name: 'Scroll',
  props: {
    click: {
      type: Boolean,
      default: true,
    },
  },
  setup(props) {
    const rootRef = ref(null)
    useScroll(rootRef, props)

    return {
      rootRef,
    }
  },
}
</script>
