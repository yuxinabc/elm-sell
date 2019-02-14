<template>
  <div class="shop-cart-wrapper" @click="toggleList">
    <div class="logo-wrapper">
      <bubble class="bubble-wrapper" :count="this.$store.getters.getCount"></bubble>
      <div class="logo" :class="{on:getPrice>0}">
        <i class="icon-shopping_cart " :class="{on:getPrice>0}"></i>
      </div>
        <transition v-for="(item,index) in bollList" :key="index"
                    @before-enter="beforeDrop"
                    @enter="dropping"
                    @after-enter="afterDrop">
          <div class="boll" v-if="item.show">
            <span class="boll-inner" ></span>
          </div>
        </transition>
    </div>
    <div class="price-wrapper">
      <span class="price">￥{{getPrice}}</span>
    </div>
    <div class="deliver-pay-wrapper">
      <p class="deliver-pay">另需配送费￥{{data.deliveryPrice}}元</p>
    </div>
    <div class="settlement-wrapper" @click.stop="goToSettlement">
      <div class="settlement-condition" :class="{on:getDesc==='去结算'}">
        <p class="p-condition " :class="{on:getDesc==='去结算'}">{{getDesc}}</p>
      </div>
    </div>
  </div>
</template>

<script>
  import bubble from '../bubble/bubble'

  const BOLL_LENGTH = 10

  function _createBollList () {
    let ret = []
    for (let i = 0; i < BOLL_LENGTH; i++) {
      ret.push({ show: false })
    }
    return ret
  }

  export default {
    name: 'shop-cart',
    components: {
      bubble
    },
    props: {
      data: {
        type: Object
      },
      sticky: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        bollList: _createBollList(),
        droppingList: []
      }
    },
    methods: {
      goToSettlement() {
        if (this.getDesc === '去结算') {
          this._showPayDialog(this.$store.getters.getAllPrice)
        }
      },
      _showPayDialog(money) {
        this.$createDialog({
          type: 'alert',
          title: '支付',
          content: `您需要支付${money}元`,
          confirmBtn: {
            text: '确定',
            active: true,
            disabled: false,
            href: 'javascript:;'
          },
          onConfirm: () => {
          }
        }).show()
      },
      toggleList() {
        if (!this.sticky) {
          this.shopCartListComp = this.shopCartListComp || this.$createShopCartList()
          this.shopCartStickyComp = this.shopCartStickyComp || this.$createShopCartSticky({
            $props: {
              cartInfo: {
                minPrice: this.data.minPrice,
                deliveryPrice: this.data.deliveryPrice
              },
              shopCartListComp: this.shopCartListComp
            }
          })
          this.shopCartListComp.toggle(this.shopCartStickyComp)
        }
      },
      beforeDrop (el) {
        let boll = this.droppingList[this.droppingList.length - 1]
        let addEL = boll.el
        let addElRect = addEL.getBoundingClientRect()
        let xDist = addElRect.left - 32
        let yDist = -(window.innerHeight - addElRect.top - 22)
        el.style.transform = el.style.webkitTransform = `translate3d(0,${yDist}px,0)`
        let bollInner = el.getElementsByClassName('boll-inner')[0]
        bollInner.style.transform = bollInner.style.webkitTransform = `translate3d(${xDist}px,0,0)`
      },
      dropping (el, done) {
        this._reflow = document.body.offsetHeight
        el.style.transition = el.style.webkitTransition = 'all .4s cubic-bezier(0.49, -0.29, 0.75, 0.41)'
        el.style.transform = el.style.webkitTransform = 'translate3d(0,0,0)'
        let bollInner = el.getElementsByClassName('boll-inner')[0]
        bollInner.style.transition = bollInner.style.webkitTransition = 'all .4s linear'
        bollInner.style.transform = bollInner.style.webkitTransform = 'translate3d(0,0,0)'
        el.addEventListener('transitionend', done)
      },
      afterDrop (el) {
        let ball = this.droppingList.shift()
        if (ball) {
          ball.show = false
          el.style.display = 'none'
        }
      },
      drop (el) {
        // 通过控制显示，驱动动画的执行
        let boll = this.bollList.find(item => {
          return !item.show
        })
        boll.el = el
        boll.show = true
        this.droppingList.push(boll)
      }
    },
    computed: {
      getPrice () {
        return this.$store.getters.getAllPrice
      },
      getDesc () {
        let allPrice = this.$store.getters.getAllPrice
        let minPrice = Number(this.data.minPrice)
        if (allPrice === 0) {
          return `￥${minPrice}元起送`
        } else if (allPrice < minPrice) {
          return `还差￥${(minPrice - allPrice)}元起送`
        } else {
          return '去结算'
        }
      }
    }
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
      .boll
          position absolute
          .boll-inner
            display inline-block
            width 15px
            height 15px
            border-radius 50%
            background #00A0DC
      .bubble-wrapper
        position absolute
        right 0
        top 0
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
          background-color rgba(255, 255, 255, .1)
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
