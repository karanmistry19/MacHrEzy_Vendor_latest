export const fetchSite = (obj) => (dispatch) => {
  return dispatch({
    type: "FETCH_SITES",
    payload: {
      request: {
        url: `api/site`,
        method: "GET",
      },
    },
  });
};
