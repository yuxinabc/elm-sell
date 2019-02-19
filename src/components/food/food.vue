<template>
  <transition name="move" @after-leave="afterLeave">
    <div class="food" v-show="visible">
      <cube-scroll class="my-cube-scroll" ref="cubeScroll">
        <div class="back" @click.stop="back">
          <i class="icon-arrow_lift"></i>
        </div>
        <div class="img-box">
          <img class="food-pic" :src="food.image" alt="">
        </div>
        <div class="brief-introduction-wrapper">
          <h1 class="food-name">{{food.name}}</h1>
          <div class="sale-info">
            <span class="sell-out">月售{{food.sellCount}}份</span>
            <span class="rate">好评率{{food.rating}}%</span>
          </div>
          <div class="purchase-wrapper">
            <span class="price">￥{{food.price}}</span>
            <cart-control :data="food"  @showCart="showCart" @onAddClick="onAddClick"></cart-control>
            <transition name="fade">
              <cube-button class="bt-add" active inline @click="addToCart" v-show="!showCartControl">加入购物车</cube-button>
            </transition>

          </div>
        </div>
        <split></split>
        <div class="food-info">
          <h1 class="title">商品信息</h1>
          <p class="info">{{food.info}}</p>
        </div>
        <split></split>
        <comment class="comment-box" :data="food.ratings" :checks="titleList" :title="'商品评价'"></comment>
      </cube-scroll>
    </div>
  </transition>

</template>

<script>
  import PopupMixin, { SHOW } from '../../common/mixins/popup'
  import Split from '../split/split'
  import Comment from '../comment/comment'
  import CartControl from '../cart-control/cart-control'
  export default {
    name: 'food',
    mixins: [PopupMixin],
    components: {
      Split,
      Comment,
      CartControl
    },
    props: {
      food: {
        type: Object
      },
      cartInfo: {
        type: Object
      }
    },
    data() {
      return {
        showCartControl: false,
        titleList: [
          { text: '全部', type: 0 },
          { text: '推荐', type: 0 },
          { text: '吐槽', type: 1 }
        ]
      }
    },
    methods: {
      onAddClick(el) {
        this.shopCartStickyComp.drop(el)
      },
      showCart(showCart) {
       this.showCartControl = showCart
      },
      addToCart(event) {
        console.log(event.target)
        this.shopCartStickyComp.drop(event.target)
        this.$store.commit('addFoods', this.food)
        this.$store.commit('changePriceAndCount')
        this.$store.commit('addItemCount', this.food)
        this.$store.commit('addFoodItemCount', this.food)
      },
      _createComp (cartInfo) {
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
      back () {
        this.hide()
      },
      afterLeave () {
        this.shopCartStickyComp.hide()
      }
    },
    created () {
      this.$on(SHOW, () => {
        this._createComp(this.cartInfo)
        this.shopCartStickyComp.show()
        this.$nextTick(() => {
          this.$refs.cubeScroll.refresh()
        })
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
    background white
    z-index 90
    &.move-enter, &.move-leave-to
      opacity 0
      transform translate3d(100%, 0, 0)
    &.move-enter-active, &.move-leave-active
      transition all .5s ease
    .my-cube-scroll
      height 100%
      .back
        position absolute
        top 10px
        left: 0
        padding 10px
        font-size 20px
        color white
        z-index 999
      .img-box
        width 100%
        height 0
        padding-top 100%
        overflow hidden
        position relative
        .food-pic
          position absolute
          left 0
          top 0
          width 100%
          height 100%
      .brief-introduction-wrapper
        padding 18px
        .food-name
          color #333
          font-size 14px
          line-height: 14px
          font-weight 700
          margin-bottom 8px
        .sale-info
          color #999
          font-size 10px
          line-height 10px
          height 10px
          margin-bottom 18px
          .sell-out
            margin-right 12px
        .purchase-wrapper
          display flex
          position relative
          justify-content space-between
          align-items center
          height 24px
          .cart-control
            right 0
          .price
            color #f01414
            font-size 14px
          .bt-add
            position relative
            z-index 999
            border-radius 20px
            height 24px
            padding 0 12px
            background-color #00a0dc
            &.fade-enter,&.fade-leave-to
              opacity 0
            &.fade-enter-active,&.fade-leave-active
              transition all .5s
      .food-info
        padding 18px
        .title
          font-size 14px
          ine-height 14px
          color #333
          margin-bottom 6px
        .info
          font-size 12px
          line-height 24px
          color #666
          padding 0 8px
      .comment-box
        padding 18px
</style>
