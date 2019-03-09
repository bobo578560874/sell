<template>
  <div>
    <v-header :seller="seller"></v-header>
    <div class="tab">
      <div class="tab-item">
        <router-link to="/goods">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/ratings">评论</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/seller">商家</router-link>
      </div>
    </div>
    <keep-alive>
      <router-view :seller="seller"></router-view>
    </keep-alive>
  </div>
</template>

<script type="text/ecmascript-6">
  import {urlParse} from '../static/js/urlParse'
  import header from './components/header/header.vue'

  export default {
    data() {
      return {
        seller: {
          id: (() => {
            let queryParam = urlParse();
            console.log(queryParam);
            return queryParam.id;
          })()
        }
      };
    },
    created() {
      var that = this;
      this.$http.get('/api/seller?id=' + this.seller.id ).then((response) => {
        let res = response.data;
        if (res.errno === 0) {
//          that.seller = res.seller;
          that.seller = Object.assign({},that.seller,response.data.seller);
//          console.log(that.seller);
        }
      });
    },
    components: {
      'v-header': header
    }
  }
</script>

<style>
  .tab {
    position: relative;
    display: flex;
    width: 100%;
    height: 40px;
    line-height: 40px;
    z-index: 10;
  }

  .tab::before {
    border-top: 1px solid rgba(7, 17, 27, 0.1);
    display: block;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    content: ' ';
  }

  .tab::after {
    border-top: 1px solid rgba(7, 17, 27, 0.1);
    display: block;
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    content: ' ';
  }

  .tab .tab-item {
    flex: 1;
    text-align: center;
  }

  .tab .tab-item a {
    display: block;
    font-size: 14px;
    color: rgb(77, 85, 93);
  }

  .tab .tab-item .active {
    color: rgb(240, 20, 20);
  }
</style>
