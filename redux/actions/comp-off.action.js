export const fetchPendingCompOffTxn = (obj) => (dispatch) => {
  return dispatch({
    type: "FETCH_PENDING_COMP_OFF_TXN",
    payload: {
      request: {
        url: "api/comp-off/txn/pending",
        method: "POST",
        data: obj,
      },
    },
  });
};

export const fetchHistoryCompOffTxn = (obj) => (dispatch) => {
  return dispatch({
    type: "FETCH_HISTORY_COMP_OFF_TXN",
    payload: {
      request: {
        url: "api/comp-off/txn/history",
        method: "POST",
        data: obj,
      },
    },
  });
};

export const fetchUserCompOffTxn = (obj) => (dispatch) => {
  return dispatch({
    type: "FETCH_USER_COMP_OFF_TXN",
    payload: {
      request: {
        url: `api/comp-off/txn/user`,
        method: "POST",
        data: obj,
      },
    },
  });
};
export const fetchSelctedCompOffTxn = (obj) => (dispatch) => {
  return dispatch({
    type: "FETCH_SELECTED_COMP_OFF_TXN",
    payload: {
      request: {
        url: `api/comp-off/txn/selected?tranId=${obj.tranId}&empCode=${obj.empCode}`,
        method: "GET",
      },
    },
  });
};

export const fetchCompOffTabDeatils = (obj, navigation) => (dispatch) => {
  return dispatch({
    type: "FETCH_COMP_OFF_TXN_TAB_DETAILS",
    navigate: navigation,
    payload: {
      request: {
        url: `api/comp-off/txn/tab-details?eventDate=${obj.eventDate}&empCode=${obj.empCode}`,
        method: "GET",
      },
    },
  });
};

export const fetchCompOffHolidays = (obj) => (dispatch) => {
  return dispatch({
    type: "FETCH_HOLIDAYS_FOR_EMPLOYEE",
    payload: {
      request: {
        url: `api/comp-off/txn/holiday`,
        method: "POST",
        data: obj,
      },
    },
  });
};

export const setSelectedCompOffTxn = () => ({
  type: "REMOVE_SELECTED_COMP_OFF_TXN",
});

export const setSelectedCompOffTxnTabDetails = () => ({
  type: "REMOVE_SELECTED_COMP_OFF_TXN_TABS",
});

export const removeCompOffTxn = () => ({
  type: "REMOVE_COMP_OFF_TXN",
});

export const setSelectedCompOffTxnHolidays = () => ({
  type: "REMOVE_SELECTED_COMP_OFF_TXN_HOLIDAYS",
});

export const sanctionCompOffTxn = (obj) => (dispatch) => {
  return dispatch({
    type: "SANCTION_COMP_OFF_TXN",
    payload: {
      request: {
        url: "api/comp-off/txn/sanction",
        method: "POST",
        data: obj,
      },
    },
  });
};

export const sanctionMultipleCompOffTxn = (obj) => (dispatch) => {
  return dispatch({
    type: "SANCTION_MULTIPLE_COMP_OFF_TXN",
    payload: {
      request: {
        url: "api/comp-off/txn/sanction/multiple",
        method: "POST",
        data: obj,
      },
    },
  });
};

export const fetchUserCompOffDetail = (obj) => (dispatch) => {
  return dispatch({
    type: "FETCH_USER_COMP_OFF_DETAIL",
    payload: {
      request: {
        url: `api/comp-off/compoffdetails`,
        method: "POST",
        data: obj,
      },
    },
  });
};

export const createCompoff = (obj, navigation) => (dispatch) => {
  return dispatch({
    type: "CREATE_COMPOFF_TXN",
    navigation: navigation,
    payload: {
      request: {
        url: "api/comp-off/createcompoff",
        method: "POST",
        data: obj,
      },
    },
  });
};

export const resetCreateStatusData = () => (dispatch) => {
  return dispatch({
    type: "RESET_DATA",
    payload: {},
  });
};
