<template>
<div class="comment">
   <div class="title-wrapper">
     <h1 class="title">商品评价</h1>
   </div>
   <cube-checker
      v-model="checkerValue"
      :options="options"
      type="radio">
      <cube-checker-item
        v-for="item in options"
        :key="item.value"
        :option="item"
        :class="{dissatisfied:item.type===1}">
        <span class="checker-txt">{{item.text}}</span>
      </cube-checker-item>
    </cube-checker>
   <check-box :title="'只看有评论内容的'" :checked="true" @onChecked="onChecked"></check-box>
   <div class="ratings">
     <ul>
       <li></li>
     </ul>
   </div>
</div>
</template>

<script>
  import CheckBox from '../check-box/check-box'
  export default {
    name: 'comment',
    components: {
      CheckBox
    },
    props: {
      data: {
        type: Array
      }
    },
    methods: {
      onChecked(flag) {
      },
      getOkNum() {
        return this.data.filter(item => {
          return item.rateType === 0
        }).length
      },
      getNoNum() {
        return this.data.filter(item => {
          return item.rateType === 1
        }).length
      }
    },
    watch: {
      checkerValue(newValue) {
        console.log(newValue)
      }
    },
    data() {
      return {
        checked: false,
        checkerValue: 0,
        options: [
          {
            value: 0,
            text: `全部${this.data.length}`,
            type: 0
          },
          {
            value: 1,
            text: `推荐${this.getOkNum()}`,
            type: 0
          },
          {
            value: 2,
            text: `吐槽${this.getNoNum()}`,
            type: 1
          }
        ]
      }
    }
  }
</script>

<style lang="stylus" scoped>
.comment
  .title-wrapper
    margin-bottom 18px
    .title
      color #333
      font-size 14px
      line-height 14px
  .cube-checker
    margin-bottom 30px
    .cube-checker-item
      padding: 8px 12px
      background-color rgba(0,160,220,0.2)
      border-radius 0
      &.dissatisfied
        background-color #ccc
        &.cube-checker-item_active
          background-color rgb(102, 102, 102)
      &.cube-checker-item_active
       background-color #00a0dc
       border-radius 0
       .checker-txt
         color white
      &::after
        border none
      .checker-txt
        display inline-block
        width 100%
        height 100%
        font-size 12px
        line-height 16px
        color #666
</style>
