const orderStatusMaps = {
  contract_accepted_by_hirer: {
    name: "Accepted by hirer",
    type: "success",
  },
  requested: {
    name: "Requested",
    type: "",
  },
  cancelled: {
    name: "Cancelled",
    type: "danger",
  },
  completed: {
    name: "Completed",
    type: "success",
  },
  unresponded: {
    name: "Unresponded",
    type: "warning",
  },
};

const keyValueMaps = {
  orderStatusMaps,
};

export default keyValueMaps;
