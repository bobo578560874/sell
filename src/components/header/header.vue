<template>
  <div class="header">
    <div class="content-wrapper">
      <div class="avatar">
        <img :src="seller.avatar" width="64" height="64">
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{ seller.name }}</span>
        </div>
        <div class="description">{{ seller.description }}/{{ seller.deliveryTime }}分钟送达</div>
        <div v-if="seller.supports" class="support">
          <span class="icon" :class="classMap[seller.supports[0].type]"></span>
          <span class="text">{{ seller.supports[0].description }}</span>
        </div>
      </div>
      <div class="support-count" v-if="seller.supports" @click="showDetail">
        <span class="count">{{ seller.supports.length }}个</span>
        <i class="icon-keyboard_arrow_right"></i>
      </div>
    </div>
    <div class="bulletin-wrapper" @click="showDetail">
      <span class="bulletin-title"></span><span class="bulletin-text">{{ seller.bulletin }}</span>
      <i class="icon-keyboard_arrow_right"></i>
    </div>
    <div class="background">
      <img :src="seller.avatar" width="100%" height="100%">
    </div>
    <transition name="fade">
      <div class="detail" v-show="detailShow">
        <div class="detail-wrapper clearfix">
          <div class="detail-main">
            <h1 class="detail-name">{{ seller.name }}</h1>
            <div class="star-wrapper">
              <star :size="48" :score="seller.score"></star>
            </div>
            <div class="detail-title">
              <div class="line"></div>
              <div class="detail-text">优惠信息</div>
              <div class="line"></div>
            </div>
            <ul v-if="seller.supports" class="supports">
              <li class="support-item" v-for="(item,index) in seller.supports">
                <span class="icon" :class="classMap[seller.supports[index].type]"></span>
                <span class="text">{{ seller.supports[index].description }}</span>
              </li>
            </ul>
            <div class="detail-title">
              <div class="line"></div>
              <div class="detail-text">商家公告</div>
              <div class="line"></div>
            </div>
            <div class="bulletin">
              <p class="content">{{ seller.bulletin }}</p>
            </div>
          </div>
        </div>
        <div class="detail-close" @click="showDetail">
          <i class="icon-close"></i>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
  import star from '@/components/star/star'

  export default {
    props: {
      seller: {
        type: Object
      }
    },
    data() {
      return {
        detailShow: false
      }
    },
    methods: {
      showDetail() {
        if (this.detailShow == false) {
          this.detailShow = true;
        } else {
          this.detailShow = false;
        }
      }
    },
    mounted() {
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
    },
    components: {
      star
    }
  };
</script>

<style>
  .header {
    position: relative;
    background-color: rgba(7, 17, 27, 0.5);
    color: #fff;
    overflow: hidden;
  }

  .header .content-wrapper {
    position: relative;
    padding: 24px 12px 18px 24px;
    font-size: 0;
  }

  .header .content-wrapper .avatar {
    display: inline-block;
    vertical-align: top;
  }

  .header .content-wrapper .avatar img {
    border-radius: 2px;
  }

  .header .content-wrapper .content {
    display: inline-block;
    /*font-size: 14px;*/
    margin-left: 16px;
    /*vertical-align: top;*/
  }

  .header .content-wrapper .content .title {
    margin: 2px 0 8px 0;
  }

  .header .content-wrapper .content .title .brand {
    display: inline-block;
    width: 30px;
    height: 18px;
    vertical-align: top;
    background-image: url("brand@2x.png");
    background-size: 30px 18px;
  }

  .header .content-wrapper .content .title .name {
    font-size: 16px;
    font-weight: bold;
    line-height: 18px;
    margin-left: 6px;
  }

  .header .content-wrapper .content .description {
    font-size: 12px;
    font-weight: 200;
    line-height: 12px;
    margin: 8px 0 10px 0;
  }

  .header .content-wrapper .content .support {
    font-size: 0;
    font-weight: 200;
    line-height: 12px;
    margin: 10px 0 2px 0;
  }

  .header .content-wrapper .content .support .icon {
    display: inline-block;
    width: 12px;
    height: 12px;
    /*background-image: url("decrease_1@2x.png");*/
    background-size: 12px 12px;
    vertical-align: top;
  }

  .decrease {
    background-image: url("decrease_1@2x.png")
  }

  .discount {
    background-image: url("discount_1@2x.png")
  }

  .guarantee {
    background-image: url("guarantee_1@2x.png")
  }

  .invoice {
    background-image: url("invoice_1@2x.png")
  }

  .special {
    background-image: url("special_1@2x.png")
  }

  .header .content-wrapper .content .support .text {
    display: inline-block;
    margin-left: 4px;
    font-size: 10px;
    font-weight: 200;
    line-height: 12px;
  }

  .header .content-wrapper .support-count {
    position: absolute;
    right: 12px;
    bottom: 14px;
    padding: 0 8px;
    height: 24px;
    line-height: 24px;
    border-radius: 14px;
    background-color: rgba(0, 0, 0, 0.2);
    text-align: center;
  }

  .header .content-wrapper .support-count .count {
    font-size: 10px;
    font-weight: 200;
    vertical-align: top;
  }

  .header .content-wrapper .support-count .icon-keyboard_arrow_right {
    font-size: 10px;
    line-height: 24px;
  }

  .header .bulletin-wrapper {
    position: relative;
    height: 28px;
    line-height: 28px;
    padding: 0 22px 0 12px;
    background-color: rgba(7, 17, 27, 0.2);
    /*font-size: 0;*/
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .header .bulletin-wrapper .bulletin-title {
    display: inline-block;
    vertical-align: top;
    margin-top: 8px;
    width: 22px;
    height: 12px;
    background-image: url("bulletin@2x.png");
    background-size: 22px 12px;
  }

  .header .bulletin-wrapper .bulletin-text {
    font-size: 10px;
    font-weight: 200;
    vertical-align: top;
    /*line-height: 28px;*/
    margin: 0 4px;
  }

  .header .bulletin-wrapper .icon-keyboard_arrow_right {
    position: absolute;
    font-size: 10px;
    right: 12px;
    top: 8px;
  }

  .header .background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    filter: blur(10px);
  }

  .header .detail {
    position: fixed;
    z-index: 100;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgba(7, 17, 27, 0.8);
    -webkit-backdrop-filter: blur(10px);
  }

  .fade-enter, .fade-leave-active {
    opacity: 0;
  }

  .fade-leave {
    opacity: 1;
  }

  .fade-enter-active, .fade-leave-active {
    transition: all .5s;
  }

  .header .detail .detail-wrapper {
    min-height: 100%;
    width: 100%;
  }

  .header .detail .detail-wrapper .detail-main {
    margin-top: 64px;
    padding-bottom: 64px;
  }

  .header .detail .detail-close {
    position: relative;
    width: 32px;
    height: 32px;
    margin: -64px auto 0 auto;
    clear: both;
    font-size: 32px;
  }

  .header .detail .detail-wrapper .detail-main .detail-name {
    line-height: 16px;
    text-align: center;
    font-size: 16px;
    font-weight: 700;
  }

  .header .detail .detail-wrapper .detail-main .star-wrapper {
    margin-top: 18px;
    padding: 2px 0;
    text-align: center;
  }

  .header .detail .detail-wrapper .detail-main .detail-title {
    display: flex;
    width: 80%;
    margin: 28px auto 24px;
  }

  .header .detail .detail-wrapper .detail-main .detail-title .line {
    flex: 1;
    position: relative;
    top: -6px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  }

  .header .detail .detail-wrapper .detail-main .detail-title .detail-text {
    padding: 0 12px;
    font-size: 14px;
    font-weight: 700;
  }

  .header .detail .detail-wrapper .detail-main .supports {
    width: 80%;
    margin: 0 auto;
  }

  .header .detail .detail-wrapper .detail-main .supports .support-item {
    padding: 0 12px;
    margin-bottom: 12px;
    font-size: 0;
  }

  .header .detail .detail-wrapper .detail-main .supports .support-item:last-child {
    margin-bottom: 0;
  }

  .header .detail .detail-wrapper .detail-main .supports .support-item .icon {
    display: inline-block;
    width: 16px;
    height: 16px;
    vertical-align: top;
    margin-right: 6px;
    background-size: 16px 16px;
    background-repeat: no-repeat;
  }

  .header .detail .detail-wrapper .detail-main .supports .support-item .icon.decrease {
    background-image: url("decrease_2@2x.png")
  }

  .header .detail .detail-wrapper .detail-main .supports .support-item .icon.discount {
    background-image: url("discount_2@2x.png")
  }

  .header .detail .detail-wrapper .detail-main .supports .support-item .icon.guarantee {
    background-image: url("guarantee_2@2x.png")
  }

  .header .detail .detail-wrapper .detail-main .supports .support-item .icon.invoice {
    background-image: url("invoice_2@2x.png")
  }

  .header .detail .detail-wrapper .detail-main .supports .support-item .icon.special {
    background-image: url("special_2@2x.png")
  }

  .header .detail .detail-wrapper .detail-main .supports .support-item .text {
    line-height: 16px;
    font-size: 12px;
  }

  .header .detail .detail-wrapper .detail-main .bulletin {
    width: 80%;
    margin: 0 auto;
  }

  .header .detail .detail-wrapper .detail-main .bulletin .content {
    padding: 0 12px;
    line-height: 24px;
    font-size: 12px;
  }
</style>
