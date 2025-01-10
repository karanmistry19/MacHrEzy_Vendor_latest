import { addError } from "../actions/toast.action";
const initialState = [];
const selectedAttendanceTransactionTabDetails = (
  state = initialState,
  action,
) => {
  switch (action.type) {
    case "FETCH_TAB_DETAILS_ATTENDANCE_TXN_SUCCESS": {
      return action.payload.data;
    }

    case "FETCH_TAB_DETAILS_ATTENDANCE_TXN_FAIL": {
      action.asyncDispatch(
        addError(action.error?.response?.data?.message, 3000),
      );
      return state;
    }

    case "SET_ATTENDANCE_TXN_TABS": {
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

export default selectedAttendanceTransactionTabDetails;
