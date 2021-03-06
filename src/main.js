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

import { load, saveAll } from '@/assets/js/array-store'
import { FAVORITE_KEY, PLAY_KEY } from '@/assets/js/constant'
import { processSongs } from '@/service/song'

// 全局跟新store中的缓存数据，解决缓存歌曲URL过期问题
const favoriteSongs = load(FAVORITE_KEY)
if (favoriteSongs.length > 0) {
  processSongs(favoriteSongs).then(songs => {
    store.commit('setFavoriteList', songs)
    saveAll(songs, FAVORITE_KEY)
  })
}

const historySongs = load(PLAY_KEY)
if (historySongs.length > 0) {
  processSongs(historySongs).then(songs => {
    store.commit('setPlayHistory', songs)
    saveAll(songs, PLAY_KEY)
  })
}

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
