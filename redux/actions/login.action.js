export const login = (user) => (dispatch) => {
  return dispatch({
    type: "LOGIN",
    payload: {
      request: {
        url: "api/oracle/login",
        method: "POST",
        data: user,
      },
    },
  });
};

export const updatePassword = (obj) => (dispatch) => {
  return dispatch({
    type: "UPDATE_PASSWORD",
    payload: {
      request: {
        url: "api/user/password",
        method: "POST",
        data: obj,
      },
    },
  });
};

export const logout = () => (dispatch) => {
  return dispatch({
    type: "LOGOUT",
  });
};
