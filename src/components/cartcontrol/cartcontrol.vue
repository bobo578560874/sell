<template>
  <div class="cartcontrol">
    <transition name="slide">
      <div class="cart-dec icon-remove_circle_outline" v-show="food.count > 0" @click.stop.prevent="decCart"></div>
    </transition>
    <div class="cart-count" v-show="food.count > 0">{{ food.count }}</div>
    <div class="cart-add icon-add_circle" @click.stop.prevent="addCart"></div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Vue from 'vue'

  export default {
    props: {
      food: {
        type: Object
      }
    },
    mounted() {
//      console.log(this.food)
    },
    methods: {
      addCart(event) {
//        console.log('click');
        if (!event._constructed) {
          return;
        }
        if (!this.food.count) {
          Vue.set(this.food, 'count', 1);
        } else {
          this.food.count ++;
        }
        this.$emit('cart-add', event.target);
      },
      decCart(event) {
//        console.log('click');
        if (!event._constructed) {
          return;
        }
        if (this.food.count) {
//          Vue.set(this.food, 'count', 'count -= 1');
          this.food.count --;
        }
//        this.food.count -= 1;
      }
    }
  }
</script>

<style>
  .cartcontrol {
    font-size: 0;
  }

  .cartcontrol .cart-dec {
    display: inline-block;
    padding: 6px;
    line-height: 24px;
    font-size: 24px;
    color: rgb(0, 160, 220);
    /*transition: all .4s linear;*/
    /*transform: rotate(0deg);*/
  }

  .slide-enter-active, .slide-leave-active {
    transition: all .4s linear;
  }

  .slide-enter, .slide-leave-active {
    opacity: 0;
    transform: translate3d(24px, 0, 0);
    transform: rotate(180deg);
  }

  /*.slide-leave {*/
    /*opacity: 1;*/
    /*!*transform: translate3D(24px, 0, 0);*!*/
  /*}*/

  .cartcontrol .cart-count {
    display: inline-block;
    vertical-align: top;
    width: 12px;
    padding-top: 6px;
    line-height: 24px;
    text-align: center;
    font-size: 10px;
    color: rgb(147, 153, 159);
  }

  .cartcontrol .cart-add {
    display: inline-block;
    padding: 6px;
    line-height: 24px;
    font-size: 24px;
    color: rgb(0, 160, 220);
  }
</style>
