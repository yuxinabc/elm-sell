<template>
    <div class="shop-cart-sticky" v-show="visible" @click.stop="click">
      <shop-cart :data="cartInfo" :sticky="true" @goToSettlement="click" ref="shopCart"></shop-cart>
    </div>
</template>

<script>
  import ShopCart from '../shop-cart/shop-cart'
  import PopupMixins from '../../common/mixins/popup'
  export default {
    name: 'shop-cart-sticky',
    mixins: [PopupMixins],
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
    methods: {
      click() {
        this.shopCartListComp.toggle()
      },
      drop(el) {
         this.$refs.shopCart.drop(el)
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
