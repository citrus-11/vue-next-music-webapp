import Scroll from '@/components/base/scroll/Scroll'

import {
  h,
  mergeProps,
  renderSlot,
  withCtx,
  ref,
  computed,
  watch,
  nextTick,
} from 'vue'

import { useStore } from 'vuex'

export default {
  name: 'WrapScroll',
  props: Scroll.props,
  emits: Scroll.emits,
  render(ctx) {
    return h(
      Scroll,
      mergeProps({ ref: 'scrollRef' }, ctx.$props, {
        onScroll: e => {
          ctx.$emit('scroll', e)
        },
      }),
      {
        default: withCtx(() => {
          return [renderSlot(ctx.$slots, 'default')]
        }),
      },
    )
  },
  setup() {
    const scrollRef = ref(null)
    const scroll = computed(() => {
      return scrollRef.value.scroll
    })

    const store = useStore()
    const playlist = computed(() => store.state.playlist)

    watch(playlist, async () => {
      await nextTick()
      scroll.value.refresh()
    })

    return {
      scrollRef,
      scroll,
    }
  },
}
