const { mutations: mutationContants } = require("@/constants");
const { SET_USER } = mutationContants.user;

const state = {
  user: [],
};

const mutations = {
  [SET_USER](state, payload) {
    state.user = payload;
  },
};

const actions = {};

const getters = {
  user: (state) => state.user,
};

export default {
  state,
  mutations,
  actions,
  getters,
};
