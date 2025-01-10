import { addError } from "../actions/toast.action";
const initialState = [];
const leaveTxnHistory = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_LEAVE_TXN_HISTORY_SUCCESS": {
      return action.payload.data;
    }
    case "FETCH_LEAVE_TXN_HISTORY_FAIL": {
      action.asyncDispatch(
        addError(action.error?.response?.data?.message, 3000),
      );
      return state;
    }
    case "REMOVE_TXN_DATA": {
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

export default leaveTxnHistory;
