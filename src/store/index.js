import Vue from "vue";
import Vuex from "vuex";
import VuexPersistence from "vuex-persist";
Vue.use(Vuex);

import User from "./modules/user";

const vuexLocal = new VuexPersistence({
  key: "kaido_template",
  storage: window.localStorage,
});

export default new Vuex.Store({
  modules: {
    user: User,
  },
  strict: false,
  plugins: [vuexLocal.plugin],
});
