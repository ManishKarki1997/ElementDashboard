import mutationContants from "@/constants/mutations";

const { SET_USER } = mutationContants.user;
const { SET_STATS, SET_ACCOUNT_STATS } = mutationContants.dashboard;

const state = {
  user: {},
  // stats: null,
  // accountStats: null,
  stats: [
    {
      title: "Deposited Amount (on Hold)",
      count: "0",
      roles: ["super"],
    },
    {
      title: "Amount Released By Hirers",
      count: "2.26",
      roles: ["super"],
    },
    {
      title: "Withdrawal Amount Requested",
      count: "0",
      roles: ["super"],
    },
    {
      title: "Amount in Processing",
      count: "0",
      roles: ["super"],
    },
    {
      title: "Amount Released By Worckhub",
      count: "5",
      roles: ["super"],
    },
  ],
  accountStats: [
    {
      title: "Total Worcker SignUps",
      count: 13,
      roles: ["super", "editor"],
      uri: "/users?t=all_worckers",
    },
    {
      title: "Total Hirer SignUps",
      count: 12,
      roles: ["super", "editor"],
      uri: "/users?t=all_hirers",
    },
    {
      title: "Verified Worckers",
      count: 7,
      roles: ["super", "editor"],
      uri: "/users?t=verified_worckers",
    },
    {
      title: "Verified Hirers",
      count: 3,
      roles: ["super", "editor"],
      uri: "/users?t=verified_hirers",
    },
    {
      title: "Deposit Pending Milestones",
      count: 7,
      uri: "/milestones?status=deposit-pending",
      roles: ["super", "moderator"],
    },
    {
      title: "Ongoing Milestones",
      count: 0,
      uri: "/milestones?status=ongoing-milestones",
      roles: ["super", "moderator"],
    },
    {
      title: "Unresponded Orders",
      count: 3,
      uri: "/orders?status=unresponded",
      color: "green",
      roles: ["super", "moderator"],
    },
    {
      title: "Requested Skills",
      count: 1,
      uri: "/requested-skills",
      color: "green",
      roles: ["super", "editor"],
    },
    {
      title: "Verification Pending Gigs",
      count: 6,
      uri: "/gigs?status=unverified",
      roles: ["super", "editor"],
    },
    {
      title: "Completed Orders",
      count: 0,
      uri: "/orders?status=completed",
      roles: ["super", "moderator"],
    },
    {
      title: "Cancelled Orders",
      count: 24,
      uri: "/orders?status=cancelled",
      roles: ["super", "moderator"],
    },
    {
      title: "Withdrawal Requests",
      count: 0,
      uri: "/withdrawals",
      roles: ["super", "moderator"],
    },
    {
      title: "Withdrawal Requests Processings",
      count: 0,
      uri: "/withdrawals?t=processing",
      roles: ["super", "moderator"],
    },
  ],
};

const mutations = {
  [SET_USER](state, payload) {
    state.user = payload;
  },
  [SET_STATS](state, payload) {
    state.stats = payload;
  },
  [SET_ACCOUNT_STATS](state, payload) {
    state.accountStats = payload;
  },
};

const actions = {};

const getters = {
  user: (state) => state.user,
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
