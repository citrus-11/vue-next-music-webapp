<template>
  <m-header />
  <tab />
  <router-view />
</template>

<script>
import MHeader from '@/components/header/MHeader'
import Tab from '@/components/tab/Tab'

export default {
  components: {
    MHeader,
    Tab,
  },
}
</script>
