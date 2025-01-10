export const fetchItDeclaration = (obj) => (dispatch) => {
  return dispatch({
    type: "FETCH_IT_DECLARATION",
    payload: {
      request: {
        url: "/api/compensation/empITDecl",
        method: "POST",
        data: obj,
      },
    },
  });
};

export const saveItDeclaration = (obj, navigate) => (dispatch) => {
  return dispatch({
    type: "SAVE_IT_DECLARATION",
    navigate: navigate,
    payload: {
      request: {
        url: "/api/compensation/insert/it-decl",
        method: "POST",
        data: obj,
      },
    },
  });
};

export const removeItDeclaration = () => (dispatch) => {
  return dispatch({
    type: "REMOVE_IT_DECLARATION",
  });
};
export const removeSelectedDeclaration = () => (dispatch) => {
  return dispatch({
    type: "REMOVE_SELECTED_IT_DECLARATION",
  });
};

export const setSelectedDeclaration = (obj) => (dispatch) => {
  return dispatch({
    type: "SET_SELECTED_IT_DECLARATION",
    payload: {
      data: obj,
    },
  });
};
