export const openModal = (obj) => (dispatch) => {
  return dispatch({
    type: "MODAL_OPEN",
  });
};
export const closeModal = (obj) => (dispatch) => {
  return dispatch({
    type: "MODAL_CLOSE",
  });
};
