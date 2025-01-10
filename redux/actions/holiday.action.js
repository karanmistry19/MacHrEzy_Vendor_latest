export const fetchHolidays = (obj) => (dispatch) => {
  return dispatch({
    type: "FETCH_HOLIDAY",
    payload: {
      request: {
        url: `api/holiday`,
        method: "GET",
      },
    },
  });
};
