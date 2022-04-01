import mutationContants from "@/constants/mutations";

const { SET_CATEGORIES } = mutationContants.categories;

const state = {
  categories: null,
  isLoadingCategories: false,
};

const mutations = {
  [SET_CATEGORIES](state, payload) {
    state.categories = payload;
  },
};

const actions = {
  async fetchCategories({ commit }) {
    try {
      this.isLoadingCategories = true;
      const res = await this._vm.$api.getWithPayload(`/categories`);
      commit(SET_CATEGORIES, res.docs);
    } catch (err) {
      err;
    } finally {
      this.isLoadingCategories = true;
    }
  },
};

const getters = {
  //   user: (state) => state.user,
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
