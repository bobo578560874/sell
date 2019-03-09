// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import router from './router'
import axios from 'axios'
//import goods from './components/goods/goods'
Vue.prototype.$http = axios

router.push('/goods');

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
