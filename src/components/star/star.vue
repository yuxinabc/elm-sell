<template>
  <div class="star" :class="starType">
    <span class="star-item" v-for="(itemClass,index) in classList" :key="index" :class="itemClass"></span>
  </div>
</template>

<script>
  const LENGTH = 5
  const CLS_ON = 'on'
  const CLS_HALF = 'half'
  const CLS_OFF = 'off'
  export default {
    name: 'star',
    props: {
      size: {
        type: Number
      },
      score: {
        type: Number
      }
    },
    computed: {
      starType () {
        return `star-${this.size}`
      },
      classList () {
        let starClassList = []
        let fullStarNum = Math.floor(Math.min(this.score, LENGTH))
        for (let i = 0; i < fullStarNum; i++) {
          starClassList.push(CLS_ON)
        }
        if (this.score % 1 !== 0) {
          let dot = '0.' + this.score.toString().split('.')[1]
          if (parseFloat(dot) >= 0.5) {
            starClassList.push(CLS_HALF)
          }
        }
        while (starClassList.length !== LENGTH) {
          starClassList.push(CLS_OFF)
        }
        return starClassList
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import "../../common/stylus/mixin.styl"
  .star
    display flex
    align-items: center
    justify-content: center
    &.star-24
     .star-item
      flex 0 0 10px
      width 10px
      height 10px
      background-size 10px 10px
      background-repeat no-repeat
      &:last-child
        margin-right: 0
      &.on
       bg-image('star24_on')
      &.half
       bg-image('star24_half')
      &.off
        bg-image('star24_off')
    &.star-36
      .star-item
        flex 0 0 15px
        width 15px
        height 15px
        background-size 15px 15px
        background-repeat no-repeat
        &:last-child
          margin-right: 0
        &.on
         bg-image('star36_on')
        &.half
         bg-image('star36_half')
        &.off
         bg-image('star36_off')
    &.star-48
      .star-item
        flex 0 0 20px
        width 20px
        height 20px
        background-size 20px 20px
        margin-right: 22px
        background-repeat no-repeat
        &:last-child
          margin-right: 0
        &.on
          bg-image('star48_on')
        &.half
          bg-image('star48_half')
        &.off
          bg-image('star48_off')
</style>
