<template>
  <div class="shop-cart-wrapper">
    <div class="logo-wrapper">
      <div class="logo">
        <i class="icon-shopping_cart "></i>
      </div>
    </div>
    <div class="price-wrapper">
      <span class="price">￥10</span>
    </div>
    <div class="deliver-pay-wrapper">
      <p class="deliver-pay">另需配送费￥4元</p>
    </div>
    <div class="settlement-wrapper">
      <div class="settlement-condition">
        <p class="p-condition on">￥20元起送</p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'shop-cart'
  }
</script>

<style lang="stylus" scoped>
  @import "../../common/stylus/mixin.styl"
  .shop-cart-wrapper
    position absolute
    display flex
    left 0
    bottom 0
    width 100%
    height 48px
    z-index 999
    background-color #07111B
    .logo-wrapper
      position relative
      top -10px
      left 12px
      display flex
      align-items center
      justify-content center
      height 56px
      width 56px
      border-radius 50%
      background-color #07111b
      .logo
        display flex
        align-items center
        justify-content center
        width 44px
        height 44px
        background-color #333
        border-radius 50%
        &.on
         background-color #00A0DC
        .icon-shopping_cart
          font-size 24px
          color #999
          &.on
            color white
    .price-wrapper
      margin-left 24px
      height 100%
      display flex
      align-items center
      .price
       display flex
       align-items center
       color #999
       font-weight 700
       &.on
         color white
       &:after
         content: ''
         display inline-block
         width 1px
         height 24px
         margin-left 12px
         background-color rgba(255,255,255,.1)
    .deliver-pay-wrapper
      margin-left 12px
      flex-grow 1
      display flex
      align-items center
      .deliver-pay
        color #999
        font-size 12px
    .settlement-wrapper
      flex 0 0 105px
      height 100%
      .settlement-condition
       height 100%
       display flex
       justify-content center
       align-items center
       background-color #333
       &.on
        background-color #00B43C
      .p-condition
        color #999
        font-size 12px
        font-weight 700
        &.on
         color white
</style>
