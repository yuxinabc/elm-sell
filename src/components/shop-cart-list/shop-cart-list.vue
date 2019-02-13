<template>
  <transition name="fade">
    <cube-popup ref="popup"
                type="cart-list-popup"
                :zIndex="90"
                position="bottom" maskClosable @mask-click="dismiss" v-show="isShow">
      <transition name="move">
        <div class="content" v-show="isShow">
          <div class="title-wrapper">
            <span>购物车</span>
            <a href="" @click.prevent="showEmptyCartDialog">清空</a>
          </div>
            <cube-scroll  class="my-cube-scroll" ref="listContent">
              <ul class="goods-list">
                <li class="good-item" v-for="(item, index) in filterFoods" :key="index" >
                  <span class="food-name">{{item.name}}</span>
                  <div class="price-cart-wrapper">
                    <span class="price">￥{{item.price}}</span>
                    <cart-control class="food-control" :data="item" @onDelClick="delClick"></cart-control>
                  </div>
                </li>
              </ul>
            </cube-scroll>
        </div>
      </transition>
    </cube-popup>
  </transition>
</template>

<script>
  import CartControl from '../cart-control/cart-control'
  export default {
    name: 'shop-cart-list',
    components: {
      CartControl
    },
    computed: {
      filterFoods() {
        return this.$store.getters.getAllFoods.filter(item => {
           let key = item.foodTypeName + item.name
           return this.$store.getters.getFoodItemCount(key) > 0
        })
      }
    },
    data() {
      return {
        isShow: false
      }
    },
    watch: {
      isShow(newV, oldV) {
       if (newV) {
         this.$nextTick(() => {
           this.$refs.listContent.refresh()
        })
       }
      }
    },
    methods: {
      dismissCartSticky() {
        this.timeId = setInterval(() => {
          this.shopCartStickyComp.hide()
          clearInterval(this.timeId)
        }, 300)
      },
      showEmptyCartDialog() {
        this.$createDialog({
          type: 'confirm',
          content: '清空购物车？',
          confirmBtn: {
            text: '确定',
            active: true,
            disabled: false,
            href: 'javascript:;'
          },
          cancelBtn: {
            text: '取消',
            active: false,
            disabled: false,
            href: 'javascript:;'
          },
          onConfirm: () => {
           this.emptyCart()
          }
        }).show()
      },
      emptyCart() {
        this.$store.commit('delAllData')
        this.dismiss()
      },
      delClick() {
        if (this.filterFoods.length === 0) {
           this.dismiss()
        }
      },
      dismiss() {
        this.isShow = false
        this.dismissCartSticky()
      },
      toggle(shopCartStickyComp) {
        this.shopCartStickyComp = shopCartStickyComp || this.shopCartStickyComp
        if (this.filterFoods.length === 0) {
           return
        }
        this.isShow = !this.isShow
        if (this.isShow) {
          this.shopCartStickyComp.show()
        } else {
          this.dismissCartSticky()
        }
      }
    }
  }
</script>

<style lang="stylus" scoped>
.cube-cart-list-popup
  background-color  rgba(0,0,0,0.6)
  bottom 47px
  &.fade-enter,&.fade-leave-to
    opacity 0
  &.fade-enter-active,&.fade-leave-active
    transition all .3s
  .content
    background-color  white
    &.move-enter, &.move-leave-to
     transform translate3d(0,100%,0)
    &.move-enter-active,&.move-leave-active
     transition all .3s
    .title-wrapper
      display flex
      justify-content space-between
      align-items center
      margin 0 15px
      span
        font-size 14px
        color #333
      a
        height 40px
        line-height 40px
        font-size 12px
        color #00a0dc
    .my-cube-scroll
      max-height: 217px
      overflow: hidden
    .goods-list
      margin-left  15px
      margin-right 25px
      .good-item
        position relative
        display flex
        flex-wrap nowrap
        justify-content space-between
        align-items center
        padding 12px 0
        .food-name
          font-size 14px
          color #333
        .price-cart-wrapper
          display flex
          justify-content space-between
          align-items center
          .price
            margin-right 15px
            font-size 14px
            color #f01414
          .food-control
            position relative
</style>
