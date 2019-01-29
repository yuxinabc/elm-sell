<template>
  <div class="cart-control">
    <transition name="rote">
      <div class="cart-remove" @click.stop="remove" v-show="count>0">
        <i class="icon-remove_circle_outline"></i>
      </div>
    </transition>
    <div class="cart-num" v-if="count>0">
      <span class="text-num">{{count}}</span>
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
        food: this.data,
        count: 0
      }
    },
    methods: {
      remove () {
        this.$store.commit('deleteFood', this.food)
        this.count = this.$store.getters.getFoodByName(this.food).count
        this.$store.commit('changePriceAndCount')
      },
      add () {
        this.$store.commit('addFoods', this.food)
        this.count = this.$store.getters.getFoodByName(this.food).count
        this.$store.commit('changePriceAndCount')
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
