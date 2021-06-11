<template>
  <div class="singer" v-loading="loading">
    <index-list :data="singers"></index-list>
  </div>
</template>

<script>
import getSingerList from '@/service/singer'
import IndexList from '@/components/index-list/IndexList'

export default {
  name: 'Singer',
  components: {
    IndexList,
  },
  data() {
    return {
      singers: [],
    }
  },
  computed: {
    loading() {
      // 如果轮播图和热门列表没有数据的时候为 false
      return !this.singers.length
    },
  },
  async created() {
    const result = await getSingerList()
    this.singers = result.singers
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
