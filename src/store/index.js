import Vue from "vue";
import Vuex from "vuex";
import VuexPersistence from "vuex-persist";
Vue.use(Vuex);

import User from "./modules/user";
import Category from "./modules/categories";

const vuexLocal = new VuexPersistence({
  key: "kaido_template",
  storage: window.localStorage,
  modules: ["user"],
});

export default new Vuex.Store({
  modules: {
    user: User,
    category: Category,
  },
  plugins: [vuexLocal.plugin],
});
