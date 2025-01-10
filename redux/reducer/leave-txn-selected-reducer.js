import { addError } from "../actions/toast.action";
const initialState = null;
const selectedLeaveTransaction = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_LEAVE_TXN_SELCTED_SUCCESS": {
      return action.payload.data;
    }

    case "FETCH_LEAVE_TXN_SELCTED_FAIL": {
      action.asyncDispatch(
        addError(action.error?.response?.data?.message, 3000),
      );
      return state;
    }

    case "REMOVE_SELECTED_TXN": {
      return null;
    }

    case "LOGOUT": {
      return null;
    }

    default: {
      return state;
    }
  }
};

export default selectedLeaveTransaction;
