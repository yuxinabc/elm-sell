<template>
  <div id="app" class="app-wrapper">
    <v-header :seller="seller"></v-header>
    <div class="tab-wrapper">
      <tab-bar :tabs="tabs"></tab-bar>
    </div>
  </div>
</template>

<script>
  import VHeader from './components/v-header/v-header.vue'
  import TabBar from './components/tabbar/tabbar'
  import { getSeller } from 'api'
  import goods from './components/goods/goods'
  import evaluation from './components/evaluation/evaluation'
  import business from './components/business/business'
  export default {
    name: 'app',
    data () {
      return {
        seller: {},
        tabs: [
          { label: '商品', component: goods, data: this.seller },
          { label: '评价', component: evaluation, data: this.seller },
          { label: '商家', component: business, data: this.seller }
        ]
      }
    },
    created () {
      this._getSeller()
    },
    methods: {
      _getSeller () {
        getSeller().then(seller => {
          this.seller = seller
        })
      }
    },
    components: {
      VHeader,
      TabBar
    }
  }
</script>

<style lang="stylus" scoped>
  .app-wrapper
    .tab-wrapper
      position fixed
      top: 134px
      left: 0
      right: 0
      bottom: 0
</style>
