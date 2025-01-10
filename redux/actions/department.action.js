export const fetchDepartments = (obj) => (dispatch) => {
  return dispatch({
    type: "FETCH_DEPARTMENTS",
    payload: {
      request: {
        url: `api/department`,
        method: "GET",
      },
    },
  });
};
