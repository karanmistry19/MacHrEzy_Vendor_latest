export const CheckInMark = (obj) => (dispatch) => {
  x;
  return dispatch({
    type: "CHECK_IN",
    payload: {
      request: {
        url: `api/attendance/checkin`,
        method: "POST",
        data: obj,
      },
    },
  });
};

export const CheckOutMark = (obj) => (dispatch) => {
  return dispatch({
    type: "CHECK_OUT",
    payload: {
      request: {
        url: `api/attendance/checkout`,
        method: "POST",
        data: obj,
      },
    },
  });
};
