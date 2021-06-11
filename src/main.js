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

createApp(App)
  .use(store)
  .use(router)
  .use(lazyPlugin, {
    loading: require('@/assets/images/default.png'),
  })
  .mount('#app')
