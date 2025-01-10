export const fetchPendingOdApplications =
  (obj = {}) =>
  (dispatch) => {
    return dispatch({
      type: "FETCH_PENDING_OD_APPLICATIONS",
      payload: {
        request: {
          url: `api/od-app/pending`,
          method: "POST",
          data: obj,
        },
      },
    });
  };

export const fetchAllOdApplications =
  (obj = {}) =>
  (dispatch) => {
    return dispatch({
      type: "FETCH_ALL_OD_APPLICATIONS",
      payload: {
        request: {
          url: `api/od-app/all`,
          method: "POST",
          data: obj,
        },
      },
    });
  };

export const fetchMyOdForUser = (obj) => (dispatch) => {
  return dispatch({
    type: "FETCH_OD_TXN_USER",
    payload: {
      request: {
        url: `api/od-app/user`,
        method: "POST",
        data: obj,
      },
    },
  });
};

export const fetchSelctedOdApplication = (obj) => (dispatch) => {
  return dispatch({
    type: "FETCH_SELECTED_OD_APPLICATION",
    payload: {
      request: {
        url: `api/od-app/selected?tranId=${obj.tranId}&empCode=${obj.empCode}`,
        method: "GET",
      },
    },
  });
};

export const fetchOdTabDeatils = (obj) => (dispatch) => {
  return dispatch({
    type: "FETCH_OD_TAB_DETAILS_APPLICATIONS",
    payload: {
      request: {
        url: `api/od-app/tab-details?eventDate=${obj.eventDate}&empCode=${obj.empCode}`,
        method: "GET",
      },
    },
  });
};

export const setSelectedODTransaction = () => ({
  type: "SET_SELECTED_OD_TRANSACTION",
});

export const setSelectedODTransactionTabDetails = () => ({
  type: "SET_SELECTED_OD_TRANSACTION_TABS",
});

export const sanctionOdApplications = (obj) => (dispatch) => {
  return dispatch({
    type: "SANCTION_OD_APPLICATIONS",
    payload: {
      request: {
        url: "api/od-app/sanction",
        method: "POST",
        data: obj,
      },
    },
  });
};

export const sanctionMultipleOdApplications = (obj) => (dispatch) => {
  return dispatch({
    type: "SANCTION_MULTIPLE_OD_APPLICATIONS",
    payload: {
      request: {
        url: "api/od-app/sanction/multiple",
        method: "POST",
        data: obj,
      },
    },
  });
};

export const removeOdData = (obj) => (dispatch) => {
  return dispatch({
    type: "REMOVE_OD_DATA",
  });
};

export const createOD = (obj, navigation) => (dispatch) => {
  return dispatch({
    type: "CREATE_OD_TXN",
    navigation: navigation,
    payload: {
      request: {
        url: "api/od-app/create",
        method: "POST",
        data: obj,
      },
    },
  });
};
export const deleteOD = (obj) => (dispatch) => {
  return dispatch({
    type: "DELETE_OD_TXN",
    payload: {
      request: {
        url: "api/od-app/delete",
        method: "POST",
        data: obj,
      },
    },
  });
};
