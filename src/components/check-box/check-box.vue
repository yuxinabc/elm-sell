<template>
    <div class="check-box" @click.stop="click">
     <i class="icon-check_circle" :class="{'checked':checked_}"></i>
      <span class="content">{{title}}</span>
    </div>
</template>

<script>
  export default {
    name: 'check-box',
    props: {
     title: {
       type: String
     },
     checked: {
       type: Boolean,
       default: false
      }
    },
    data() {
      return {
        checked_: this.checked
      }
    },
    methods: {
      click(e) {
        console.log(e)
       this.checked_ = !this.checked_
       this.$emit('onChecked', this.checked_)
      }
    },
    created() {
      this.$emit('onChecked', this.checked_)
    }
  }
</script>

<style lang="stylus" scoped>
  .check-box
    display flex
    align-items center
    .icon-check_circle
      font-size 24px
      margin-right 4px
      color rgb(153, 153, 153)
      &.checked
        color rgb(0, 180, 60)
    .content
        font-size 12px
        color rgb(153, 153, 153)
</style>
