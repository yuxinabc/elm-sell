<template>
  <cube-scroll class="my-cube-scroll" :options="yScrollOption" ref="cubeScroll">
    <div class="brief-introduction-wrapper">
      <div class="name-rate-wrapper">
        <h1 class="name">{{seller.name}}</h1>
        <div class="star-wrapper">
          <star :size="36" :score="seller.score" v-if="seller.score"></star>
          <span class="rating-count">({{seller.ratingCount}})</span>
          <span class="sell-count">月售{{seller.sellCount}}单</span>
        </div>
      </div>
    </div>
    <div class="collection-wrapper">
      <collection :name="seller.name"></collection>
    </div>
    <div class="service-info-wrapper">
      <div class="start-price-wrapper">
        <p class="title">起送价</p>
        <div class="value-wrapper">
          <span class="value">{{seller.minPrice}}</span>
          <span>元</span>
        </div>
      </div>
      <div class="delivery-price-wrapper">
        <p class="title">商家配送</p>
        <div class="value-wrapper">
          <span class="value">{{seller.deliveryPrice}}</span>
          <span>元</span>
        </div>
      </div>
      <div class="delivery-time-wrapper">
        <p class="title">平均配送时间</p>
        <div class="value-wrapper">
          <span class="value">{{seller.deliveryTime}}</span>
          <span>分钟</span>
        </div>
      </div>
    </div>
    <split></split>
    <div class="notice-activity-wrapper">
      <div class="notice-wrapper">
        <h1 class="title">公告与活动</h1>
        <p class="content">{{seller.bulletin}}</p>
      </div>
      <div class="activity-wrapper">
        <ul class="activity-list">
          <li class="activity-item" v-for="(item,index) in seller.supports" :key="index">
            <sport-icon :size="4" :type="item.type"></sport-icon>
            <span class="content">{{item.description}}</span>
          </li>
        </ul>
      </div>
    </div>
    <split></split>
    <div class="real-scene-wrapper">
      <h1 class="title">商家实景</h1>
      <cube-scroll class="my-horizontal-scroll" :options="xScrollOption" ref="xCubeScroll">
        <ul class="img-list">
          <li class="img-item" v-for="(item,index) in seller.pics" :key="index">
            <img class="img" :src="item" alt="" width="120" height="90">
          </li>
        </ul>
      </cube-scroll>
    </div>
    <split></split>
    <div class="business-info-wrapper">
      <h1 class="title">商家信息</h1>
      <ul class="info-list">
        <li class="info-item" v-for="(item,index) in seller.infos" :key="index">
          <p class="info">{{item}}</p>
        </li>
      </ul>
    </div>
  </cube-scroll>
</template>

<script>
  import { getSeller } from '../../api'
  import Star from '../star/star'
  import Split from '../split/split'
  import SportIcon from '../support-icon/support-icon'
  import Collection from '../collection/collection'

  export default {
    name: 'business',
    components: {
      Star,
      Split,
      SportIcon,
      Collection
    },
    data () {
      return {
        seller: {},
        yScrollOption: {
          click: false,
          directionLockThreshold: 0
        },
        xScrollOption: {
          scrollX: true,
          stopPropagation: true,
          directionLockThreshold: 0
        }
      }
    },
    created () {
      this.fetchData()
    },
    methods: {
      fetchData () {
        getSeller().then(seller => {
          this.seller = seller
          this.$nextTick(() => {
            this.$refs.cubeScroll.refresh()
            this.$refs.xCubeScroll.refresh()
          })
        })
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .my-cube-scroll
    position relative
    .brief-introduction-wrapper
      padding 18px
      .name-rate-wrapper
        .name
          font-size 14px
          line-height 14px
          color #333
          margin-bottom 8px
        .star-wrapper
          display flex
          align-items center
          .rating-count
            font-size 10px
            line-height 18px
            color #666
            margin-left 8px
            margin-right 12px
          .sell-count
            font-size 10px
            line-height 18px
            color #666

    .collection-wrapper
      position absolute
      top 18px
      right  11px
    .service-info-wrapper
      display flex
      justify-content space-around
      padding 18px
      .start-price-wrapper, .delivery-price-wrapper, .delivery-time-wrapper
        flex 1
        text-align center
        border-right solid 1px #d9dde1
        .title
          font-size 10px
          line-height 10px
          color #999
          margin-bottom 4px
        .value-wrapper
          font-size 10px
          line-height 24px
          color #333
          .value
            font-size 24px
      div:last-child
        border-right none
    .notice-activity-wrapper
      padding 18px 18px 0 18px
      .notice-wrapper
        padding-bottom 16px
        .title
          font-size 14px
          line-height 14px
          color #333
          margin-bottom 8px
        .content
          font-size 12px
          line-height 24px
          color #f01414
          white-space normal
          padding 0 12px
      .activity-wrapper
        .activity-list
          .activity-item
            padding 16px 12px
            display flex
            align-items center
            .support-ico
              margin-right 6px
            .content
              font-size 12px
              line-height 16px
              color #333
    .real-scene-wrapper
      padding 18px
      .title
        font-size 14px
        line-height 14px
        color #333
        margin-bottom 12px
      .my-horizontal-scroll
        display: flex
        align-items: center
        .img-list
          .img-item
            display: inline-block
            margin-right: 6px
            width: 120px
            height: 90px
            &:last-child
              margin: 0
    .business-info-wrapper
      padding 18px
      .title
        font-size 14px
        line-height 14px
        color #333
        margin-bottom 12px
      .info-list
        .info-item
          padding 16px 12px
          .info
            line-height 16px
            font-size 12px
            color #333
</style>
