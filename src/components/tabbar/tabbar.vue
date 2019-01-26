<template>
  <div class="tab" >
    <cube-tab-bar v-model="selectedLabel"
                  showSlider
                  :use-transition="disabled"
                  ref="tabNav"
                  :data="tabs">
    </cube-tab-bar>
    <span class="line"></span>
    <div class="tab-slide-container">
      <cube-slide
        ref="slide"
        :loop="loop"
        :initial-index="initialIndex"
        :auto-play="autoPlay"
        :show-dots="showDots"
        :options="slideOptions"
        @scroll="scroll"
        @change="changePage"
      >
        <cube-slide-item v-for="(tab,index) in tabs" :key="index" :options="scrollOptions">
            <component :is="tab.component" :data="tab.data" ref="component"></component>
        </cube-slide-item>
      </cube-slide>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import { findIndex } from '../../../src/common/helpers/util'
  export default {
    name: 'tabbar',
    props: {
      tabs: {
        type: Array,
        default() {
          return []
        }
      },
      selectedIndex: {
        type: Number,
        default: 0
      },
      bottom: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        selectedLabel: this.findLabelByIndex(this.selectedIndex),
        disabled: false,
        loop: false,
        autoPlay: false,
        showDots: false,
        slideOptions: {
          listenScroll: true,
          probeType: 3,
          /* lock y-direction when scrolling horizontally and  vertically at the same time */
          directionLockThreshold: 0
        },
        scrollOptions: {
          /* lock x-direction when scrolling horizontally and  vertically at the same time */
          directionLockThreshold: 0
        }
      }
    },
    mounted() {
      // $refs.component 需要在mounted时才有值
      this.changePage(0)
    },
    methods: {
      changePage (current) {
        this.selectedLabel = this.tabs[current].label
       this.$refs.component[current].fetchData()
      },
      findLabelByIndex(index) {
        return this.tabs[index].label
      },
      scroll (pos) {
        const x = Math.abs(pos.x)
        const tabItemWidth = this.$refs.tabNav.$el.clientWidth
        const slideScrollerWidth = this.$refs.slide.slide.scrollerWidth
        const deltaX = x / slideScrollerWidth * tabItemWidth
        this.$refs.tabNav.setSliderTransform(deltaX)
      }
    },
    computed: {
      initialIndex () {
        let index = 0
        index = findIndex(this.tabs, item => item.label === this.selectedLabel)
        return index
      }
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../common/stylus/mixin.styl"
  .tab
    display flex
    flex-direction column
    height 100%
    .cube-tab-bar
      flex 0 0 40px
      height 40px
      font-size 14px
      line-height 14px
      color rgb(77, 85, 93)
      >>>.cube-tab_active
        color rgb(240, 20, 20)
      >>>.cube-tab-bar-slider
        background-color rgb(240, 20, 20)
    .line
      flex 0 0 1px
      height 1px
      border-1px(rgba(7, 17, 27, .2))
    .tab-slide-container
      flex 1;
      overflow hidden
</style>
