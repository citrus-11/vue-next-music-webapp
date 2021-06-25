<template>
  <div class="header">
    <span class="header__icon"></span>
    <h1 class="header__text">Chicken Music</h1>
    <router-link class="header__mine" to="/user">
      <i class="icon-mine" />
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'MHeader',
}
</script>

<style lang="scss" scoped>
.header {
  height: 44px;
  text-align: center;
  color: $color-theme;
  font-size: 0;

  &__icon {
    display: inline-block;
    vertical-align: top;
    margin-top: 6px;
    width: 30px;
    height: 32px;
    margin-right: 9px;
    @include bg-image('logo');
    background-size: 30px 32px;
  }

  &__text {
    display: inline-block;
    vertical-align: top;
    line-height: 44px;
    font-size: $font-size-large;
  }

  &__mine {
    position: absolute;
    top: 0;
    right: 0;

    .icon-mine {
      display: block;
      padding: 12px;
      font-size: $font-size-large-x;
      color: $color-theme;
    }
  }
}
</style>
