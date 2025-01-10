export const fetchGrades = (obj) => (dispatch) => {
  return dispatch({
    type: "FETCH_GRADES",
    payload: {
      request: {
        url: `api/grade`,
        method: "GET",
      },
    },
  });
};
