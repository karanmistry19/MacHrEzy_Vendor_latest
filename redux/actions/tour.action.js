export const fetchPendingTourTxn = (obj) => (dispatch) => {
  return dispatch({
    type: "FETCH_PENDING_TOUR_TXN",
    payload: {
      request: {
        url: "api/tour/txn/pending",
        method: "POST",
        data: obj,
      },
    },
  });
};

export const fetchHistoryTourTxn = (obj) => (dispatch) => {
  return dispatch({
    type: "FETCH_HISTORY_TOUR_TXN",
    payload: {
      request: {
        url: "api/tour/txn/history",
        method: "POST",
        data: obj,
      },
    },
  });
};

export const fetchSelctedTourTxn = (obj) => (dispatch) => {
  return dispatch({
    type: "FETCH_SELECTED_TOUR_TXN",
    payload: {
      request: {
        url: `api/tour/txn/selected?tranId=${obj.tranId}&empCode=${obj.empCode}`,
        method: "GET",
      },
    },
  });
};

export const fetchMyTourTxnForUser = (obj) => (dispatch) => {
  return dispatch({
    type: "FETCH_USER_TOUR_TXN",
    payload: {
      request: {
        url: `api/tour/txn/user`,
        method: "POST",
        data: obj,
      },
    },
  });
};

export const removeTourTxn = () => ({
  type: "REMOVE_SELECTED_TOUR_TXN",
});

export const removeTourData = () => ({
  type: "REMOVE_TOUR_TXN",
});

export const sanctionTourTxn = (obj) => (dispatch) => {
  return dispatch({
    type: "SANCTION_TOUR_TXN",
    payload: {
      request: {
        url: "api/tour/txn/sanction",
        method: "POST",
        data: obj,
      },
    },
  });
};

export const sanctionMultipleTourTxn = (obj) => (dispatch) => {
  return dispatch({
    type: "SANCTION_MULTIPLE_TOUR_TXN",
    payload: {
      request: {
        url: "api/tour/txn/sanction/multiple",
        method: "POST",
        data: obj,
      },
    },
  });
};

export const createTourTxn = (obj, navigate) => (dispatch) => {
  return dispatch({
    type: "CREATE_TOUR_TXN",
    navigate: navigate,
    payload: {
      request: {
        url: "api/tour/txn/create",
        method: "POST",
        data: obj,
      },
    },
  });
};

export const deleteTourTxn = (obj) => (dispatch) => {
  return dispatch({
    type: "DELETE_TOUR_TXN",
    payload: {
      request: {
        url: "api/tour/txn/delete",
        method: "POST",
        data: obj,
      },
    },
  });
};
