import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

/* 懒加载指令
-----------*/
import lazyPlugin from 'vue3-lazy'

/* 引入全局样式 
-----------*/
import '@/assets/scss/index.scss'

/* 全局引入自定义 loading 指令 
-----------*/
import loadingDirective from '@/components/base/loading/directive'

createApp(App)
  .use(store)
  .use(router)
  .use(lazyPlugin, {
    loading: require('@/assets/images/default.png'),
  })
  .directive('loading', loadingDirective)
  .mount('#app')
