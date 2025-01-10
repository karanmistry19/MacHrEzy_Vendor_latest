export const fetchPendingShiftTxn = (obj) => (dispatch) => {
  return dispatch({
    type: "FETCH_PENDING_SHIFT_TXN",
    payload: {
      request: {
        url: "api/shift/txn/pending",
        method: "POST",
        data: obj,
      },
    },
  });
};

export const fetchHistoryShiftTxn = (obj) => (dispatch) => {
  return dispatch({
    type: "FETCH_HISTORY_SHIFT_TXN",
    payload: {
      request: {
        url: "api/shift/txn/history",
        method: "POST",
        data: obj,
      },
    },
  });
};

export const fetchSelctedShiftTxn = (obj) => (dispatch) => {
  return dispatch({
    type: "FETCH_SELECTED_SHIFT_TXN",
    payload: {
      request: {
        url: `api/shift/txn/selected?tranId=${obj.tranId}&empCode=${obj.empCode}`,
        method: "GET",
      },
    },
  });
};

export const fetchMyShiftForUser = (obj) => (dispatch) => {
  return dispatch({
    type: "FETCH_USER_SHIFT_TXN",
    payload: {
      request: {
        url: `api/shift/txn/user`,
        method: "POST",
        data: obj,
      },
    },
  });
};

export const setSelectedShiftTxn = () => ({
  type: "REMOVE_SELECTED_SHIFT_TXN",
});

export const removeShiftData = () => ({
  type: "REMOVE_SHIFT_TXN",
});

export const sanctionShiftTxn = (obj) => (dispatch) => {
  return dispatch({
    type: "SANCTION_SHIFT_TXN",
    payload: {
      request: {
        url: "api/shift/txn/sanction",
        method: "POST",
        data: obj,
      },
    },
  });
};

export const sanctionMultipleShiftTxn = (obj) => (dispatch) => {
  return dispatch({
    type: "SANCTION_MULTIPLE_SHIFT_TXN",
    payload: {
      request: {
        url: "api/shift/txn/sanction/multiple",
        method: "POST",
        data: obj,
      },
    },
  });
};
