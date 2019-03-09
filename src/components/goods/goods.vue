<template>
  <div>
    <div class="goods">
      <div class="menu-wrapper" ref="menuWrapper">
        <ul>
          <li v-for="(item, index) in goods" class="menu-item line" :class="{'current':currentIndex===index}"
              @click="selectMenu(index,$event)">
          <span class="text">
            <span v-show="item.type > 0" class="icon" :class="classMap[item.type]"></span>{{item.name}}
          </span>
          </li>
        </ul>
      </div>
      <div class="foods-wrapper" ref="foodsWrapper">
        <ul>
          <li v-for="item in goods" class="food-list food-list-hook">
            <h1 class="title">{{ item.name }}</h1>
            <ul>
              <li v-for="food in item.foods" class="food-item line" @click="selectFood(food,$event)">
                <div class="icon">
                  <img :src="food.icon" width="57" height="57">
                </div>
                <div class="content">
                  <h2 class="name">{{ food.name }}</h2>
                  <p class="desc">{{ food.description }}</p>
                  <div class="extra">
                    <span class="count">月售{{ food.sellCount }}份</span><span>好评率{{ food.rating }}%</span>
                  </div>
                  <div class="price">
                    <span class="now">￥{{ food.price }}</span><span v-show="food.oldPrice" class="old">￥{{ food.oldPrice }}</span>
                  </div>
                  <div class="cartcontrol-wrapper">
                    <cartcontrol :food="food" @cart-add="cartAdd"></cartcontrol>
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <shopcart ref="shopcart" :select-foods="selectFoods" :delivery-price="seller.deliveryPrice"
                :min-price="seller.minPrice"></shopcart>
    </div>
    <food :food="selectedFood" ref="food"></food>
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll';
  import shopcart from '@/components/shopcart/shopcart';
  import cartcontrol from '@/components/cartcontrol/cartcontrol';
  import  food from '@/components/food/food';

  export default {
    props: {
      seller: {
        type: Object
      }
    },
    data() {
      return {
        goods: [],
        listHeight: [],
        scrollY: 0,
        selectedFood: {}
      }
    },
    computed: {
      currentIndex() {
//        console.log(this.listHeight[0]);
//          console.log(this.scrollY);
//        console.log(this);
        for (let i = 0; i < this.listHeight.length; i++) {
          let height1 = this.listHeight[i];
          let height2 = this.listHeight[i + 1];
          if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
            return i;
//            console.log(height1)
          }
        }
        return 0;
      },
      selectFoods() {
        let foods = [];
        this.goods.forEach(function (good) {
          good.foods.forEach(function (food) {
            if (food.count) {
              foods.push(food);
            }
          });
        });
        return foods;
      }
    },
    created() {
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
      var that = this;
      this.$http.get('/api/goods').then(function (res) {
        res = res.data;
        if (res.errno === 0) {
          that.goods = res.seller;
          that.$nextTick(function () {
            that._initScroll();
            that._calculateHeight();
          })
//          console.log(that.goods);
        }
      });
    },
    methods: {
      _initScroll() {
        this.menuScroll = new BScroll(this.$refs.menuWrapper, {
          click: true
        });
        this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {
          click: true,
          probeType: 3
        });
        this.foodsScroll.on('scroll', (pos) => {
          this.scrollY = Math.abs(Math.round(pos.y));
//          console.log(this);
        })
      },
      _calculateHeight() {
        let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook');
        let height = 0;
        this.listHeight.push(height);
//        console.log(this.listHeight);
        for (let i = 0; i < foodList.length; i++) {
          let item = foodList[i];
          height += item.clientHeight;
          this.listHeight.push(height);
        }
//        console.log(this.listHeight);
      },
      selectMenu(index, event) {
        if (!event._constructed) {
          return;
        }
        let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook');
        let el = foodList[index];
        this.foodsScroll.scrollToElement(el, 300);
//        console.log(index);
      },
      cartAdd(target) {
        this.$nextTick(() => {
          this.$refs.shopcart.drop(target)
        })
      },
      selectFood(food, event) {
        if (!event._constructed) {
          return;
        }
        this.selectedFood = food;
        this.$refs.food.show();
      }
    },

    components: {
      shopcart,
      cartcontrol,
      food
    },
//    events: {
//      'cart.add'(target) {
//        this._drop(target)
//      }
//    }
  };
</script>

<style>
  .goods {
    display: flex;
    position: absolute;
    width: 100%;
    top: 174px;
    bottom: 46px;
    overflow: hidden;
  }

  .goods .menu-wrapper {
    position: relative;
    flex: 0 0 80px;
    width: 80px;
    background-color: #f3f5f7;
    /*text-align: center;*/
  }

  .goods .foods-wrapper {
    flex: 1;
  }

  .goods .menu-wrapper .menu-item {
    position: relative;
    display: table;
    height: 54px;
    width: 56px;
    line-height: 14px;
    padding: 0 12px;
  }

  .goods .menu-wrapper .menu-item.current {
    position: relative;
    margin-top: -1px;
    z-index: 10;
    background-color: #fff;
    font-weight: 700;
  }

  .goods .menu-wrapper .current .text {
    border: none;
  }

  .goods .menu-wrapper .menu-item .icon {
    display: inline-block;
    width: 12px;
    height: 12px;
    margin-right: 2px;
    background-size: 12px 12px;
    background-repeat: no-repeat;
    vertical-align: top;
  }

  .goods .menu-wrapper .menu-item .icon.decrease {
    background-image: url("decrease_3@2x.png")
  }

  .goods .menu-wrapper .menu-item .icon.discount {
    background-image: url("discount_3@2x.png")
  }

  .goods .menu-wrapper .menu-item .icon.guarantee {
    background-image: url("guarantee_3@2x.png")
  }

  .goods .menu-wrapper .menu-item .icon.invoice {
    background-image: url("invoice_3@2x.png")
  }

  .goods .menu-wrapper .menu-item .icon.special {
    background-image: url("special_3@2x.png")
  }

  .goods .menu-wrapper .menu-item .text {
    display: table-cell;
    width: 56px;
    vertical-align: middle;
    /*text-align: center;*/
    font-size: 12px;
    font-weight: 200;
  }

  .foods-wrapper {
    flex: 1;
  }

  .foods-wrapper .food-list .title {
    padding-left: 14px;
    height: 26px;
    line-height: 26px;
    border-left: 2px solid #d9dde1;
    font-size: 12px;
    color: rgb(147, 153, 159);
    background: #f3f5f7;
  }

  .foods-wrapper .food-list .food-item {
    display: flex;
    margin: 18px;
    padding-bottom: 18px;
  }

  .line {
    flex: 1;
    position: relative;
    top: -6px;
    border-bottom: 1px solid rgba(7, 17, 27, 0.1);
  }

  .foods-wrapper .food-list .food-item:last-child {
    border: none;
    margin-bottom: 0;
  }

  .foods-wrapper .food-list .food-item .icon {
    flex: 0 0 57px;
    margin-right: 10px;
  }

  .foods-wrapper .food-list .food-item .content {
    flex: 1;
  }

  .foods-wrapper .food-list .food-item .content .name {
    margin: 2px 0 8px 0;
    height: 14px;
    line-height: 14px;
    font-size: 14px;
    color: rgb(7, 17, 27);
  }

  .foods-wrapper .food-list .food-item .content .desc {
    margin-bottom: 8px;
    line-height: 12px;
    font-size: 10px;
    color: rgb(147, 153, 159);
  }

  .foods-wrapper .food-list .food-item .content .extra {
    line-height: 10px;
    font-size: 10px;
    color: rgb(147, 153, 159);
  }

  .foods-wrapper .food-list .food-item .content .extra .count {
    margin-right: 12px;
  }

  .foods-wrapper .food-list .food-item .content .price {
    font-weight: 700;
    line-height: 24px;
  }

  .foods-wrapper .food-list .food-item .content .price .now {
    margin-right: 8px;
    font-size: 14px;
    color: rgb(240, 20, 20);
  }

  .foods-wrapper .food-list .food-item .content .price .old {
    text-decoration: line-through;
    font-size: 10px;
    color: rgb(147, 153, 159);
  }

  .foods-wrapper .food-list .food-item .content .cartcontrol-wrapper {
    position: absolute;
    right: 0;
    bottom: 12px;
  }

</style>
