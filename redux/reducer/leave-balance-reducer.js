import { addError } from "../actions/toast.action";
const initialState = [];
const leaveBalanceByEmployee = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_LEAVE_BALANCE_SUCCESS": {
      return action.payload.data;
    }
    case "FETCH_LEAVE_BALANCE_FAIL": {
      action.asyncDispatch(
        addError(action.error?.response?.data?.message, 3000),
      );
      return state;
    }

    case "INIT_LEAVE_BALANCE": {
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

export default leaveBalanceByEmployee;
