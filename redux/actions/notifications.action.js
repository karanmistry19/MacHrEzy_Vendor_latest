export const sendNotification = (obj) => (dispatch) => {
  return dispatch({
    type: "SEND_NOTIFICATION",
    payload: {
      request: {
        url: "api/notification",
        method: "POST",
        data: obj,
      },
    },
  });
};

export const fetchNotifications = () => (dispatch) => {
  return dispatch({
    type: "FETCH_NOTIFICATIONS",
    payload: {
      request: {
        url: "api/notification",
        method: "GET",
      },
    },
  });
};

export const fetchEmployee = () => (dispatch) => {
  return dispatch({
    type: "FETCH_EMPLOYEE",
    payload: {
      request: {
        url: "api/user/list",
        method: "GET",
      },
    },
  });
};

export const clearNotifications = () => (dispatch) => {
  return dispatch({
    type: "CLEAR_NOTIFICATION",
    payload: {
      request: {
        url: `api/notification`,
        method: "DELETE",
      },
    },
  });
};

export const seenAllNotifications = () => (dispatch) => {
  return dispatch({
    type: "SEEN_ALL_NOTIFICATION",
    payload: {
      request: {
        url: `api/notification/seen`,
        method: "GET",
      },
    },
  });
};

export const markAsRead = (notification) => (dispatch) => {
  return dispatch({
    type: "MARK_AS_READ",
    payload: {
      request: {
        url: `api/notification/read?notification=${notification}`,
        method: "GET",
      },
    },
  });
};
