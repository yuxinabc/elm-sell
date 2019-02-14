<template>
  <transition name="move" @after-leave="afterLeave">
    <div class="food" v-show="visible">
      <cube-scroll class="my-cube-scroll">
        <div class="back" @click.stop="back">
          <i class="icon-arrow_lift"></i>
        </div>
        <img class="food-pic" :src="food.image" alt="">
      </cube-scroll>
    </div>
  </transition>

</template>

<script>
  import PopupMixin, { SHOW } from '../../common/mixins/popup'

  export default {
    name: 'food',
    mixins: [PopupMixin],
    props: {
      food: {
        type: Object
      },
      cartInfo: {
        type: Object
      }
    },
    methods: {
      _createComp(cartInfo) {
        this.shopCartListComp = this.shopCartListComp || this.$createShopCartList({
          $events: {
            addClick: (el) => {
              this.shopCartStickyComp && this.shopCartStickyComp.drop(el)
            }
          }
        })
        this.shopCartStickyComp = this.shopCartStickyComp || this.$createShopCartSticky({
          $props: {
            cartInfo: cartInfo,
            shopCartListComp: this.shopCartListComp
          }
        })
      },
      back() {
        this.hide()
      },
      afterLeave() {
        this.shopCartStickyComp.hide()
      }
    },
    created() {
      this.$on(SHOW, () => {
        this._createComp(this.cartInfo)
        this.shopCartStickyComp.show()
      })
    }
  }
</script>

<style lang="stylus" scoped>
 .food
   position fixed
   top 0
   left 0
   bottom 47px
   width 100%
   background red
   z-index 90
   &.move-enter,&.move-leave-to
    opacity 0
    transform translate3d(100%,0,0)
   &.move-enter-active,&.move-leave-active
    transition all .5s ease
   .my-cube-scroll
     height 100%
     .back
       position absolute
       top 10px
       left: 0
       padding 10px
       font-size 20px
       color  white
     .food-pic
       width 100%
</style>
