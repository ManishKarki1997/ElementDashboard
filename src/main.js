import Vue from "vue";
import VueRouter from "vue-router";
import ElementUI from "element-ui";
import VueBus from "vue-bus";

import App from "./App.vue";
import "./assets/styles/main.scss";

import "element-ui/lib/theme-chalk/index.css";

import router from "./router";

Vue.use(ElementUI);
Vue.use(VueRouter);
Vue.use(VueBus);

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
