import {
  fetchHistoryAttendanceTransaction,
  fetchPendingAttendanceTransaction,
} from "../actions/attendance.action";
import { findMyPendingTransactionCount } from "../actions/transaction.action";
import { addError } from "../actions/toast.action";
const initialState = [];
const attendanceTxnPending = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_ATTENDANCE_TXN_PENDING_SUCCESS": {
      return action.payload.data;
    }

    case "SANCTION_ATTENDANCE_TXN_SUCCESS": {
      // action.asyncDispatch(fetchHistoryAttendanceTransaction());
      action.asyncDispatch(findMyPendingTransactionCount());
      return action.payload.data;
    }

    case "SANCTION_MULTIPLE_ATTENDANCE_TXN_SUCCESS": {
      action.asyncDispatch(findMyPendingTransactionCount());
      // action.asyncDispatch(fetchHistoryAttendanceTransaction());
      // action.asyncDispatch(fetchPendingAttendanceTransaction());
      return state;
    }

    case "SANCTION_MULTIPLE_ATTENDANCE_TXN_FAIL":
    case "SANCTION_ATTENDANCE_TXN_FAIL":
    case "FETCH_ATTENDANCE_TXN_PENDING_FAIL": {
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

export default attendanceTxnPending;
