export const bdayCrrntMonth = () => (dispatch) => {
  return dispatch({
    type: "BDAY_CRRNT_MONTH",
    payload: {
      request: {
        url: "api/oracle/bdayDateOfCrrntMonth",
        method: "get",
      },
    },
  });
};

export const newJoin = () => (dispatch) => {
  return dispatch({
    type: "NEW_JOIN",
    payload: {
      request: {
        url: "api/oracle/newJoinOfPrevWeek",
        method: "get",
      },
    },
  });
};

export const birthdayWish = (obj) => (dispatch) => {
  return dispatch({
    type: "BIRTHDAY_WISH",
    payload: {
      request: {
        url: "api/send-mail",
        method: "POST",
        data: obj,
      },
    },
  });
};

export const removeMultipleUploadResult = () => (dispatch) => {
  return dispatch({
    type: "REMOVE_MULTIPLE_APPROVAL_RESULT",
  });
};
