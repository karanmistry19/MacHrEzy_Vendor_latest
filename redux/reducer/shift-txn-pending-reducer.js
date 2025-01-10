import { addError } from "../actions/toast.action";
import {
  fetchHistoryShiftTxn,
  fetchPendingShiftTxn,
} from "../actions/shift.action";
const initialState = [];
import { findMyPendingTransactionCount } from "../actions/transaction.action";

const shiftTxnPending = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_PENDING_SHIFT_TXN_SUCCESS": {
      return action.payload.data;
    }
    case "SANCTION_SHIFT_TXN_SUCCESS": {
      // action.asyncDispatch(fetchHistoryShiftTxn());
      action.asyncDispatch(findMyPendingTransactionCount());
      return action.payload.data;
    }
    case "SANCTION_MULTIPLE_SHIFT_TXN_SUCCESS": {
      // action.asyncDispatch(fetchHistoryShiftTxn());
      // action.asyncDispatch(fetchPendingShiftTxn());
      action.asyncDispatch(findMyPendingTransactionCount());
      return action.payload.data;
    }

    case "SANCTION_MULTIPLE_SHIFT_TXN_FAIL":
    case "SANCTION_SHIFT_TXN_FAIL":
    case "FETCH_PENDING_SHIFT_TXN_FAIL": {
      action.asyncDispatch(
        addError(action.error?.response?.data?.message, 3000),
      );
      return state;
    }

    case "REMOVE_SHIFT_TXN":
    case "LOGOUT": {
      return [];
    }

    default: {
      return state;
    }
  }
};

export default shiftTxnPending;
