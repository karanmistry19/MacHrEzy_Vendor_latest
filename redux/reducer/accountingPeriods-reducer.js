import { addError } from "../actions/toast.action";
const initialState = [];
const accountingPeriods = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_ACCOUNTING_PERIODS_SUCCESS": {
      return action.payload.data;
    }
    case "FETCH_ACCOUNTING_PERIODS_FAIL": {
      action.asyncDispatch(
        addError(action.error?.response?.data?.message, 3000),
      );
      return state;
    }
    default: {
      return state;
    }
  }
};
export default accountingPeriods;
