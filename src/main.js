import Vue from "vue";
import App from "./App.vue";
import router from "./router";

import store from '@/store.js'

import VueCookies from 'vue-cookies'
Vue.use(VueCookies)
Vue.$cookies.config('12h')

Vue.config.productionTip = false;

Vue.filter('secondsToString', function (time) {
  function pad0 (value, count) {
    var result = value.toString()
    for (; result.length < count; --count) {
      result = '0' + result
    }
    return result
  }
  const minutes = Math.floor(time / 60)
  const seconds = Math.floor(time % 60)
  const fraction = (time * 10) % 10
  return `${pad0(minutes, 2)}:${pad0(seconds, 2)}.${Math.floor(fraction)}`
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
