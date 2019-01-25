<template>
  <transition name="fade">
    <div class="header-detail" v-if="visible">
      <div class="detail-wrapper">
        <div class="detail-main">
          <p class="title">{{seller.name}}</p>
          <div class="star-wrapper">
            <star v-if="seller.score" :size="48" :score="seller.score"></star>
          </div>
          <div class="discount-wrapper">
            <line-title :title="'优惠信息'" class="discount-line"></line-title>
            <ul class="discount-info">
              <li class="discount-item" v-for="(item,index) in seller.supports" :key="index">
                <support-icon v-if="seller.supports" :size="2" :type="item.type" class="support-icon"></support-icon>
                <p class="discount-detail">{{item.description}}</p>
              </li>
            </ul>
          </div>
          <div class="seller-notice-wrapper">
            <line-title :title="'商家公告'" class="notice-line"></line-title>
            <p class="notice-detail">{{seller.bulletin}}</p>
          </div>
        </div>
      </div>
      <div class="detail-close" @click="close">
        <i class="icon-close"></i>
      </div>
    </div>
  </transition>
</template>

<script>
  import star from '../star/star'
  import LineTitle from '../line-title/line-title'
  import SupportIcon from '../support-icon/support-icon'

  export default {
    name: 'header-detail',
    props: {
      seller: {
        type: Object
      }
    },
    data() {
      return {
        visible: false
      }
    },
    components: {
      star,
      LineTitle,
      SupportIcon
    },
    methods: {
      close() {
        this.visible = false
      },
      open() {
        this.visible = true
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import "../../common/stylus/mixin.styl"
  @import "../../common/stylus/variable.styl"
  .header-detail
    position: fixed
    z-index: 100
    top: 0
    left: 0
    width: 100%
    height: 100%
    overflow: auto
    backdrop-filter: blur(10px)
    opacity: 1
    color: $color-white
    background: $color-background-s
    &.fade-enter,&.fade-leave-to
     opacity 0
     background $color-background
    &.fade-enter-active,&.fade-leave-active
     transition all .5s
    .detail-wrapper
      display inline-block
      width: 100%
      min-height: 100%
      .detail-main
        margin-top: 64px
        padding-bottom: 64px
        .title
          text-align center
          margin-bottom 16px
          font-weight 700
        .star-wrapper
          margin-top: 18px
          margin-bottom 28px
          padding: 2px 0
          text-align: center
        .discount-wrapper
          .discount-line
            margin 0 36px 24px
          .discount-info
            padding 0 48px
            .discount-item
              display flex
              margin-bottom 12px
              align-items center
              .support-icon
                margin-right 6px
              .discount-detail
                flex 1
                font-size 12px
                line-height 12px
                font-weight 200
                color rgb(255, 255, 255)
        .seller-notice-wrapper
          margin 0 36px
          padding-top 16px
          .notice-detail
            margin 24px 12px 0
            font-size 12px
            line-height 24px
            font-weight 200
            color rgb(255,255,255)

    .detail-close
      width: 30px
      height: 30px
      margin: -64px auto 0 auto
      clear: both
      font-size: $fontsize-large-xxxx
</style>
