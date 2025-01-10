import { addError } from "../actions/toast.action";
const initialState = [];
const leaveTxnApplied = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_LEAVE_TXN_APPLIED_SUCCESS": {
      return action.payload.data;
    }

    case "FETCH_LEAVE_TXN_APPLIED_FAIL": {
      action.asyncDispatch(
        addError(action.error?.response?.data?.message, 3000),
      );
      return state;
    }

    case "SET_APPLIED_LEAVE_TXN": {
      return [];
    }

    case "LOGOUT": {
      return [];
    }

    default: {
      return state;
    }
  }
};

export default leaveTxnApplied;
