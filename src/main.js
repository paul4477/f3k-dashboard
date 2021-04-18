import Vue from "vue";
import App from "./App.vue";
import router from "./router";

import store from "@/store.js";

import VueCookies from "vue-cookies";
Vue.use(VueCookies);
Vue.$cookies.config("12h");

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
