import { addError } from "../actions/toast.action";
import {
  fetchLeaveTxnHistory,
  fetchLeaveTxnPending,
} from "../actions/leave.action";
import { findMyPendingTransactionCount } from "../actions/transaction.action";

const initialState = [];
const leaveTxnPending = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_LEAVE_TXN_PENDING_SUCCESS": {
      return action.payload.data;
    }

    case "SANCTION_LEAVE_TXN_SUCCESS": {
      // action.asyncDispatch(fetchLeaveTxnHistory());
      action.asyncDispatch(findMyPendingTransactionCount());
      return action.payload.data;
    }
    case "SANCTION_MULTIPLE_LEAVE_TXN_SUCCESS": {
      // action.asyncDispatch(fetchLeaveTxnHistory());
      // action.asyncDispatch(fetchLeaveTxnPending());
      action.asyncDispatch(findMyPendingTransactionCount());
      return state;
    }

    case "SANCTION_MULTIPLE_LEAVE_TXN_FAIL":
    case "SANCTION_LEAVE_TXN_FAIL":
    case "FETCH_LEAVE_TXN_PENDING_FAIL": {
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

export default leaveTxnPending;
