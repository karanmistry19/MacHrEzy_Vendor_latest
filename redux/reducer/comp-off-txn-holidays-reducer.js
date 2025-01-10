import { addError } from "../actions/toast.action";
const initialState = null;
const selectedCompOffTxnHolidays = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_HOLIDAYS_FOR_EMPLOYEE_SUCCESS": {
      return action.payload.data;
    }

    case "FETCH_HOLIDAYS_FOR_EMPLOYEE_FAIL": {
      action.asyncDispatch(
        addError(action.error?.response?.data?.message, 3000),
      );
      return state;
    }

    case "REMOVE_SELECTED_COMP_OFF_TXN_HOLIDAYS": {
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

export default selectedCompOffTxnHolidays;
