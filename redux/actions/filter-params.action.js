export const setFilterParams = (obj) => (dispatch) => {
  return dispatch({
    type: "SET_FILTER_PARAMS",
    payload: {
      data: obj,
    },
  });
};

export const removeFilterParams = () => (dispatch) => {
  return dispatch({
    type: "REMOVE_FILTER_PARAMS",
  });
};

export const addLastScreen = () => (dispatch) => {
  return dispatch({
    type: "ADD_LAST_SCREEN",
  });
};
