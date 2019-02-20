<template>
  <cube-scroll class="my-cube-scroll" :options="scrollOptions" ref="myCubeScroll">
    <div class="comprehensive">
      <div class="left">
        <div class="score-wrapper">
          <p class="score">4.2</p>
          <p class="score-tip">综合评分</p>
          <p class="score-rate">高于周边商家95%</p>
        </div>
      </div>
      <div class="right">
        <div class="service-attitude-wrapper">
          <span class="service-attitude">服务态度</span>
          <star :size="36" :score="4.1"></star>
          <span class="score">4.1</span>
        </div>
        <div class="good-rate-wrapper">
          <span class="service-attitude">商品评价</span>
          <star :size="36" :score="4.1"></star>
          <span class="score">4.1</span>
        </div>
        <div class="delivery-time">
          <span class="title">送达时间</span>
          <span class="time">38分钟</span>
        </div>
      </div>
    </div>
    <split></split>
    <comment :data="comments" :checks="titles"></comment>
  </cube-scroll>
</template>

<script>
  import Comment from '../comment/comment'
  import Star from '../star/star'
  import Split from '../split/split'
  import { getRatings } from '../../api'

  export default {
    name: 'evaluation',
    components: {
      Comment,
      Split,
      Star
    },
    data () {
      return {
        comments: [],
        titles: [
          { text: '全部', type: 0 },
          { text: '满意', type: 0 },
          { text: '不满意', type: 1 }
        ],
        scrollOptions: {
          click: false,
          directionLockThreshold: 0
        }
      }
    },
    created () {
      this.fetchData()
    },
    computed: {},
    methods: {
      fetchData () {
        getRatings().then(ratings => {
          this.comments = ratings
          this.$nextTick(() => {
            this.$refs.myCubeScroll.refresh()
          })
        })
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .my-cube-scroll
    width 100%
    .comprehensive
      display flex
      padding 18px 0
      .left
        flex 0 0 137px
        width 137px
        border-right solid 1px #ccc
        padding 6px 0
        .score-wrapper
          text-align center
          .score
            font-size 24px
            line-height 28px
            color #fc9153
            margin-bottom 6px
          .score-tip
            font-size 12px
            line-height 12px
            color #333
            margin-bottom 8px
          .score-rate
            font-size 10px
            line-height 10px
            color #999
      .right
        flex 1
        padding 6px 0 6px 24px
        .service-attitude-wrapper, .good-rate-wrapper
          display flex
          align-items center
          margin-bottom 8px
          .service-attitude
            font-size 12px
            line-height 18px
            color #333
          .star
            margin 0 12px
          .score
            font-size 12px
            line-height 18px
            color #fc9153
        .delivery-time
          margin-bottom 8px
          .title
            font-size 12px
            line-height: 18px
            color #333
            margin-right 12px
          .time
            font-size 12px
            line-height: 12px
            color #999
    .comment
      padding 18px
</style>
