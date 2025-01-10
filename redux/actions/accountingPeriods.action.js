export const fetchAccountingPeriods = () => (dispatch) => {
  return dispatch({
    type: "FETCH_ACCOUNTING_PERIODS",
    payload: {
      request: {
        url: "/api/compensation/acctprd",
        method: "GET",
      },
    },
  });
};
