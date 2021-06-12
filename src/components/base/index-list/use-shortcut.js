import { computed, ref } from 'vue'

export default function useShortcut(props, groupRef) {
  // 拿到 scroll 的 DOM
  const scrollRef = ref(null)

  // 通过计算属性得到每一组歌手的 title 如：热
  const shortcutList = computed(() => {
    // 通过 map 弄出歌手 title 数组
    return props.data.map(group => {
      return group.title
    })
  })

  // 监听移动端点击时间
  function onShortcutTouchStart(e) {
    // 拿到点击的具体 DOM 的索引
    const anchorIndex = parseInt(e.target.dataset.index)

    // 通过索引拿到具体的被点击的 DOM
    const targetEl = groupRef.value.children[anchorIndex]

    // 拿到 better-scroll 的 scroll 对象
    const scroll = scrollRef.value.scroll

    // 调用 scrollToElement API 跳转指定元素
    scroll.scrollToElement(targetEl, 0)
  }

  return {
    shortcutList,
    onShortcutTouchStart,
    scrollRef,
  }
}
