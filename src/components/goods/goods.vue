<template>
  <div class="goods-wrapper">
    <cube-scroll-nav
      class="my-scroll-nav"
      :side="true"
      :data="goods"
      :current="current"
      @change="changeHandler"
      @sticky-change="stickyChangeHandler"
      :options="scrollOptions"
      v-if="goods.length">
      <template slot="bar" slot-scope="props">
        <cube-scroll-nav-bar
          class="my-scroll-nav-bar"
          :direction="'vertical'"
          :labels="props.labels"
          :txts="barTexts"
          :current="props.current">
          <template slot-scope="props">
            <div class="txt">
              <support-icon
                v-if="props.txt.type>=1"
                :size=3
                :type="props.txt.type"
              ></support-icon>
              <span>{{props.txt.name}}</span>
              <!--<span class="num" v-if="props.txt.count">
                  <bubble :num="props.txt.count"></bubble>
              </span>-->
            </div>
          </template>
        </cube-scroll-nav-bar>
      </template>
      <cube-scroll-nav-panel
        class="my-scroll-nav-panel"
        v-for="good in goods"
        :key="good.name"
        :label="good.name"
        :title="good.name">
        <ul class="goods-list">
          <li class="goods-item" v-for="(food,index) in good.foods" :key="index">
              <img :src="food.icon">
              <div class="content">
                <h2>{{food.name}}</h2>
                <p>{{food.description}}</p>
                <div class="extra">
                  <span>月售{{food.sellCount}}份</span>
                  <span>好评率{{food.rating}}%</span>
                </div>
                <div class="price">
                  <span class="now">￥{{food.price}}</span>
                  <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                </div>
                <div class="cart-control-wrapper">
                  <cart-control></cart-control>
                </div>
              </div>
          </li>
        </ul>
      </cube-scroll-nav-panel>
    </cube-scroll-nav>
    <shop-cart></shop-cart>
  </div>
</template>

<script type="text/ecmascript-6">
  import SupportIcon from '../support-icon/support-icon'
  import ShopCart from '../shop-cart/shop-cart'
  import CartControl from '../cart-control/cart-control'
  import { getGoods } from '../../api'
  export default {
    name: 'goods',
    components: {
      SupportIcon,
      ShopCart,
      CartControl
    },
    data () {
      return {
        goods: [],
        current: '',
        scrollOptions: {
          click: false,
          directionLockThreshold: 0
        }
      }
    },
    computed: {
      barTexts () {
        let ret = []
        this.goods.forEach((good) => {
          const { type, name, foods } = good
          let count = 0
          foods.forEach((food) => {
            count += food.count || 0
          })
          ret.push({
            type,
            name,
            count
          })
        })
        return ret
      }
    },
    methods: {
      changeHandler (label) {
        console.log('changed to:', label)
      },
      stickyChangeHandler (current) {
        console.log('sticky-change', current)
      },
      fetchData () {
        getGoods().then(goods => {
           this.goods = goods
          if (this.goods.length > 0) {
            this.current = this.goods[0].name
          }
        })
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .goods-wrapper
    position relative
    width 100%
    height 100%
    .my-scroll-nav
      position absolute
      width 100%
      top 0
      left 0
      .my-scroll-nav-bar
        width 80px
        white-space: normal
        overflow: hidden
        .cube-scroll-nav-bar-item
          padding 20px 10px
        .txt
          width 100%
          .support-ico
            display: inline-block
            vertical-align: top
            margin-right: 4px
          span
           font-size 12px
           margin: 0
           padding: 0
           border: 0
           font-weight: normal
           vertical-align: text-top
      .cube-scroll-wrapper
        .cube-sticky-fixed
          .cube-sticky-content
            background-color white
            font-size 12px
            color #666
            .cube-scroll-nav-panel-title
              padding-left: 14px;
              height: 26px;
              line-height: 26px;
              border-left: 2px solid #d9dde1;
              font-size: 12px;
              color: #666;
              background: #f3f5f7;
      .my-scroll-nav-panel
          .cube-sticky-content
            font-size 12px
            color #666
            .cube-scroll-nav-panel-title
              padding-left: 14px;
              height: 26px;
              line-height: 26px;
              border-left: 2px solid #d9dde1;
              font-size: 12px;
              color: #666;
              background: #f3f5f7;
        .goods-list
          width 100%
          .goods-item
            width 100%
            display flex
            margin 18px
            padding-bottom 18px
            img
             flex 0 0 57px
             width 57px
             height 57px
             margin-right 10px
             vertical-align top
            .content
              position relative
              flex 1
              overflow hidden
              h2
               font-size 14px
               line-height 14px
               color rgb(7,17,27)
               margin-bottom 8px
              p
               font-size 10px
               line-height 10px
               color rgb(147,153,159)
               margin-bottom 8px
               text-overflow ellipsis
               white-space nowrap
               overflow hidden
              .extra
                font-size 10px
                line-height 10px
                margin-bottom 8px
                color rgb(147,153,159)
                span
                 &:first-child
                  margin-right 12px
              .price
               .now
                 font-size 14px
                 color rgb(240,10,20)
                 font-weight 700
               .old
                 font-size 10px
                 color rgb(147,153,159)
                 font-weight 200
              .cart-control-wrapper
                position absolute
                bottom 10px
                right 28px
</style>
