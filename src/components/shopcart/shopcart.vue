<template>
  <div>
    <div class="shopcart">
      <div class="content">
        <div class="content-left">
          <div class="logo-wrapper" @click="toggleList">
            <div class="logo" :class="{'highlight': totalCount > 0}">
              <i class="icon-shopping_cart" :class="{'highlight': totalCount > 0}"></i>
            </div>
            <div class="num" v-show="totalCount > 0">{{ totalCount }}</div>
          </div>
          <div class="price" :class="{'highlight': totalPrice > 0}">￥{{ totalPrice }}</div>
          <div class="desc">另需配送费￥{{ deliveryPrice }}元</div>
        </div>
        <div class="content-right" @click="pay">
          <div class="pay" :class="payClass">
            {{ payDesc }}
          </div>
        </div>
      </div>
      <transition-group name="drop" class="ball-container" v-on:before-enter="beforeEnter" v-on:enter="enter"
                        v-on:after-enter="afterEnter">
        <div v-show="ball.show" class="ball" v-for="(ball, index) in balls" :key="ball.id">
          <div class="inner inner-hook"></div>
        </div>
      </transition-group>
      <transition name="fold">
        <div class="shopcart-list" v-show="listShow">
          <div class="list-header">
            <h1 class="title">购物车</h1>
            <span class="empty" @click="empty">清空</span>
          </div>
          <div class="list-content" ref="listContent">
            <ul>
              <li class="food" v-for="food in selectFoods">
                <span class="name">{{ food.name }}</span>
                <div class="price">
                  <span>￥{{ food.price * food.count }}</span>
                </div>
                <div class="cartcontrol-wrapper">
                  <cartcontrol :food="food"></cartcontrol>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </transition>
    </div>
    <transition name="fade">
      <div class="list-mask" v-show="listShow" @click="hideList"></div>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
  import cartcontrol from '@/components/cartcontrol/cartcontrol'
  import BScroll from 'better-scroll';

  export default {
    props: {
      deliveryPrice: {
        type: Number,
        default: 0
      },
      minPrice: {
        type: Number,
        default: 0
      },
      selectFoods: {
        type: Array,
        default() {
          return [];
        }
      }
    },
    data() {
      return {
        balls: [
          {
            id: 1,
            show: false
          },
          {
            id: 2,
            show: false
          },
          {
            id: 3,
            show: false
          },
          {
            id: 4,
            show: false
          },
          {
            id: 5,
            show: false
          }
        ],
        dropBalls: [],
        fold: true
      }
    },
    computed: {
      totalPrice() {
        let total = 0;
        this.selectFoods.forEach(function (food) {
          total += food.price * food.count;
        });
        return total;
      },
      totalCount() {
        let count = 0;
        this.selectFoods.forEach(function (food) {
          count += food.count;
        });
        return count;
      },
      payDesc() {
        if (this.totalPrice === 0) {
          return `￥${this.minPrice}元起送`;
        } else if (this.totalPrice < this.minPrice) {
          let diff = this.minPrice - this.totalPrice;
          return `还差￥${diff}元起送`;
        } else {
          return '去结算';
        }
      },
      payClass() {
        if (this.totalPrice < this.minPrice) {
          return 'not-enough';
        } else {
          return 'enough';
        }
      },
      listShow() {
        if (!this.totalCount) {
          this.fold = true;
          return false;
        }
        let show = !this.fold;
        if (show) {
          this.$nextTick(function () {
            if (!this.scroll) {
              this.scroll = new BScroll(this.$refs.listContent, {
                click: true
              });
            } else {
              this.scroll.refresh();
            }
          });
        }
        return show;
      }
    },
    methods: {
      drop(el) {
//        console.log(el);
        for (let i = 0; i < this.balls.length; i++) {
          let ball = this.balls[i];
          if (!ball.show) {
            ball.show = true;
            ball.el = el;
            this.dropBalls.push(ball);
            return;
          }
        }
      },
      beforeEnter(el) {
        let count = this.balls.length;
        while (count--) {
          let ball = this.balls[count];
          if (ball.show) {
            let rect = ball.el.getBoundingClientRect();
            let x = rect.left - 32;
            let y = -(window.innerHeight - rect.top - 22);
            el.style.display = '';
            el.style.webkitTransform = `translate3d(0, ${y}px, 0)`;
            el.style.transform = `translate3d(0, ${y}px, 0)`;
            let inner = el.getElementsByClassName('inner-hook')[0];
            inner.style.webkitTransform = `translate3d(${x}px, 0, 0)`;
            inner.style.Transform = `translate3d(${x}px, 0, 0)`;
          }
        }
      },
      enter(el) {
        let rf = el.offsetHeight;
        this.$nextTick(() => {
          el.style.webkitTransform = 'translate3d(0, 0, 0)';
          el.style.transform = 'translate3d(0, 0, 0)';
          let inner = el.getElementsByClassName('inner-hook')[0];
          inner.style.webkitTransform = 'translate3d(0, 0, 0)';
          inner.style.Transform = 'translate3d(0, 0, 0)';
        })
      },
      afterEnter(el) {
        let ball = this.dropBalls.shift();
        if (ball) {
          ball.show = false;
          el.style.display = 'none';
        }
      },
      toggleList() {
        if (!this.totalCount) {
          return;
        }
        this.fold = !this.fold;
      },
      empty() {
        this.selectFoods.forEach(function (food) {
          food.count = 0;
        })
      },
      hideList() {
        this.fold = true;
      },
      pay() {
        if (this.totalPrice < this.minPrice) {
          return;
        }
        window.alert(`支付${this.totalPrice}元`);
        this.selectFoods.forEach(function (food) {
          food.count = 0;
        })
      }
    },
    components: {
      cartcontrol
    }
  }
</script>

<style>
  .shopcart {
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 50;
    width: 100%;
    height: 48px;
    background-color: #000;
  }

  .shopcart .content {
    display: flex;
    background-color: #141d27;
    font-size: 0;
  }

  .shopcart .content .content-left {
    flex: 1;
    vertical-align: top;
  }

  .shopcart .content .content-left .logo-wrapper {
    display: inline-block;
    position: relative;
    top: -10px;
    margin: 0 12px;
    padding: 6px;
    width: 56px;
    height: 56px;
    box-sizing: border-box;
    border-radius: 50%;
    background-color: #141d27;
  }

  .shopcart .content .content-left .logo-wrapper .logo {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: #2b343c;
    text-align: center;
    /*z-index: 300;*/
  }

  .shopcart .content .content-left .logo-wrapper .logo.highlight {
    background-color: rgb(0, 160, 220);
  }

  .shopcart .content .content-left .logo-wrapper .logo .icon-shopping_cart {
    font-size: 24px;
    color: #80858a;
    line-height: 44px;
    /*z-index: 300;*/
  }

  .shopcart .content .content-left .logo-wrapper .logo .icon-shopping_cart.highlight {
    color: #fff;
  }

  .shopcart .content .content-left .logo-wrapper .num {
    position: absolute;
    top: 0;
    right: 0;
    width: 24px;
    height: 16px;
    line-height: 16px;
    text-align: center;
    border-radius: 16px;
    font-size: 9px;
    font-weight: 700;
    color: #fff;
    background-color: rgb(240, 20, 20);
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4);
  }

  .shopcart .content .content-left .price {
    display: inline-block;
    vertical-align: top;
    line-height: 24px;
    margin-top: 12px;
    box-sizing: border-box;
    padding-right: 12px;
    border-right: 1px solid rgba(255, 255, 255, 0.1);
    font-size: 16px;
    font-weight: 700;
    color: rgba(255, 255, 255, 0.4);
  }

  .shopcart .content .content-left .price.highlight {
    color: #fff;
  }

  .shopcart .content .content-left .desc {
    display: inline-block;
    vertical-align: top;
    line-height: 24px;
    margin: 12px 0 0 12px;
    font-size: 10px;
    color: rgba(255, 255, 255, 0.4);
  }

  .shopcart .content .content-right {
    flex: 0 0 105px;
    width: 105px;
  }

  .shopcart .content .content-right .pay {
    height: 48px;
    line-height: 48px;
    text-align: center;
    font-size: 12px;
    font-weight: 700;
    color: rgba(255, 255, 255, 0.4);
    background-color: #2b333b;
  }

  .shopcart .content .content-right .pay.not-enough {
    background-color: #2b333b;
  }

  .shopcart .content .content-right .pay.enough {
    background-color: #00b43c;
    color: #fff;
  }

  .ball-container {
    /*transition: all .4s;*/
  }

  .ball-container .ball {
    position: fixed;
    left: 32px;
    bottom: 22px;
    z-index: 200;
    /*transition: all 0.6s cubic-bezier(0.49, -0.29, 0.75, 0.41);*/
  }

  .ball-container .ball .inner {
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background-color: rgb(0, 160, 220);
    transition: all .4s linear;
  }

  .ball-container .ball.drop-enter-active {
    transition: all 0.6s cubic-bezier(0.17, -0.67, 0.81, 1.04);
  }

  .shopcart .shopcart-list {
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    width: 100%;
    transform: translate3d(0, -100%, 0);
  }

  .shopcart .shopcart-list.fold-enter-active, .shopcart .shopcart-list.fold-leave-active {
    transition: all 0.3s linear;
    /*transform: translate3d(0, -100%, 0);*/
  }

  .shopcart .shopcart-list.fold-enter, .shopcart .shopcart-list.fold-leave-active {
    transform: translate3d(0, 0, 0);
  }

  .shopcart .shopcart-list .list-header {
    height: 40px;
    line-height: 40px;
    padding: 0 18px;
    background-color: #f3f5f7;
    border-bottom: 1px solid rgba(7, 17, 27, 0.1);
  }

  .shopcart .shopcart-list .list-header .title {
    float: left;
    font-size: 14px;
    color: rgb(7, 17, 27);
  }

  .shopcart .shopcart-list .list-header .empty {
    float: right;
    font-size: 12px;
    color: rgb(0, 160, 220);
  }

  .shopcart .shopcart-list .list-content {
    padding: 0 18px;
    max-height: 217px;
    background-color: #fff;
    overflow: hidden;
  }

  .shopcart .shopcart-list .list-content .food {
    position: relative;
    padding: 12px 0;
    box-sizing: border-box;
    border-bottom: 1px solid rgba(7, 17, 27, 0.1);
  }

  .shopcart .shopcart-list .list-content .food .name {
    line-height: 24px;
    font-size: 14px;
    color: rgb(7, 17, 27);
  }

  .shopcart .shopcart-list .list-content .food .price {
    position: absolute;
    right: 90px;
    bottom: 12px;
    line-height: 24px;
    font-size: 14px;
    font-weight: 700;
    color: rgb(240, 20, 20);
  }

  .shopcart .shopcart-list .list-content .food .cartcontrol-wrapper {
    position: absolute;
    right: 0;
    bottom: 6px;
  }

  .list-mask {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 40;
    opacity: 1;
    background-color: rgba(7, 17, 27, 0.6);
    backdrop-filter: blur(10px);
    transition: all .5s;
  }

  .list-mask.fade-enter, .list-mask.fade-leave-active {
    opacity: 0;
    background-color: rgba(7, 17, 27, 0);
  }
</style>
