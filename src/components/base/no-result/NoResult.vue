<template>
  <div class="no-result">
    <div class="no-result-content">
      <div class="icon"></div>
      <p class="text">{{ title }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NoResult',
  data() {
    return {
      title: '抱歉，没有结果',
    }
  },
  methods: {
    setTitle(title) {
      this.title = title
    },
  },
}
</script>

<style lang="scss" scoped>
.no-result {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate3d(-50%, -50%, 0);

  .no-result-content {
    text-align: center;

    .icon {
      width: 60px;
      height: 60px;
      margin: 0 auto;
      @include bg-image('no-result');
      background-size: 60px 60px;
    }

    .text {
      margin-top: 30px;
      font-size: $font-size-medium;
      color: $color-text-d;
    }
  }
}
</style>
