import { Platform } from "react-native";

export const dwrApplicationCount = () => (dispatch) => {
  return dispatch({
    type: "DWR_COUNT_DETAILS",
    payload: {
      request: {
        url: "api/dwr/count",
        method: "get",
      },
    },
  });
};

export const dwrApprovalPending = () => (dispatch) => {
  return dispatch({
    type: "DWR_APPROVAL_PENDING",
    payload: {
      request: {
        url: "api/dwr/approval",
        method: "GET",
      },
    },
  });
};

export const dwrPendingDetails = () => (dispatch) => {
  return dispatch({
    type: "DWR_PENDING_DETAILS",
    payload: {
      request: {
        url: "api/dwr/pendingDetails",
        method: "get",
      },
    },
  });
};

export const dwrAllDetails = () => (dispatch) => {
  return dispatch({
    type: "DWR_ALL_DETAILS",
    payload: {
      request: {
        url: "api/dwr/all",
        method: "get",
      },
    },
  });
};

export const dwrApplicationApprove = (obj) => (dispatch) => {
  return dispatch({
    type: "DWR_APPLICATION_APPROVE",
    payload: {
      request: {
        url: "api/dwr/application/approve",
        method: "POST",
        data: obj,
      },
    },
  });
};

export const dwrApplicationReject = (obj) => (dispatch) => {
  return dispatch({
    type: "DWR_APPLICATION_REJECT",
    payload: {
      request: {
        url: "api/dwr/application/reject",
        method: "POST",
        data: obj,
      },
    },
  });
};

export const createDWRApplication = (obj) => (dispatch) => {
  let tranId =
    Platform.OS === "web"
      ? obj.get("tranId")
      : obj._parts.find((x) => x[0] === "tranId")[1];
  return dispatch({
    type: "DWR_APPLICATION_CREATE",
    payload: {
      request: {
        url:
          tranId && tranId != "null" && tranId != "undefined"
            ? "api/dwr/application/edit"
            : "api/dwr/application/create",
        method: "POST",
        data: obj,
      },
    },
  });
};

export const createDWRApplicationOnTransactionScreen = (obj) => (dispatch) => {
  let tranId =
    Platform.OS === "web"
      ? obj.get("tranId")
      : obj._parts.find((x) => x[0] === "tranId")[1];
  return dispatch({
    type: "DWR_APPLICATION_CREATE_TRANSACTION_SCREEN",
    payload: {
      request: {
        url:
          tranId && tranId != "null" && tranId != "undefined"
            ? "api/dwr/application/edit"
            : "api/dwr/application/create",
        method: "POST",
        data: obj,
      },
    },
  });
};

export const downloadFile = (id) => (dispatch) =>
  dispatch({
    type: "DOWNLOAD_DOCUMENT",
    payload: {
      request: {
        url: `/api/saved-file?fileId=${id}`,
        method: "GET",
      },
    },
  });
