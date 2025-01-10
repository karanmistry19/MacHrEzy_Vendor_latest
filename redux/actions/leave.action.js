export const fetchLeave = () => (dispatch) => {
  return dispatch({
    type: "FETCH_LEAVE",
    payload: {
      request: {
        url: `api/leave`,
        method: "GET",
      },
    },
  });
};

export const fetchLeaveBalanceByEmployee = (obj) => (dispatch) =>
  dispatch({
    type: "FETCH_LEAVE_BALANCE",
    payload: {
      request: {
        url: `api/leave/balance?empCode=${obj.empCode}&year=${obj.year}`,
        method: "GET",
      },
    },
  });

export const fetchLeaveTxnPending =
  (obj = {}) =>
  (dispatch) => {
    return dispatch({
      type: "FETCH_LEAVE_TXN_PENDING",
      payload: {
        request: {
          url: `api/leave/txn/pending`,
          method: "POST",
          data: obj,
        },
      },
    });
  };

export const fetchLeaveTxnHistory =
  (obj = {}) =>
  (dispatch) => {
    return dispatch({
      type: "FETCH_LEAVE_TXN_HISTORY",
      payload: {
        request: {
          url: `api/leave/txn/history`,
          method: "POST",
          data: obj,
        },
      },
    });
  };

export const fetchLeaveTxnSelected = (obj) => (dispatch) => {
  return dispatch({
    type: "FETCH_LEAVE_TXN_SELCTED",
    payload: {
      request: {
        url: `api/leave/txn/selected?empCode=${obj.empCode}&tranId=${obj.tranId}`,
        method: "GET",
      },
    },
  });
};

export const fetchMyLeaveForUser = (obj) => (dispatch) => {
  return dispatch({
    type: "FETCH_USER_LEAVE_TXN",
    payload: {
      request: {
        url: `api/leave/txn/user`,
        method: "POST",
        data: obj,
      },
    },
  });
};

export const fetchLeaveTxnApplied = (obj) => (dispatch) => {
  return dispatch({
    type: "FETCH_LEAVE_TXN_APPLIED",
    payload: {
      request: {
        url: `api/leave/txn/applied`,
        method: "POST",
        data: obj,
      },
    },
  });
};

export const removeSelectedTxn = (obj) => (dispatch) => {
  return dispatch({
    type: "REMOVE_SELECTED_TXN",
    payload: null,
  });
};

export const initAppliedLeave = (obj) => (dispatch) => {
  return dispatch({
    type: "SET_APPLIED_LEAVE_TXN",
    payload: null,
  });
};

export const initLeaveBalance = (obj) => (dispatch) => {
  return dispatch({
    type: "INIT_LEAVE_BALANCE",
    payload: null,
  });
};
export const removeTxnData = () => (dispatch) => {
  return dispatch({
    type: "REMOVE_TXN_DATA",
    payload: null,
  });
};

export const fetchLeaveTxnOfEmployee = (obj) => (dispatch) => {
  return dispatch({
    type: "FETCH_LEAVE_TXN_BY_EMPLOYEE",
    payload: {
      request: {
        url: `api/leave/txn/employee/${obj.empCode}`,
        method: "GET",
        data: obj,
      },
    },
  });
};

export const sanctionLeaveTxn = (obj) => (dispatch) => {
  return dispatch({
    type: "SANCTION_LEAVE_TXN",
    payload: {
      request: {
        url: `api/leave/txn/sanction`,
        method: "POST",
        data: obj,
      },
    },
  });
};

export const sanctionMultipleLeaveTxn = (obj) => (dispatch) => {
  return dispatch({
    type: "SANCTION_MULTIPLE_LEAVE_TXN",
    payload: {
      request: {
        url: `api/leave/txn/sanction/multiple`,
        method: "POST",
        data: obj,
      },
    },
  });
};
export const setLeaveTaxHistoryNull = () => (dispatch) => {
  return dispatch({
    type: "REMOVE_TXN_DATA",
    payload: null,
  });
};

export const createLeave = (obj) => (dispatch) => {
  return dispatch({
    type: "CREATE_LEAVE",
    payload: {
      request: {
        url: "api/leave/txn/applyleave",
        method: "POST",
        data: obj,
      },
    },
  });
};

export const resetLeaveCreateStatusData = () => (dispatch) => {
  return dispatch({
    type: "REMOVE_LEAVE_DATA",
    payload: {},
  });
};