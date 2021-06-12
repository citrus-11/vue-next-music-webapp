import { computed, ref } from 'vue'

export default function useShortcut(props, groupRef) {
  // 拿到 scroll 的 DOM
  const scrollRef = ref(null)
  const touch = {}
  // 锚点高度
  const ANCHOR_HEIGHT = 18

  // 通过计算属性得到每一组歌手的 title 如：热
  const shortcutList = computed(() => {
    // 通过 map 弄出歌手 title 数组
    return props.data.map(group => {
      return group.title
    })
  })

  // 监听移动端点击事件
  function onShortcutTouchStart(e) {
    // 拿到点击的具体 DOM 的索引
    const anchorIndex = parseInt(e.target.dataset.index)

    // 拿到手指的点击 Y 坐标
    touch.y1 = e.touches[0].pageY

    // 保留锚点索引
    touch.anchorIndex = anchorIndex

    scrollTo(anchorIndex)
  }

  // 监听移动端点击事件
  function onShortcutTouchMove(e) {
    // 拿到手指的滑动的 Y 坐标
    touch.y2 = e.touches[0].pageY
    const delta = ((touch.y2 - touch.y1) / ANCHOR_HEIGHT) | 0
    const anchorIndex = touch.anchorIndex + delta

    scrollTo(anchorIndex)
  }

  function scrollTo(index) {
    // 无效区域滑动直接返回
    if (isNaN(index)) return

    // 限定 index 范围
    index = Math.max(0, Math.min(shortcutList.value.length - 1, index))

    // 通过索引拿到具体的被点击的 DOM
    const targetEl = groupRef.value.children[index]

    // 拿到 better-scroll 的 scroll 对象
    const scroll = scrollRef.value.scroll

    // 调用 scrollToElement API 跳转指定元素
    scroll.scrollToElement(targetEl, 0)
  }

  return {
    shortcutList,
    onShortcutTouchStart,
    scrollRef,
    onShortcutTouchMove,
  }
}
