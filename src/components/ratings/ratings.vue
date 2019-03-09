<template>
  <div class="ratings" ref="ratings">
    <div class="ratings-content">
      <div class="overview">
        <div class="overview-left">
          <h1 class="score">{{ seller.score }}</h1>
          <div class="title">综合评分</div>
          <div class="rank">高于周边商家{{ seller.rankRate }}%</div>
        </div>
        <div class="overview-right">
          <div class="score-wrapper">
            <span class="title">服务态度</span>
            <star :size="36" :score="seller.serviceScore" class="star"></star>
            <span class="score">{{ seller.serviceScore }}</span>
          </div>
          <div class="score-wrapper">
            <span class="title">商品评分</span>
            <star :size="36" :score="seller.foodScore" class="star"></star>
            <span class="score">{{ seller.foodScore }}</span>
          </div>
          <div class="delivery-wrapper">
            <span class="title">送达时间</span>
            <span class="delivery">{{ seller.deliveryTime }}分钟</span>
          </div>
        </div>
      </div>
      <split></split>
      <ratingselect :select-type="selectType" :only-content="onlyContent"
                    :ratings="ratings" @s-type="selectRatings"
                    @o-content="contentToggle"></ratingselect>
      <div class="rating-wrapper">
        <ul>
          <li v-for="rating in ratings" class="rating-item" v-show="needShow(rating.rateType,rating.text)">
            <div class="avatar">
              <img :src="rating.avatar" width="28px" height="28px">
            </div>
            <div class="content">
              <h1 class="name">{{ rating.username }}</h1>
              <div class="star-wrapper">
                <star class="star" :size="24" :score="rating.score"></star>
                <span class="delivery" v-show="rating.deliveryTime">{{ rating.deliveryTime }}分钟送达</span>
              </div>
              <p class="text">{{ rating.text }}</p>
              <div class="recommend" v-show="rating.recommend && rating.recommend.length">
                <i class="icon-thumb_up"></i>
                <span class="item" v-for="item in rating.recommend">{{ item }}</span>
              </div>
              <div class="time">{{ rating.rateTime | formatDate }}</div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import star from '@/components/star/star';
  import split from '@/components/split/split';
  import ratingselect from '@/components/ratingselect/ratingselect';
  import BScroll from 'better-scroll';
  import {formatDate} from '../../../static/js/date';

  const ALL = 2;

  export default {
    props: {
      seller: {
        type: Object
      }
    },
    data() {
      return {
        ratings: [],
        showFlag: false,
        selectType: ALL,
        onlyContent: true,
//        sType: this.selectType,
//        oContent: this.onlyContent
      }
    },
    mounted() {
      var that = this;
      this.$http.get('/api/ratings').then(function (res) {
        res = res.data;
        if (res.errno === 0) {
          that.ratings = res.seller;
//          console.log(that.ratings);
          that.$nextTick(function () {
            that.scroll = new BScroll(this.$refs.ratings, {
              click: true
            });
          })
        }
      })
    },
    methods: {
      needShow(type, text) {
        if (this.onlyContent && !text) {
          return false;
        }
        if (this.selectType === ALL) {
          return true;
        } else {
          return type === this.selectType;
        }
      },
      selectRatings(type) {
//        console.log(type);
        this.selectType = type;
        this.$nextTick(() => {
          this.scroll.refresh();
        });
      },
      contentToggle(onlyContent) {
//        console.log(onlyContent);
        this.onlyContent = onlyContent;
        this.$nextTick(() => {
          this.scroll.refresh();
        });
      }
    },
    filters: {
      formatDate(time) {
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm');
      }
    },
    components: {
      star,
      split,
      ratingselect
    }
  }
</script>

<style>
  .ratings {
    position: absolute;
    top: 174px;
    bottom: 0;
    left: 0;
    width: 100%;
    overflow: hidden;
  }

  .ratings .ratings-content .overview {
    display: flex;
    padding: 18px 0;
  }

  .ratings .ratings-content .overview .overview-left {
    flex: 0 0 137px;
    width: 137px;
    border-right: 1px solid rgba(7, 17, 27, 0.1);
    text-align: center;
    padding: 6px 0;
  }

  @media only screen and (max-width: 320px) {
    .ratings .ratings-content .overview .overview-left {
      flex: 0 0 110px;
      width: 110px;
    }
  }

  .ratings .ratings-content .overview .overview-left .score {
    line-height: 28px;
    font-size: 24px;
    color: rgb(255, 153, 0);
    margin-bottom: 6px;
  }

  .ratings .ratings-content .overview .overview-left .title {
    line-height: 12px;
    font-size: 12px;
    color: rgb(7, 17, 27);
    margin-bottom: 8px;
  }

  .ratings .ratings-content .overview .overview-left .rank {
    line-height: 10px;
    font-size: 10px;
    color: rgb(147, 153, 159);
  }

  .ratings .ratings-content .overview .overview-right {
    flex: 1;
    padding: 6px 0 6px 24px;
  }

  @media only screen and (max-width: 320px) {
    .ratings .ratings-content .overview .overview-right {
      padding-left: 6px;
    }
  }

  .ratings .ratings-content .overview .overview-right .score-wrapper {
    margin-bottom: 8px;
    font-size: 0;
  }

  .ratings .ratings-content .overview .overview-right .score-wrapper .title {
    display: inline-block;
    font-size: 12px;
    line-height: 18px;
    color: rgb(7, 17, 27);
    vertical-align: top;
  }

  .ratings .ratings-content .overview .overview-right .score-wrapper .star {
    display: inline-block;
    margin: 0 12px;
    vertical-align: top;
  }

  .ratings .ratings-content .overview .overview-right .score-wrapper .score {
    display: inline-block;
    font-size: 12px;
    line-height: 18px;
    color: rgb(255, 153, 0);
    vertical-align: top;
  }

  .ratings .ratings-content .overview .overview-right .delivery-wrapper {
    font-size: 0;
  }

  .ratings .ratings-content .overview .overview-right .delivery-wrapper .title {
    font-size: 12px;
    line-height: 18px;
    color: rgb(7, 17, 27);
  }

  .ratings .ratings-content .overview .overview-right .delivery-wrapper .delivery {
    font-size: 12px;
    color: rgb(147, 153, 159);
    margin-left: 12px;
  }

  .ratings .ratings-content .rating-wrapper {
    padding: 0 18px;
  }

  .ratings .ratings-content .rating-wrapper .rating-item {
    display: flex;
    padding: 18px 0;
    border-bottom: 1px solid rgba(7, 17, 27, 0.1);
  }

  .ratings .ratings-content .rating-wrapper .rating-item .avatar {
    flex: 0 0 28px;
    width: 28px;
    margin-right: 12px;
  }

  .ratings .ratings-content .rating-wrapper .rating-item .avatar img {
    border-radius: 50%;
  }

  .ratings .ratings-content .rating-wrapper .rating-item .content {
    position: relative;
    flex: 1;
  }

  .ratings .ratings-content .rating-wrapper .rating-item .content .name {
    margin-bottom: 4px;
    line-height: 12px;
    font-size: 10px;
    font-weight: 700;
    color: rgb(7, 17, 27);
  }

  .ratings .ratings-content .rating-wrapper .rating-item .content .star-wrapper {
    margin-bottom: 6px;
    font-size: 0;
  }

  .ratings .ratings-content .rating-wrapper .rating-item .content .star-wrapper .star {
    display: inline-block;
    margin-right: 16px;
    vertical-align: top;
  }

  .ratings .ratings-content .rating-wrapper .rating-item .content .star-wrapper .delivery {
    display: inline-block;
    line-height: 12px;
    font-size: 10px;
    color: rgb(147, 153, 159);
    vertical-align: top;
  }

  .ratings .ratings-content .rating-wrapper .rating-item .content .text {
    line-height: 18px;
    font-size: 12px;
    color: rgb(7, 17, 27);
    margin-bottom: 8px;
  }

  .ratings .ratings-content .rating-wrapper .rating-item .content .recommend {
    line-height: 16px;
    font-size: 0;
  }

  .ratings .ratings-content .rating-wrapper .rating-item .content .recommend .icon-thumb_up, .ratings .ratings-content .rating-wrapper .rating-item .content .recommend .item {
    display: inline-block;
    margin: 0 8px 4px 0;
    font-size: 9px;
  }

  .ratings .ratings-content .rating-wrapper .rating-item .content .recommend .icon-thumb_up {
    color: rgb(0, 160, 220);
  }

  .ratings .ratings-content .rating-wrapper .rating-item .content .recommend .item {
    padding: 0 6px;
    border: 1px solid rgba(7, 17, 27, 0.1);
    border-radius: 1px;
    color: rgb(147, 153, 159);
    background-color: #fff;
  }

  .ratings .ratings-content .rating-wrapper .rating-item .content .time {
    position: absolute;
    top: 0;
    right: 0;
    font-size: 10px;
    line-height: 12px;
    color: rgb(147, 153, 159);
  }
</style>
