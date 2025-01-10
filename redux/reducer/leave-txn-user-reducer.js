import { addError } from "../actions/toast.action";
const initialState = [];
const leaveTxnUser = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_USER_LEAVE_TXN_SUCCESS": {
      return action.payload.data;
    }
    case "FETCH_USER_LEAVE_TXN_FAIL": {
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

export default leaveTxnUser;
