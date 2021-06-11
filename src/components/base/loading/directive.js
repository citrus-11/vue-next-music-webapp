import { createApp } from 'vue'
import Loading from './Loading'
import { addClass, removeClass } from '@/assets/js/dom'

const relativeCls = 'g-relative'

const loadingDirective = {
  // el 为指令所在的 DOM，binding 为指令的值
  mounted(el, binding) {
    // 以 loading 组件为根组件创建实例
    const app = createApp(Loading)

    // 将实例绑定到临时的 div 上
    const instance = app.mount(document.createElement('div'))

    // 获取动态参数
    const title = binding.arg
    // 只要传入的动态参数不是 undefined 则调用组件内的方法 setTitle 设置加载文案
    if (typeof title !== 'undefined') {
      instance.setTitle(title)
    }

    // 在 mounted 钩子中只创建了一次，所以需要挂载到指令的 el 上以复用 loading 实例
    el.instance = instance

    // binding 值存在则调用 append 并传入 el，el 中有 loading 实例
    if (binding.value) {
      append(el)
    }
  },
  // 组件数据更新引发重新渲染的钩子
  updated(el, binding) {
    // 组件更新也更新 title
    const title = binding.arg
    if (typeof title !== 'undefined') {
      el.instance.setTitle(title)
    }

    // 如果绑定值更新并且新值与旧值不相等
    if (binding.value !== binding.oldValue) {
      // 如果绑定值为 true 则添加 loading，否则移出 loading
      binding.value ? append(el) : remove(el)
    }
  },
}

function append(el) {
  // getComputedStyle 获取 el 的 style 对象
  const style = getComputedStyle(el)

  // 如果以下定位属性不在 style 中则添加 class
  if (['fixed', 'absolute', 'relative'].indexOf(style.position) === -1) {
    addClass(el, relativeCls)
  }

  // 给指令 el 添加一个元素，instance.$el 就是 loading 实例挂载的 DOM
  el.appendChild(el.instance.$el)
}

function remove(el) {
  // 移除定位属性
  removeClass(el, relativeCls)

  // 移出 laoding DOM
  el.removeChild(el.instance.$el)
}

export default loadingDirective
