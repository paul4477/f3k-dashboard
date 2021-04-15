import Vue from "vue";
import App from "./App.vue";
import router from "./router";
//import "./registerServiceWorker";


import VueCookies from 'vue-cookies'
Vue.use(VueCookies)
Vue.$cookies.config('12h')

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
