import BScroll from '@better-scroll/core'
import Slide from '@better-scroll/slide'
import { onMounted, onUnmounted, ref } from 'vue'

// 加载插件
BScroll.use(Slide)

// 传入轮播图容器 DOM -> wrapperRef
export default function useScroll(wrapperRef) {
  // 把轮播图初始化为响应式数据
  const slider = ref(null)
  const currentPageIndex = ref(0)

  // 在 onMounted 钩子才能访问 DOM
  onMounted(() => {
    // 实例化轮播图，构造器需要传入容器 DOM 和配置项
    const sliderVal = (slider.value = new BScroll(wrapperRef.value, {
      // 具体配置项可以阅读 better-scroll 官方文档
      click: true,
      scrollX: true,
      scrollY: false,
      momentum: false,
      bounce: false,
      probeType: 2,
      slide: true,
    }))

    // slideWillChange 轮播图变化时的钩子函数，page 中有当前轮播图相关数据
    sliderVal.on('slideWillChange', page => {
      currentPageIndex.value = page.pageX
    })
  })

  // 销毁插件，这是一个好习惯
  onUnmounted(() => {
    slider.value.destroy()
  })

  return {
    slider,
    currentPageIndex,
  }
}
