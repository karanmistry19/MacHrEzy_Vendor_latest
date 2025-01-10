import { addError } from "../actions/toast.action";
import {
  fetchHistoryCompOffTxn,
  fetchPendingCompOffTxn,
} from "../actions/comp-off.action";
import { findMyPendingTransactionCount } from "../actions/transaction.action";

const initialState = [];
const compOffTxnPending = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_PENDING_COMP_OFF_TXN_SUCCESS": {
      return action.payload.data;
    }

    case "SANCTION_COMP_OFF_TXN_SUCCESS": {
      // action.asyncDispatch(fetchHistoryCompOffTxn());
      action.asyncDispatch(findMyPendingTransactionCount());
      return action.payload.data;
    }
    case "SANCTION_MULTIPLE_COMP_OFF_TXN_SUCCESS": {
      // action.asyncDispatch(fetchHistoryCompOffTxn());
      // action.asyncDispatch(fetchPendingCompOffTxn());
      action.asyncDispatch(findMyPendingTransactionCount());
      return state;
    }
    case "SANCTION_MULTIPLE_COMP_OFF_TXN_FAIL":
    case "SANCTION_COMP_OFF_TXN_FAIL":
    case "FETCH_PENDING_COMP_OFF_TXN_FAIL": {
      action.asyncDispatch(
        addError(action.error?.response?.data?.message, 3000),
      );
      return state;
    }

    case "REMOVE_COMP_OFF_TXN":
    case "LOGOUT": {
      return [];
    }

    default: {
      return state;
    }
  }
};

export default compOffTxnPending;
