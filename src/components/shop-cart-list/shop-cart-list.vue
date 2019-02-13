<template>
    <cube-popup ref="popup"
      type="cart-list-popup"
      position="bottom" maskClosable @mask-click="dismiss">
      <div class="content">
        <div class="title-wrapper">
          <span>购物车</span>
          <a href="">清空</a>
        </div>
        <ul class="goods-list">
          <li class="good-item" v-for="(item, index) in filterFoods" :key="index" >
            <span class="food-name">{{item.name}}</span>
            <span class="price">￥{{item.price}}</span>
            <cart-control class="food-control" :data="item" @onDelClick="delClick"></cart-control>
          </li>
        </ul>
      </div>
    </cube-popup>
</template>

<script>
  import CartControl from '../cart-control/cart-control'
  export default {
    name: 'shop-cart-list',
    components: {
      CartControl
    },
    props: {
      foods: {
        type: Array
      }
    },
    computed: {
      filterFoods() {
        return this.foods.filter(item => {
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
    methods: {
      delClick() {
        if (this.filterFoods.length === 0) {
           this.dismiss()
        }
      },
      dismiss() {
        this.$refs.popup.hide()
        this.isShow = false
      },
      toggle() {
        if (this.filterFoods.length === 0) {
           return
        }
        if (!this.isShow) {
          this.$refs.popup.show()
        } else {
          this.$refs.popup.hide()
        }
        this.isShow = !this.isShow
      }
    }
  }
</script>

<style lang="stylus" scoped>
.cube-cart-list-popup
  bottom 47px
  .content
    background white
    .title-wrapper
      display flex
      justify-content space-between
      padding 15px
    .goods-list
      .good-item
        position relative
        display flex
        flex-wrap nowrap
        justify-content space-between
        align-items center
        padding 15px
        .food-control
         position relative
</style>
