<template>
    <div class="shop-cart-sticky" v-show="isShow" @click="click">
      <shop-cart :data="cartInfo" :sticky="true"></shop-cart>
    </div>
</template>

<script>
  import ShopCart from '../shop-cart/shop-cart'
  export default {
    name: 'shop-cart-sticky',
    components: {
      ShopCart
    },
    props: {
      cartInfo: {
       type: Object,
       default() {
         return {}
       }
      },
      shopCartListComp: {
        type: Object
      }
    },
    data() {
      return {
        isShow: true
      }
    },
    methods: {
       show() {
         this.isShow = true
       },
      hide() {
        this.isShow = false
      },
      click() {
        this.shopCartListComp.toggle()
      }
    }
  }
</script>

<style lang="stylus" scoped>
.shop-cart-sticky
  position absolute
  width 100%
  left 0
  bottom 0
</style>
