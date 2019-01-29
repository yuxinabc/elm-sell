<template>
    <div class="bubble" v-if="count>0">
      <span class="bubble-count">{{count}}</span>
    </div>
</template>

<script>
  export default {
    name: 'bubble',
    props: {
      count: {
        type: Number,
        default: 0
      }
    }
  }
</script>

<style lang="stylus" scoped>
.bubble
  min-width  18px
  height 18px
  border-radius 50%
  padding 5px
  display flex
  align-items center
  justify-content center
  box-sizing border-box
  background  linear-gradient(to right, #FC935B , #F02523); /* 标准的语法 */
  color rgb(255,255,255)
  font-size 12px
</style>
