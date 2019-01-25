<template>
    <div class="line-title-wrapper">
      <span class="left-line"></span>
      <p class="title">{{title}}</p>
      <span class="right-line"></span>
    </div>
</template>

<script>
  export default {
    name: 'line-title',
    props: {
      title: {
        type: String
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import "../../common/stylus/mixin.styl"
 .line-title-wrapper
  display flex
  align-items center
  .left-line
    flex 1
    height 1px
    border-1px(rgba(255,255,255,1))
  .title
   font-size 14px
   font-weight 700
   color rgb(255,255,255)
   line-height: 14px;
   margin 0 12px
  .right-line
    flex 1
    height 1px
    border-1px(rgba(255,255,255,1))
</style>
