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
    data () {
      return {
        food: this.data
      }
    },
    computed: {
      countNum() {
        let key = this.food.foodTypeName + this.food.name
        return this.$store.getters.getFoodItemCount(key)
      }
    },
    methods: {
      remove () {
        this.$store.commit('deleteFood', this.food)
        this.$store.commit('changePriceAndCount')
        this.$store.commit('delItemCount', this.food)
        this.$store.commit('delFoodItemCount', this.food)
      },
      add (event) {
        this.$store.commit('addFoods', this.food)
        this.$store.commit('changePriceAndCount')
        this.$store.commit('addItemCount', this.food)
        this.$store.commit('addFoodItemCount', this.food)
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
