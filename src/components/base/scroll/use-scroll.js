import BScroll from '@better-scroll/core'
// 监听 DOM 内容变化，底层自动刷新高度
import ObserveDOM from '@better-scroll/observe-dom'
import { onMounted, onUnmounted, ref } from 'vue'

BScroll.use(ObserveDOM)

export default function useScroll(wrapperRef, options) {
  const scroll = ref(null)

  onMounted(() => {
    scroll.value = new BScroll(wrapperRef.value, {
      observeDOM: true,
      ...options,
    })
  })

  onUnmounted(() => {
    scroll.value.destroy()
  })

  return {
    scroll,
  }
}
