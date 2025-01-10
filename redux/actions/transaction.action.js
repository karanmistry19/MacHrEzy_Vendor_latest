export const findMyPendingTransaction = (obj) => (dispatch) => {
  return dispatch({
    type: "FETCH_MY_PENDING",
    payload: {
      request: {
        url: `api/transaction/pending`,
        method: "GET",
      },
    },
  });
};

export const findTeamPendingTransaction = (obj) => (dispatch) => {
  return dispatch({
    type: "FETCH_TEAM_PENDING",
    payload: {
      request: {
        url: `api/transaction/pending/team`,
        method: "GET",
      },
    },
  });
};

export const findMyPendingTransactionCount = (obj) => (dispatch) => {
  return dispatch({
    type: "FETCH_MY_PENDING_COUNT",
    payload: {
      request: {
        url: `api/transaction/pending/count`,
        method: "GET",
      },
    },
  });
};
