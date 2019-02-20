<template>
  <div class="collection" :class="{'active':collected}" @click.stop="collection">
    <i class="icon-favorite"></i>
    <span class="text">{{getText}}</span>
  </div>
</template>

<script>
  import { getFromToLocal, setToLocal } from '../../common/js/storage'
  export default {
    name: 'collection',
    props: {
      name: {
        type: String
      }
    },
    data () {
      return {
        collected: this.name
      }
    },
    watch: {
      name(newV) {
        this.collected = getFromToLocal(newV).collected
      }
    },
    computed: {
      getText () {
        return this.collected ? '已收藏' : '收藏'
      }
    },
    methods: {
      collection () {
        this.collected = !this.collected
        this._saveToLocal()
      },
      _saveToLocal () {
        setToLocal(this.name, { collected: this.collected })
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .collection
    display flex
    flex-flow column
    width 50px
    text-align center
    .icon-favorite
      font-size 24px
      line-height 24px
      color #ccc
      margin-bottom 7px
    .text
      font-size 10px
      line-height 10px
      color #666
    &.active
      .icon-favorite
        color #f01414
</style>
