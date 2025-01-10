export const fetchWorkwlowEmployee = (obj) => (dispatch) => {
  return dispatch({
    type: "FETCH_WORKFLOW_EMPLOYEE",
    payload: {
      request: {
        url: `api/user/employee/workflow`,
        method: "GET",
      },
    },
  });
};
