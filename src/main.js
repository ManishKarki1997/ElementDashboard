import Vue from "vue";
import VueRouter from "vue-router";
import ElementUI from "element-ui";
import locale from "element-ui/lib/locale/lang/en";
import VueBus from "vue-bus";

import appIcons from "./imports/fontawesome";

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";

appIcons.forEach((icon) => library.add(icon));

Vue.component("font-awesome-icon", FontAwesomeIcon);

import App from "./App.vue";
import "./assets/styles/main.scss";

import "element-ui/lib/theme-chalk/index.css";

import router from "./router";

Vue.use(ElementUI, {
  locale,
});
Vue.use(VueRouter);
Vue.use(VueBus);

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
