<template>
    <div class="split">

    </div>
</template>

<script>
  export default {
    name: 'split'
  }
</script>

<style lang="stylus" scoped>
  @import "../../common/stylus/mixin.styl"
.split
   width 100%
   height 18px
   border-1px(rgba(7, 17, 27, 0.5))
   background: $color-background-ssss
   &::after
    border-left none
    border-right none
</style>
