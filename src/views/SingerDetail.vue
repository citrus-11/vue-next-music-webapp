<template>
  <div class="singer-detail">
    <music-list :songs="songs" :pic="pic" :title="title" :loading="loading" />
  </div>
</template>

<script>
import { getSingerDetail } from '@/service/singer'
import { processSongs } from '@/service/song'
import MusicList from '@/components/music-list/MusicList'
import storage from 'good-storage'
import { SINGER_KEY } from '@/assets/js/constant'

export default {
  name: 'SingerDetail',
  props: {
    singer: Object,
  },
  components: {
    MusicList,
  },
  data() {
    return {
      songs: [],
      loading: true,
    }
  },
  computed: {
    // 缓存歌手数据
    computedSinger() {
      let ret = null
      const singer = this.singer
      if (singer) {
        // 路由带 mid 跳转过来的
        ret = singer
      } else {
        // 页面直接刷新的，没有 mid，所以去缓存中拿歌手的数据
        const cachedSinger = storage.session.get(SINGER_KEY)
        if (cachedSinger && cachedSinger.mid === this.$route.params.id) {
          ret = cachedSinger
        }
      }

      return ret
    },
    pic() {
      // vue 底层会收集依赖，所以虽好用变量把多次使用的数据缓存下来，性能会好很多
      const singer = this.computedSinger
      return singer && singer.pic
    },
    title() {
      const singer = this.computedSinger
      return singer && singer.name
    },
  },
  async created() {
    // 路由不匹配跳入上级目录
    if (!this.computedSinger) {
      const path = this.$route.matched[0].path
      this.$router.push({ path })
      return
    }

    // 获取歌手歌曲数据
    const result = await getSingerDetail(this.computedSinger)
    this.songs = await processSongs(result.songs)
    this.loading = false
  },
}
</script>

<style lang="scss" scoped>
.singer-detail {
  position: fixed;
  z-index: 10;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: $color-background;
}
</style>
