<template>
  <div class="singer" v-loading="loading">
    <index-list :data="singers" @select="selectSinger" />
    <router-view v-slot="{ Component }">
      <transition appear name="slide">
        <component :is="Component" :singer="selectedSinger" />
      </transition>
    </router-view>
  </div>
</template>

<script>
import { getSingerList } from '@/service/singer'
import IndexList from '@/components/index-list/IndexList'
import storage from 'good-storage'
import { SINGER_KEY } from '@/assets/js/constant'

export default {
  name: 'Singer',
  components: {
    IndexList,
  },
  data() {
    return {
      singers: [],
      selectedSinger: null,
    }
  },
  computed: {
    loading() {
      // 如果歌手数组没有数据的时候为 false
      return !this.singers.length
    },
  },
  async created() {
    const result = await getSingerList()
    this.singers = result.singers
  },
  methods: {
    selectSinger(singer) {
      this.selectedSinger = singer
      this.cacheSinger(singer)
      this.$router.push({
        path: `/singer/${singer.mid}`,
      })
    },
    cacheSinger(singer) {
      storage.session.set(SINGER_KEY, singer)
    },
  },
}
</script>

<style lang="scss" scoped>
.singer {
  position: fixed;
  width: 100%;
  top: 88px;
  bottom: 0;
}
</style>
