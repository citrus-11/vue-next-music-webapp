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

/* 全局引入自定义指令 
-----------*/
import loadingDirective from '@/components/base/loading/directive'
import noResultDirective from '@/components/base/no-result/directive'

createApp(App)
  .use(store)
  .use(router)
  .use(lazyPlugin, {
    // Loading 配置
    loading: require('@/assets/images/default.png'),
  })
  .directive('loading', loadingDirective)
  .directive('no-result', noResultDirective)
  .mount('#app')
