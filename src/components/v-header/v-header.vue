<template>
  <div class="header" @click="openDetail">
    <div class="content-wrapper">
      <div class="avatar">
        <img width="64" height="64" :src="seller.avatar">
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{seller.name}}</span>
        </div>
        <div class="description">
          <p>{{seller.description}}/{{seller.deliveryTime}}分钟送达</p>
        </div>
        <div v-if="seller.supports" class="support">
          <support-icon :size=1 :type="seller.supports[0].type" class="support-icon" v-if="seller.supports"/>
          <span>{{seller.supports[0].description}}</span>
        </div>
      </div>
      <div class="support-count">
        <span v-if="seller.supports" class="count">{{seller.supports.length}}个</span>
        <span class="icon-keyboard_arrow_right"></span>
      </div>
    </div>
    <div class="bulletin-wrapper">
      <span class="bulletin-title"></span><span class="bulletin-text">{{seller.bulletin}}</span>
      <i class="icon-keyboard_arrow_right"></i>
    </div>
    <div class="background">
      <img :src="seller.avatar" width="100%" height="100%">
    </div>
  </div>
</template>

<script>
  import SupportIcon from '../support-icon/support-icon'

  export default {
    name: 'v-header',
    components: {
      SupportIcon
    },
    props: {
      seller: {
        type: Object,
        default () {
          return {}
        }
      }
    },
    methods: {
      openDetail() {
        this.headerDetailComp = this.headerDetailComp || this.$createHeaderDetail({
          $props: {
            seller: this.seller
          }
        })
        this.headerDetailComp.open()
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import "~common/stylus/mixin"
  @import "~common/stylus/variable"
  .header
    position: relative
    background: $color-background-ss
    color: $color-white
    overflow hidden
    .content-wrapper
      position relative
      padding-top: 24px
      padding-left: 24px
      padding-bottom: 18px
      display: flex
      .avatar
        flex: 0 0 64px
        width: 64px
        margin-right: 16px
        img
          border-radius: 2px
          vertical-align: top
      .content
        flex: 1
        .title
          .brand
            display inline-block
            vertical-align: top
            width: 30px
            height: 18px
            margin-right: 6px
            bg-image('brand')
            background-size: 30px 18px
            background-repeat: no-repeat
          .name
            font-size: 16px
            line-height: 18px
            font-weight 700
        .description
          margin-top: 8px
          margin-bottom: 10px
          p
            font-size: 12px
            font-weight: 200
            line-height: 12px
        .support
          margin-bottom 2px
          display flex
          align-items center
          .support-icon
            margin-right 4px
          span
            font-size: 12px
            font-weight: 200
            line-height: 12px
      .support-count
        position absolute
        display flex
        height: 24px
        padding: 0 8px
        right 12px
        bottom 14px
        align-items center
        text-align: center
        border-radius 14px
        font-weight 200
        line-height 24px
        background: $color-background-sss
        .count
          font-size: $fontsize-small-s
        .icon-keyboard_arrow_right
          margin-left: 2px
          line-height: 24px
          font-size: $fontsize-small-s
    .bulletin-wrapper
      position: relative
      display flex
      align-items: center
      height: 28px
      padding 0 12px
      background: $color-background-sss
      .bulletin-title
        flex 0 0 0 22px
        width 22px
        height 12px
        margin-right 4px
        bg-image('bulletin')
        background-size: 22px 12px
        background-repeat: no-repeat
      .bulletin-text
        flex 1
        font-size $fontsize-small-s
        line-height 12px
        white-space nowrap
        overflow hidden
        text-overflow ellipsis
        .icon-keyboard_arrow_right
          flex 0 0 10px
          width 10px
          font-size $fontsize-small-s

    .background
      position: absolute
      top: 0
      left: 0
      width: 100%
      height: 100%
      z-index: -1
      filter: blur(10px)
</style>
