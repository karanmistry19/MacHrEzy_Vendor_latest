import { addError } from "../actions/toast.action";
const initialState = null;
const leaveTxnOfEmployee = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_LEAVE_TXN_BY_EMPLOYEE_SUCCESS": {
      return action.payload.data;
    }

    case "FETCH_LEAVE_TXN_BY_EMPLOYEE_FAIL": {
      action.asyncDispatch(
        addError(action.error?.response?.data?.message, 3000),
      );
      return state;
    }

    case "SET_SELECTED_LEAVE_TXN": {
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

export default leaveTxnOfEmployee;
