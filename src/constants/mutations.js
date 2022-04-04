const vuexPrefixes = {
  user: "user",
  dashboard: "dashboard",
  categories: "categories",
};

const mutations = {
  user: {
    SET_USER: `SET_USER`,
  },
  dashboard: {
    SET_STATS: "SET_STATS",
    SET_ACCOUNT_STATS: "SET_ACCOUNT_STATS",
  },
  categories: {
    SET_CATEGORIES: "SET_CATEGORIES",
  },
};

export { vuexPrefixes };
export default mutations;
