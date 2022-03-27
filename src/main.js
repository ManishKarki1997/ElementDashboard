import Vue from "vue";
import VueRouter from "vue-router";
import ElementUI from "element-ui";
import locale from "element-ui/lib/locale/lang/en";
import VueBus from "vue-bus";
import VAnimateCss from "v-animate-css";

import appIcons from "./imports/fontawesome";

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";

appIcons.forEach((icon) => library.add(icon));

Vue.component("font-awesome-icon", FontAwesomeIcon);

Vue.use(VAnimateCss);

import App from "./App.vue";
import "./assets/styles/main.scss";

import "element-ui/lib/theme-chalk/index.css";

import router from "./router";
import store from "./store";

// vue prototypes registration
import api from "./utils/api";
import mutationConstants from "./constants/mutations";
import dateFns from "./utils/dateFns";

Vue.prototype.$api = api;
Vue.prototype.$mutationConstants = mutationConstants;

const utils = {
  dateFns,
};
Vue.prototype.$utils = utils;

Vue.use(ElementUI, {
  locale,
});
Vue.use(VueRouter);
Vue.use(VueBus);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
