<template>
  <div class="comment">
    <div class="title-wrapper" v-if="title!==''">
      <h1 class="title">{{title}}</h1>
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
    <div class="line">
    </div>
    <div v-if="getComments.length>0" class="ratings">
      <ul>
        <li v-for="(item,index) in getComments" :key="index" class="rate-item">
          <div class="time-name-wrapper">
            <span class="time">{{item.rateTime|getTimeFormat('YYYY-MM-DD HH:MM')}}</span>
            <div class="name-wrapper">
              <span class="username">{{item.username}}</span>
              <img class="avatar" :src="item.avatar" alt="">
            </div>
          </div>
          <div class="content-wrapper">
            <span class="thumb" :class="{'icon-thumb_up':item.rateType===0,'icon-thumb_down':item.rateType===1}"></span>
            <p class="text">{{item.text}}</p>
          </div>
        </li>
      </ul>
    </div>
    <div v-else class="no-data">
      <span>暂无评价</span>
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
      },
      title: {
        type: String,
        default: ''
      },
      checks: {
        type: Array,
        default () {
          return []
        }
      }
    },
    methods: {
      onChecked (flag) {
        this.readContent = flag
      },
      getOkNum () {
        return this.data.filter(item => {
          return item.rateType === 0
        }).length
      },
      getNoNum () {
        return this.data.filter(item => {
          return item.rateType === 1
        }).length
      },
      getNum (index) {
        switch (index) {
          case 0:
            return this.data.length
          case 1:
            return this.getOkNum()
          case 2:
            return this.getNoNum()
        }
      }
    },
    data () {
      return {
        checked: false,
        checkerValue: 0,
        readContent: false
      }
    },
    computed: {
      getComments () {
        switch (this.checkerValue) {
          case 0:
            if (this.readContent) {
              return this.data.filter(item => {
                return item.text !== ''
              })
            }
            return this.data
          case 1:
            if (this.readContent) {
              return this.data.filter(item => {
                return item.rateType === 0 && item.text !== ''
              })
            }
            return this.data.filter(item => {
              return item.rateType === 0
            })
          case 2:
            if (this.readContent) {
              return this.data.filter(item => {
                return item.rateType === 1 && item.text !== ''
              })
            }
            return this.data.filter(item => {
              return item.rateType === 1
            })
          default:
            if (this.readContent) {
              return this.data.filter(item => {
                return item.text !== ''
              })
            }
            return this.data
        }
      },
      options () {
        let list = []
        this.checks.forEach((item, index) => {
          let opt = {
            value: index,
            text: `${item.text}${this.getNum(index)}`,
            type: item.type
          }
          list.push(opt)
        })
        return list
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import "../../common/stylus/mixin.styl"
  .comment
    position relative
    left 0
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
        background-color rgba(0, 160, 220, 0.2)
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
    .check-box
      margin-bottom 12px
    .line
      position absolute !important
      left 0
      right 0
      width 100%
      border-1px(rgba(7, 17, 27, 0.2))
    .ratings
      .rate-item
        padding 16px 0
      .time-name-wrapper
        display flex
        justify-content space-between
        margin-bottom 6px
        .time
          font-size 10px
          color #999
          line-height 12px
        .name-wrapper
          .username
            font-size 10px
            color #999
            margin-right 6px
          .avatar
            width 12px
            height 12px
      .content-wrapper
        width 100%
        display flex
        .thumb
          margin-right 3px
          font-size 12px
          &.icon-thumb_up
            color #00a0dc
          &.icon-thumb_down
            color #999
        .text
          flex 1
          font-size 12px
          color #333
          line-height 16px
          white-space normal
  .no-data
      font-size 12px
      color #999
      padding 15px
</style>
