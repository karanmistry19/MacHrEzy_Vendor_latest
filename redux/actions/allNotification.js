export const fetchAllNotifications = () => (dispatch) => {
  return dispatch({
    type: "FETCH_ALL_NOTIFICATIONS",
    payload: {
      request: {
        url: "api/all-notifications",
        method: "GET",
      },
    },
  });
};
