<template>
  <m-header />
  <tab />
  <router-view />
  <!-- 播放器为全局组件 -->
  <player />
</template>

<script>
import MHeader from '@/components/header/MHeader'
import Tab from '@/components/tab/Tab'
import Player from './components/player/Player.vue'

export default {
  components: {
    MHeader,
    Tab,
    Player,
  },
}
</script>
