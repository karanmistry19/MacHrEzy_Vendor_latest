import { addError } from "../actions/toast.action";
const initialState = [];
const attendanceTxnHistory = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_ATTENDANCE_TXN_HISTORY_SUCCESS": {
      return action.payload.data;
    }
    case "FETCH_ATTENDANCE_TXN_HISTORY_FAIL": {
      action.asyncDispatch(
        addError(action.error?.response?.data?.message, 3000),
      );
      return state;
    }

    case "REMOVE_ATTENDANCE_TXN":
    case "LOGOUT": {
      return [];
    }

    default: {
      return state;
    }
  }
};

export default attendanceTxnHistory;
