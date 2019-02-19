<template>
  <div class="cart-control">
    <transition name="rote">
      <div class="cart-remove" @click.stop="remove" v-show="countNum>0">
        <i class="icon-remove_circle_outline"></i>
      </div>
    </transition>
    <div class="cart-num" v-if="countNum>0">
      <span class="text-num">{{countNum}}</span>
    </div>
    <div class="cart-add" @click.stop="add">
      <i class="icon-add_circle"></i>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'cart-control',
    props: {
      data: {
        type: Object
      }
    },
    // 在计算属性中，最好直接使用props数据，而不是在data中定义引用,若props可变，则需要watch然后重新赋值给data()中的变量
    data () {
      return {
        food: this.data
      }
    },
    computed: {
      countNum () {
        let key = this.food.foodTypeName + this.food.name
        this.$emit('showCart', this.$store.getters.getFoodItemCount(key) > 0)
        return this.$store.getters.getFoodItemCount(key)
      }
    },
    watch: {
      data (newV, oldV) {
        this.food = newV
      }
    },
    methods: {
      remove () {
        this.$store.commit('deleteFood', this.data)
        this.$store.commit('changePriceAndCount')
        this.$store.commit('delItemCount', this.data)
        this.$store.commit('delFoodItemCount', this.data)
        this.$emit('onDelClick', event.target)
      },
      add (event) {
        this.$store.commit('addFoods', this.data)
        this.$store.commit('changePriceAndCount')
        this.$store.commit('addItemCount', this.data)
        this.$store.commit('addFoodItemCount', this.data)
        // 派发事件
        this.$emit('onAddClick', event.target)
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .cart-control
    position absolute
    display flex
    .cart-remove
      &.rote-enter, &.rote-leave-to
        opacity 0
        transform translateX(12px) rotate(180deg)
      &.rote-enter-active, &.rote-leave-active
        transition: all .5s;
      .icon-remove_circle_outline
        font-size 24px
        color #00A0DC
    .cart-num
      flex 1
      font-size 20px
      text-align center
      min-width 22px
      .text-num
        width 100%
        color #777777
        font-size 14px
    .cart-add
      .icon-add_circle
        font-size 24px
        color #00A0DC
</style>
