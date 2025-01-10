import { addError } from "../actions/toast.action";
const initialState = [];
const compOffTxnHistory = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_HISTORY_COMP_OFF_TXN_SUCCESS": {
      return action.payload.data;
    }
    case "FETCH_HISTORY_COMP_OFF_TXN_FAIL": {
      action.asyncDispatch(
        addError(action.error?.response?.data?.message, 3000),
      );
      return state;
    }

    case "REMOVE_COMP_OFF_TXN":
    case "LOGOUT": {
      return [];
    }

    default: {
      return state;
    }
  }
};

export default compOffTxnHistory;
