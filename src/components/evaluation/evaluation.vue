<template>
     <cube-scroll class="my-cube-scroll" :options="scrollOptions">
        <split></split>
        <comment :data="comments" :checks="titles"></comment>
      </cube-scroll>
</template>

<script>
  import Comment from '../comment/comment'
  import Split from '../split/split'
  import { getRatings } from '../../api'
  export default {
    name: 'evaluation',
    components: {
      Comment,
      Split
    },
    data() {
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
    created() {
      this.fetchData()
    },
    methods: {
      fetchData () {
        getRatings().then(ratings => {
          this.comments = ratings
        })
      }
    }
  }
</script>

<style lang="stylus" scoped>
.my-cube-scroll
   width 100%
   .comment
     padding 18px
</style>
