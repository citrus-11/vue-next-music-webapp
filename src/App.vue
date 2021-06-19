<template>
  <m-header />
  <tab />
  <router-view :style="viewStyle" />
  <!-- 播放器为全局组件 -->
  <player />
</template>

<script>
import MHeader from '@/components/header/MHeader'
import Tab from '@/components/tab/Tab'
import Player from './components/player/Player.vue'
import { mapState } from 'vuex'

export default {
  components: {
    MHeader,
    Tab,
    Player,
  },
  computed: {
    viewStyle() {
      const bottom = this.playlist.length ? '60px' : '0'
      return {
        bottom,
      }
    },
    ...mapState(['playlist']),
  },
}
</script>
